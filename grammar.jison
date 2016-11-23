%{
  const pwd = process.cwd();
  var classes = require(pwd+'/classes')
  var lib = require(pwd+'/lib');
  var flatten = function(array){
    return [].concat.apply([],array);
  }
%}

%lex
%%
\s+                         /* skip whitespace */
[0-9]+("."[0-9]+)?\b        return 'NUMBER'
[a-z]+                      return 'IDENTIFIER'
["]+[A-z0-9]+["]            return 'STRING'
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
"DO"                        return 'START'
"HLT"                       return 'HLT'
"."                         return 'EOS'
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
    ;

declaration
    : type IDENTIFIER
    {$$ = lib.declare($1,$2)}
    ;

assignment
    : declaration '=' nos
        { $$ = lib.assignValue($1,$3)}
    | declaration '=' variable
        {$$ = lib.assignVariable($1,$3)}
    | variable '=' nos
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
    ;

nos
    : E
    | STRING
      {$$ = new classes.Str(yytext)}
    | boolean
    ;

boolean
    : TRUE
        {$$ = new classes.Bool(true)}
    | FALSE
        {$$ = new classes.Bool(false)}
    ;

E
    : number
    | number operator E
        {$$ = $1[$2.toLowerCase()]($3);}
    ;

number
    : NUMBER {$$ = new classes.Num(yytext)}
    | '-' number %prec UMINUS
        {$$ = $2.negate()};

operator
    : '+' | '-' | '*' | '/' | '<' | '>' | '==' ;
