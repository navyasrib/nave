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
[0-9]+("."[0-9]+)?\b        return 'NUMBER'
[a-z]+                      return 'IDENTIFIER'
["]+[A-z0-9 ]+["]           return 'STRING'
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
"UNLESS"                    return "UNLESS"
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

%left '='
%right IDENTIFIER
%left '+' '-'
%left '*' '/'
%left '!'
%left '>'
%left '<'
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
    ;

statement
    : declaration
    | assignment
    | conditional
    | block
    | execution
    | print
    ;

print
    : DISPLAY displayable
        {$$ = new classes.Operation(lib.operations.print,$2)}
    ;

displayable
    : E
    | variable
      {$$ = $1.value}
    | string
    | vare
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
        { $$ = lib.assignValue($1,$3)}
    | declaration '=' variable
        {$$ = lib.assignVariable($1,$3)}
    | variable '=' assignable
        {$$ = lib.assignValue($1,$3)}
    | variable '=' variable
        {$$ = lib.assignVariable($1,$3)}
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
    | vare
    | block
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
    | number '+' E
        {$$ = $1['plus']($3);}
    | number '-' E
        {$$ = $1['minus']($3);}
    | number '*' E
        {$$ = $1['amplify']($3);}
    | number '/' E
        {$$ = $1['simplify']($3);}
    | number '<' E
        {$$ = $1['lessthan']($3);}
    | number '>' E
        {$$ = $1['greaterthan']($3);}
    | number '==' E
        {$$ = $1['equals']($3);}
    ;

vare
    : vare operator E
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | E operator vare
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | variable operator vare
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | vare operator variable
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | variable operator E
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | E operator variable
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    | variable operator variable
        {$$ = new classes.Operation(lib.operations[$2.toLowerCase()], $1, $3)}
    ;

operator
    : '+' | '-' | '*' | '/' | '<' | '>' | '==' ;

number
    : NUMBER {$$ = new classes.Num(yytext)}
    | '-' number %prec UMINUS
        {$$ = $2.negate()}
    ;

block
    : START statements HLT
        {$$ = new classes.Behavior($2)}
    ;
