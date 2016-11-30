%{
  const pwd = process.cwd();
  var classes = require(pwd+'/classes')
  var lib = require(pwd+'/lib');
  var flatten = function(array){
    return [].concat.apply([],array);
  };
  var trim = function(string) {
      return string.slice(1, string.length - 1);
  };
%}

%lex
%%
\s+                         /* skip whitespace */
"/*"+.+"*\\"                /* skip commented */
[0-9]+("."[0-9]+)?\b        return 'NUMBER'
[a-z]+                      return 'IDENTIFIER'
["]+[A-z .]+["]             return 'STRING'
"NUM"                       return 'NUM'
"STR"                       return 'STR'
"BOOLEAN"                   return 'BOOLEAN'
"PLUS"                      return '+'
"TRUE"                      return 'TRUE'
"FALSE"                     return 'FALSE'
"MINUS"                     return '-'
"AMPLIFY"                   return '*'
"SIMPLIFY"                  return '/'
"JOIN"                      return '+'
"EQUALS"                    return '=='
"GREATERTHAN"               return '>'
"LESSTHAN"                  return '<'
"NOT"                       return '!'
"IS"                        return '='
"INCASE"                    return "IF"
"UNLESS"                    return "ELSE"
"DISPLAY"                   return "DISPLAY"
"START"                     return 'START'
"HLT"                       return 'HLT'
"."                         return 'EOS'
"BEHAVIOR"                  return 'BEHAVIOR'
"EXECUTE"                   return 'EXECUTE'
<<EOF>>                     return 'EOF'
.                           return 'INVALID'

/lex

/* operator associations and precedence */

%right '='
%left '+' '-'
%left '*' '/'
%left '!'
%left '>' '<' '=='
%left UMINUS
%left EOS

%start expressions

%%

expressions
    : statements EOF
        { return $1; }
    ;

statements
    : statement EOS statements
        {$$ = flatten([$1,$3])}
    | statement EOS
        {$$ = [$1]}
    ;

statement
    : declaration
    | assignment
    | conditional
    | block
    | execution
    | print
    ;

conditional
    : IF condition statement
        {$$ = new classes.Operation(lib.operations.handleIfCondition,$2,$3)}
    | ELSE condition statement
        {$$ = new classes.Operation(lib.operations.handleElseCondition,$2,$3)}
    ;

condition
    : boolean
    | E
    ;

print
    : DISPLAY displayable
        {$$ = new classes.Operation(lib.operations.print,$2)}
    ;

displayable
    : E
    | string
    ;

execution
    : EXECUTE variable
        {$$ = new classes.Operation(lib.operations.executeBehavior($2))}
    ;

declaration
    : type IDENTIFIER
    {$$ = lib.declare($1,$2)}
    ;

assignment
    : declaration '=' assignable
        { $$ = lib.assignment($1,$3)}
    /*| declaration '=' variable
        {$$ = lib.assignVariable($1,$3)}*/
    | variable '=' assignable
        {$$ = lib.assignment($1,$3)}
    /*| variable '=' variable
        {$$ = lib.assignVariable($1,$3)}*/
    ;

variable
    : IDENTIFIER
      {$$ = lib.getVariable($1)}
    ;

type
    : NUM
      { $$ = classes.Num}
    | STR
      {$$ = classes.Str}
    | BOOLEAN
      {$$ = classes.Bool}
    | BEHAVIOR
      {$$ = classes.Behavior}
    ;

assignable
    : E
    | string
    | boolean
    | block
    /*| variable
      {$$= $1.value}*/
    ;

string
    : STRING
      {$$ = new classes.Str(trim(yytext))}
    | string '+' string
      {$$ = $1.join($3)}
    ;

boolean
    : TRUE
        {$$ = new classes.Bool(true)}
    | FALSE
        {$$ = new classes.Bool(false)}
    ;

E
    : number
    | E '+' E
        {$$ = lib.mathOperation('plus',$1,$3);}
    | E '-' E
        {$$ = lib.mathOperation('minus',$1,$3);}
    | E '*' E
        {$$ = lib.mathOperation('amplify',$1,$3);}
    | E '/' E
        {$$ = lib.mathOperation('simplify',$1,$3);}
    | E '<' E
        {$$ = lib.mathOperation('lessThan',$1,$3);}
    | E '>' E
        {$$ = lib.mathOperation('greaterThan',$1,$3);}
    | E '==' E
        {$$ = lib.mathOperation('equals',$1,$3);}
    | variable
    ;

/*operator
    : '+' | '-' | '*' | '/' | '<' | '>' | '==' ;*/

number
    : NUMBER {$$ = new classes.Num(yytext)}
    | '-' number %prec UMINUS
        {$$ = $2.negate()}
    ;

block
    : START statements HLT
        {$$ = new classes.Behavior($2)}
    ;
