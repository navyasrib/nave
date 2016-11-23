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
"Num"                       return 'NUM'
"Str"                       return 'STR'
"Boolean"                   return 'BOOLEAN'
"plus"                      return '+'
"true"                      return 'TRUE'
"false"                     return 'FALSE'
"minus"                     return '-'
"amplify"                   return '*'
"simplify"                  return '/'
"join"                      return '+'
"equals"                    return '=='
"greaterThan"               return '>'
"lessThan"                  return '<'
"not"                       return '!'
"IS"                        return '='
"incase"                    return "IF"
"unless"                    return "UNLESS"
"do"                        return 'START'
"end"                       return 'END'
"."                         return 'EOS'
<<EOF>>                     return 'EOF'
.                           return 'INVALID'

/lex

/* operator associations and precedence */

/*%left '='
%right IDENTIFIER
%left '+' '-'
%left '*' '/'
%left '!'
%left '>'
%left '<'
%left UMINUS
%left EOS*/

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
        { $$ = lib.declareAndDefine($1,$2,$4)}
    | declaration '=' variable
        {$$ = lib.declareAndDefine($1,$2,$4)}
    | variable '=' nos
        {$$ = lib.assignValue($1,$3)}
    | variable '=' variable
        {$$ = lib.assignValue($1,$3)}
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
    ;

nos
    : E
    | STRING
      {$$ = new classes.Str(yytext)}
    ;

E
    : NUMBER
        {$$ = new classes.Num(yytext)}
    ;
/*
E
    : nos '+' nos
    | E '-' E
    | E '*' E
    | E '/' E
    | E '>' E
    | E '<' E
    | E '==' E
    | '!' E
    | UMINUS E
    | NUMBER
    | variable
    ;
nos
    : E
    | STRING
variable
    : IDENTIFIER
    ;*/
