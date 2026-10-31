/* HEYYANIXX Learn Arcade — question banks. Edit freely; every answer was checked (C/Python outputs compiled & run). */
window.BANK = {
"codeOut": [
{
"topic": "Operators",
"pre": "",
"code": "int a = 10, b = 3;\nprintf(\"%d\", a / b);",
"a": "3",
"o": [
"3.33",
"4"
],
"why": "int / int = int. Decimal part kat jata hai (truncate), isliye 10/3 = 3.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int a = 10, b = 3;\nprintf(\"%d\", a % b);",
"a": "1",
"o": [
"3",
"0"
],
"why": "% (modulus) remainder deta hai: 10 = 3×3 + 1.",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "float x = 7 / 2;\nprintf(\"%.1f\", x);",
"a": "3.0",
"o": [
"3.5",
"4.0"
],
"why": "7/2 pehle int me calculate hota hai = 3, phir float me 3.0 store hota hai. 3.5 chahiye to 7.0/2 likho.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int i = 5;\nprintf(\"%d\", i++);",
"a": "5",
"o": [
"6",
"4"
],
"why": "i++ = post-increment: pehle value use hoti hai (5), baad me i 6 banta hai.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int i = 5;\nprintf(\"%d\", ++i);",
"a": "6",
"o": [
"5",
"7"
],
"why": "++i = pre-increment: pehle i badhta hai (6), phir print hota hai.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int x = 5;\nx += 3;\nx *= 2;\nprintf(\"%d\", x);",
"a": "16",
"o": [
"13",
"11"
],
"why": "x += 3 → 8, phir x *= 2 → 16.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "printf(\"%d\", 5 > 3 && 2 > 4);",
"a": "0",
"o": [
"1",
"true"
],
"why": "&& tabhi 1 deta hai jab dono sach ho. 2 > 4 false hai, isliye 0.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "printf(\"%d\", 5 > 3 || 2 > 4);",
"a": "1",
"o": [
"0",
"2"
],
"why": "|| me ek bhi sach ho to result 1.",
"lang": "c"
},
{
"topic": "If-else",
"pre": "",
"code": "int a = 7;\nif (a % 2 == 0)\n  printf(\"Even\");\nelse\n  printf(\"Odd\");",
"a": "Odd",
"o": [
"Even",
"EvenOdd"
],
"why": "7 % 2 = 1, condition false, isliye else chala: Odd.",
"lang": "c"
},
{
"topic": "If-else",
"pre": "",
"code": "int m = 75;\nif (m >= 90) printf(\"A\");\nelse if (m >= 60) printf(\"B\");\nelse printf(\"C\");",
"a": "B",
"o": [
"A",
"BC"
],
"why": "75 ≥ 90 false, 75 ≥ 60 true → B. Ladder me pehli true condition chalti hai, baaki skip.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "for (int i = 1; i <= 5; i++)\n  printf(\"%d \", i);",
"a": "1 2 3 4 5",
"o": [
"1 2 3 4",
"0 1 2 3 4"
],
"why": "i = 1 se shuru, i <= 5 tak, har baar +1.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "for (int i = 0; i < 10; i += 3)\n  printf(\"%d \", i);",
"a": "0 3 6 9",
"o": [
"0 3 6",
"3 6 9"
],
"why": "0, 3, 6, 9 — agla 12 hota jo < 10 nahi, loop band.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int i = 10;\nwhile (i > 0) {\n  printf(\"%d \", i);\n  i -= 4;\n}",
"a": "10 6 2",
"o": [
"10 6 2 -2",
"10 6"
],
"why": "10 → 6 → 2 → -2 (ab i > 0 false), isliye -2 print nahi hota.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int i = 5;\ndo {\n  printf(\"%d\", i);\n} while (i < 3);",
"a": "5",
"o": [
"Kuch nahi",
"3"
],
"why": "do-while kam se kam EK baar chalta hai, condition baad me check hoti hai.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int s = 0;\nfor (int i = 1; i <= 4; i++)\n  s += i;\nprintf(\"%d\", s);",
"a": "10",
"o": [
"4",
"6"
],
"why": "1+2+3+4 = 10.",
"lang": "c"
},
{
"topic": "Arrays",
"pre": "",
"code": "int arr[5] = {2, 4, 6, 8, 10};\nprintf(\"%d\", arr[3]);",
"a": "8",
"o": [
"6",
"10"
],
"why": "Index 0 se shuru hota hai: arr[0]=2, arr[1]=4, arr[2]=6, arr[3]=8.",
"lang": "c"
},
{
"topic": "Arrays",
"pre": "",
"code": "int arr[5] = {1, 2};\nprintf(\"%d\", arr[4]);",
"a": "0",
"o": [
"2",
"Garbage"
],
"why": "Partially initialise karne par baaki elements 0 ho jaate hain.",
"lang": "c"
},
{
"topic": "Arrays",
"pre": "",
"code": "int a[] = {3, 1, 4, 1, 5};\nprintf(\"%d\", (int)(sizeof(a) / sizeof(a[0])));",
"a": "5",
"o": [
"20",
"4"
],
"why": "sizeof(a) = poore array ke bytes, sizeof(a[0]) = ek element. Divide karo = elements ki ginti.",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "char c = 'A';\nprintf(\"%d\", c);",
"a": "65",
"o": [
"A",
"97"
],
"why": "%d se char ka ASCII code print hota hai. 'A' = 65, 'a' = 97.",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "char c = 'A';\nprintf(\"%c\", c + 2);",
"a": "C",
"o": [
"B",
"67"
],
"why": "'A'+2 = 67 = 'C'. %c use kiya to character print hua.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int x = 10;\nint y = (x > 5) ? 100 : 200;\nprintf(\"%d\", y);",
"a": "100",
"o": [
"200",
"10"
],
"why": "Ternary: condition ? true-value : false-value. 10 > 5 true → 100.",
"lang": "c"
},
{
"topic": "Switch",
"pre": "",
"code": "int d = 2;\nswitch (d) {\n  case 1: printf(\"Mon\");\n  case 2: printf(\"Tue\");\n  case 3: printf(\"Wed\"); break;\n  default: printf(\"X\");\n}",
"a": "TueWed",
"o": [
"Tue",
"TueWedX"
],
"why": "case 2 ke baad break nahi hai, isliye fall-through hokar case 3 bhi chala, phir break.",
"lang": "c"
},
{
"topic": "Functions",
"pre": "int sq(int n) {\n  return n * n;\n}",
"code": "printf(\"%d\", sq(4) + 1);",
"a": "17",
"o": [
"16",
"25"
],
"why": "sq(4) = 16, +1 = 17.",
"lang": "c"
},
{
"topic": "Functions",
"pre": "void change(int x) {\n  x = 50;\n}",
"code": "int a = 5;\nchange(a);\nprintf(\"%d\", a);",
"a": "5",
"o": [
"50",
"0"
],
"why": "C me call by value: function ko copy milti hai, original a nahi badalta.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int x = 1;\nfor (int i = 0; i < 3; i++)\n  x *= 2;\nprintf(\"%d\", x);",
"a": "8",
"o": [
"6",
"4"
],
"why": "Teen baar double: 1 → 2 → 4 → 8.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "printf(\"%d\", 10 / 3 * 3);",
"a": "9",
"o": [
"10",
"1"
],
"why": "Left se right: 10/3 = 3, phir 3*3 = 9.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "printf(\"%d\", 2 + 3 * 4);",
"a": "14",
"o": [
"20",
"24"
],
"why": "* ki priority + se zyada: 3*4 = 12, +2 = 14.",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "int a = 5, b = 2;\nprintf(\"%.2f\", (float)a / b);",
"a": "2.50",
"o": [
"2.00",
"2.5"
],
"why": "(float) typecast se division decimal me hota hai; %.2f = 2 decimal places.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "for (int i = 1; i <= 3; i++)\n  for (int j = 1; j <= i; j++)\n    printf(\"*\");",
"a": "******",
"o": [
"***",
"*********"
],
"why": "Inner loop 1 + 2 + 3 = 6 baar chalta hai.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int i;\nfor (i = 0; i < 5; i++);\nprintf(\"%d\", i);",
"a": "5",
"o": [
"01234",
"4"
],
"why": "for ke baad ; hai — loop khaali chala, i 5 par ruka, phir printf ek baar chala.",
"lang": "c"
},
{
"topic": "If-else",
"pre": "",
"code": "int x = 0;\nif (x = 5) printf(\"Yes\");\nelse printf(\"No\");",
"a": "Yes",
"o": [
"No",
"Error"
],
"why": "x = 5 assignment hai (comparison nahi). Value 5 non-zero = true. Comparison ke liye == likho.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "for (int i = 1; i <= 5; i++) {\n  if (i == 3) continue;\n  printf(\"%d\", i);\n}",
"a": "1245",
"o": [
"12",
"12345"
],
"why": "continue current round skip karta hai: sirf 3 skip hua.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "for (int i = 1; i <= 5; i++) {\n  if (i == 3) break;\n  printf(\"%d\", i);\n}",
"a": "12",
"o": [
"1245",
"123"
],
"why": "break loop ko poori tarah rok deta hai.",
"lang": "c"
},
{
"topic": "Arrays",
"pre": "",
"code": "int a[3][2] = {{1,2},{3,4},{5,6}};\nprintf(\"%d\", a[2][1]);",
"a": "6",
"o": [
"4",
"5"
],
"why": "a[2] = teesri row {5,6}, uska index 1 = 6.",
"lang": "c"
},
{
"topic": "Functions",
"pre": "int f(int n) {\n  if (n <= 1) return 1;\n  return n * f(n - 1);\n}",
"code": "printf(\"%d\", f(4));",
"a": "24",
"o": [
"10",
"4"
],
"why": "Recursion: 4 × 3 × 2 × 1 = 24 (factorial).",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "printf(\"%d\", (int)sizeof(char));",
"a": "1",
"o": [
"2",
"8"
],
"why": "char hamesha 1 byte hota hai.",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int x = 7;\nprintf(\"%d %d\", x / 2, x % 2);",
"a": "3 1",
"o": [
"3.5 1",
"3 0"
],
"why": "7/2 = 3 (int), 7%2 = 1.",
"lang": "c"
},
{
"topic": "Arrays",
"pre": "",
"code": "char s[] = \"BCA\";\nprintf(\"%c\", s[1]);",
"a": "C",
"o": [
"B",
"A"
],
"why": "s[0]='B', s[1]='C', s[2]='A'.",
"lang": "c"
},
{
"topic": "Data types",
"pre": "",
"code": "int x = 3.99;\nprintf(\"%d\", x);",
"a": "3",
"o": [
"4",
"3.99"
],
"why": "int me decimal kat jata hai (round nahi hota).",
"lang": "c"
},
{
"topic": "Operators",
"pre": "",
"code": "int a = 5;\na = a * 2 + 1;\nprintf(\"%d\", a);",
"a": "11",
"o": [
"15",
"12"
],
"why": "5*2 = 10, +1 = 11.",
"lang": "c"
},
{
"topic": "Loops",
"pre": "",
"code": "int n = 1234, s = 0;\nwhile (n > 0) {\n  s += n % 10;\n  n /= 10;\n}\nprintf(\"%d\", s);",
"a": "10",
"o": [
"1234",
"4"
],
"why": "Har round last digit (n%10) jodo aur n/10 se hatao: 4+3+2+1 = 10. Digit-sum ka classic lab program.",
"lang": "c"
},
{
"topic": "If-else",
"pre": "",
"code": "int a = 4, b = 9;\nif (a > b) printf(\"%d\", a);\nelse printf(\"%d\", b);",
"a": "9",
"o": [
"4",
"49"
],
"why": "Bada number print karne ka logic: 4 > 9 false → b.",
"lang": "c"
},
{
"topic": "Python",
"pre": "",
"code": "print(7 // 2, 7 / 2)",
"a": "3 3.5",
"o": [
"3 3",
"3.5 3.5"
],
"why": "// floor division (int), / hamesha decimal deta hai.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "print(\"Hi\" * 3)",
"a": "HiHiHi",
"o": [
"Hi3",
"Error"
],
"why": "String × number = string repeat.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "for i in range(1, 4):\n    print(i, end=\" \")",
"a": "1 2 3",
"o": [
"1 2 3 4",
"0 1 2 3"
],
"why": "range(1, 4) me 4 shamil nahi hota (stop exclusive).",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "x = [10, 20, 30]\nprint(x[-1])",
"a": "30",
"o": [
"10",
"Error"
],
"why": "Negative index peeche se ginta hai: -1 = last element.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "print(2 ** 5)",
"a": "32",
"o": [
"10",
"25"
],
"why": "** = power: 2⁵ = 32.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "print(len(\"Anish\"))",
"a": "5",
"o": [
"4",
"6"
],
"why": "len() characters ginta hai: A-n-i-s-h = 5.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "a = \"AI\"\nprint(a.lower() + \"!\")",
"a": "ai!",
"o": [
"AI!",
"Ai!"
],
"why": ".lower() sab letters small kar deta hai.",
"lang": "py"
},
{
"topic": "Python",
"pre": "",
"code": "print(10 % 4)",
"a": "2",
"o": [
"2.5",
"4"
],
"why": "10 = 4×2 + 2, remainder 2.",
"lang": "py"
}
],
"codeBug": [
{
"lines": [
"#include <stdio.h>",
"int main() {",
"  int age = 18",
"  printf(\"%d\", age);",
"  return 0;",
"}"
],
"bug": 2,
"fix": "int age = 18;",
"why": "Har statement ke end me ; (semicolon) zaroori hai."
},
{
"lines": [
"int n;",
"printf(\"Number do: \");",
"scanf(\"%d\", n);",
"printf(\"%d\", n * 2);"
],
"bug": 2,
"fix": "scanf(\"%d\", &n);",
"why": "scanf ko variable ka address chahiye: &n."
},
{
"lines": [
"float pi = 3.14;",
"printf(\"%d\", pi);"
],
"bug": 1,
"fix": "printf(\"%f\", pi);",
"why": "float ke liye %f, int ke liye %d, char ke liye %c."
},
{
"lines": [
"int marks = 35;",
"if (marks = 40)",
"  printf(\"Pass\");"
],
"bug": 1,
"fix": "if (marks == 40)",
"why": "= value assign karta hai, == compare karta hai."
},
{
"lines": [
"int a[5], i;",
"for (i = 0; i <= 5; i++)",
"  a[i] = i * 2;"
],
"bug": 1,
"fix": "for (i = 0; i < 5; i++)",
"why": "5 size ke array me index 0–4 hote hain. a[5] bahar hai (out of bounds)."
},
{
"lines": [
"int i, sum;",
"for (i = 1; i <= 10; i++)",
"  sum = sum + i;",
"printf(\"%d\", sum);"
],
"bug": 0,
"fix": "int i, sum = 0;",
"why": "sum ko 0 se initialise karo, warna garbage value se shuru hoga."
},
{
"lines": [
"int i = 1;",
"while (i <= 5) {",
"  printf(\"%d\", i);",
"}"
],
"bug": 2,
"fix": "printf(\"%d\", i); i++;",
"why": "i kabhi badhta hi nahi → infinite loop. i++ chahiye."
},
{
"lines": [
"#include <stdio.h>",
"int main() {",
"  Printf(\"Hello\");",
"  return 0;",
"}"
],
"bug": 2,
"fix": "printf(\"Hello\");",
"why": "C case-sensitive hai: Printf ≠ printf."
},
{
"lines": [
"char grade = \"A\";",
"printf(\"%c\", grade);"
],
"bug": 0,
"fix": "char grade = 'A';",
"why": "Ek character single quotes me: 'A'. Double quotes = string."
},
{
"lines": [
"int n = -4;",
"if (n > 0);",
"  printf(\"Positive\");"
],
"bug": 1,
"fix": "if (n > 0)",
"why": "if ke baad ; lagane se if khaali ho jata hai aur printf hamesha chalega."
},
{
"lines": [
"int add(int a, int b) {",
"  int s = a + b;",
"}",
"// main: printf(\"%d\", add(2, 3));"
],
"bug": 1,
"fix": "int s = a + b; return s;",
"why": "int function ko value return karni padti hai: return s;"
},
{
"lines": [
"printf(\"Hello BCA);",
"return 0;"
],
"bug": 0,
"fix": "printf(\"Hello BCA\");",
"why": "String ke dono taraf \" \" quotes band karo."
}
],
"codeOrder": [
{
"name": "Hello World program",
"lines": [
"#include <stdio.h>",
"int main() {",
"printf(\"Hello, BCA!\");",
"return 0;",
"}"
],
"why": "Pehle header, phir main(), andar statements, return 0, aur closing brace."
},
{
"name": "Do numbers ka sum",
"lines": [
"int a, b, sum;",
"scanf(\"%d %d\", &a, &b);",
"sum = a + b;",
"printf(\"Sum = %d\", sum);"
],
"why": "Declare → input → process → output. Ye har program ka pattern hai."
},
{
"name": "Even ya Odd",
"lines": [
"int n;",
"scanf(\"%d\", &n);",
"if (n % 2 == 0)",
"printf(\"Even\");",
"else",
"printf(\"Odd\");"
],
"why": "if ke turant baad true wala kaam, phir else."
},
{
"name": "1 se N tak sum",
"lines": [
"int n, i, sum = 0;",
"scanf(\"%d\", &n);",
"for (i = 1; i <= n; i++)",
"sum = sum + i;",
"printf(\"%d\", sum);"
],
"why": "Loop ke andar sum badhao, loop khatam hone ke baad print karo."
},
{
"name": "Fahrenheit → Celsius (lab program)",
"lines": [
"float f, c;",
"scanf(\"%f\", &f);",
"c = (f - 32) / 1.8;",
"printf(\"%.2f\", c);"
],
"why": "Formula c = (f − 32) / 1.8 tumhari C Lab list me hai."
},
{
"name": "Simple Interest",
"lines": [
"float p, r, t, si;",
"scanf(\"%f %f %f\", &p, &r, &t);",
"si = (p * r * t) / 100;",
"printf(\"SI = %.2f\", si);"
],
"why": "SI = P×R×T/100. Pehle values lo, phir formula."
},
{
"name": "Python: Even/Odd",
"lines": [
"n = int(input())",
"if n % 2 == 0:",
"    print(\"Even\")",
"else:",
"    print(\"Odd\")"
],
"why": "Python me { } nahi, indentation (spaces) block banata hai."
}
],
"quiz": {
"ai": [
{
"q": "AI ka full form?",
"a": "Artificial Intelligence",
"o": [
"Automatic Internet",
"Advanced Input",
"Applied Information"
],
"why": "AI = machines ko 'smart' kaam (seekhna, samajhna, decide karna) sikhana."
},
{
"q": "Machine Learning, AI ka kya hai?",
"a": "Ek subset (hissa)",
"o": [
"Bilkul alag field",
"AI ka purana naam",
"Ek programming language"
],
"why": "ML = AI ka hissa jisme machine data se khud seekhti hai. Deep Learning, ML ka hissa hai."
},
{
"q": "Labelled data (sahi answer ke saath) se seekhna kehlata hai:",
"a": "Supervised learning",
"o": [
"Unsupervised learning",
"Reinforcement learning",
"Random learning"
],
"why": "Supervised = teacher wale examples (input + correct output)."
},
{
"q": "Clustering (similar cheezein group karna) kis type ka example hai?",
"a": "Unsupervised learning",
"o": [
"Supervised learning",
"Reinforcement learning",
"Compiling"
],
"why": "Bina labels ke patterns dhoondhna = unsupervised."
},
{
"q": "Reward aur penalty se seekhna (jaise game khelna seekhna):",
"a": "Reinforcement learning",
"o": [
"Supervised learning",
"Unsupervised learning",
"Data entry"
],
"why": "Agent actions leta hai, reward milta hai, aur better hota jata hai."
},
{
"q": "LLM ka full form?",
"a": "Large Language Model",
"o": [
"Linear Logic Machine",
"Long Learning Memory",
"Low Level Module"
],
"why": "ChatGPT, Gemini, Claude jaise models LLM hain."
},
{
"q": "GPT me 'T' ka matlab?",
"a": "Transformer",
"o": [
"Training",
"Text",
"Turbo"
],
"why": "GPT = Generative Pre-trained Transformer."
},
{
"q": "Transformer architecture kis paper se aaya (2017)?",
"a": "Attention Is All You Need",
"o": [
"Deep Blue",
"ImageNet",
"The Turing Test"
],
"why": "Google researchers ka 2017 paper; aaj ke LLMs isi par based hain."
},
{
"q": "Turing Test kisne propose kiya?",
"a": "Alan Turing",
"o": [
"Charles Babbage",
"Elon Musk",
"Bill Gates"
],
"why": "Alan Turing, 1950: kya machine insaan jaisi baat kar sakti hai?"
},
{
"q": "'Artificial Intelligence' term kisne diya (1956)?",
"a": "John McCarthy",
"o": [
"Alan Turing",
"Dennis Ritchie",
"Tim Berners-Lee"
],
"why": "John McCarthy ne 1956 Dartmouth workshop ke liye ye naam diya."
},
{
"q": "NLP ka full form?",
"a": "Natural Language Processing",
"o": [
"New Logic Program",
"Network Layer Protocol",
"Neural Loop Process"
],
"why": "NLP = computer ko insaani bhasha samajhna/likhna sikhana."
},
{
"q": "Computer Vision kis cheez se deal karta hai?",
"a": "Images aur video",
"o": [
"Sirf audio",
"Sirf text",
"Electricity"
],
"why": "Face unlock, object detection = computer vision."
},
{
"q": "Neural network kis se inspired hai?",
"a": "Dimaag ke neurons",
"o": [
"Internet cables",
"Solar system",
"Excel sheets"
],
"why": "Artificial neurons layers me jude hote hain, brain ki tarah."
},
{
"q": "Overfitting ka matlab:",
"a": "Model training data ratta maar leta hai, naye data pe fail",
"o": [
"Model bahut chhota hai",
"Data zyada saaf hai",
"Model fast hai"
],
"why": "Overfit model practice paper me 100, real exam me fail."
},
{
"q": "AI 'hallucination' kya hai?",
"a": "Confident lekin galat/banaya hua answer",
"o": [
"AI ka so jana",
"Image banana",
"Virus"
],
"why": "Isliye AI ke facts hamesha check karo."
},
{
"q": "LLM me 'token' kya hota hai?",
"a": "Text ka chhota tukda (word ya word ka part)",
"o": [
"Paise",
"Password",
"Ek GPU"
],
"why": "Model text ko tokens me tod ke padhta/likhta hai."
},
{
"q": "Deep Learning kis cheez ka use karta hai?",
"a": "Bahut saari layers wale neural networks",
"o": [
"Sirf if-else",
"Sirf spreadsheets",
"Floppy disks"
],
"why": "'Deep' = zyada layers."
},
{
"q": "Email spam hai ya nahi — ye kaunsa task hai?",
"a": "Classification",
"o": [
"Regression",
"Clustering",
"Compression"
],
"why": "Category (spam/not spam) choose karna = classification."
},
{
"q": "Ghar ki keemat predict karna (number) kaunsa task hai?",
"a": "Regression",
"o": [
"Classification",
"Clustering",
"Sorting"
],
"why": "Continuous number predict karna = regression."
},
{
"q": "AI training me GPU kyun use hota hai?",
"a": "Ek saath hazaaron math calculations (parallel)",
"o": [
"Sasta hota hai",
"Internet fast karta hai",
"Screen bright karta hai"
],
"why": "Neural networks = matrix math; GPU parallel me karta hai."
},
{
"q": "Prompt kya hota hai?",
"a": "AI ko diya gaya instruction/input",
"o": [
"AI ka output",
"Ek virus",
"Ek keyboard key"
],
"why": "Better prompt = better answer. Prompt Master game khelo!"
}
],
"comp": [
{
"q": "CPU ka full form?",
"a": "Central Processing Unit",
"o": [
"Central Program Unit",
"Computer Personal Unit",
"Control Power Unit"
],
"why": "CPU = computer ka dimaag."
},
{
"q": "ALU ka full form?",
"a": "Arithmetic Logic Unit",
"o": [
"Advanced Logic Unit",
"Array List Unit",
"Auto Load Unit"
],
"why": "ALU calculations (+ − × ÷) aur comparisons karta hai."
},
{
"q": "RAM kaisi memory hai?",
"a": "Volatile (power off = data gone)",
"o": [
"Non-volatile",
"Permanent",
"Optical"
],
"why": "RAM temporary working memory hai."
},
{
"q": "ROM kaisi memory hai?",
"a": "Non-volatile",
"o": [
"Volatile",
"Cache",
"Virtual"
],
"why": "ROM me data power off hone par bhi rehta hai."
},
{
"q": "1 byte = ?",
"a": "8 bits",
"o": [
"4 bits",
"16 bits",
"10 bits"
],
"why": "Bit = 0 ya 1. 8 bits = 1 byte."
},
{
"q": "Computer (binary) me 1 KB = ?",
"a": "1024 bytes",
"o": [
"1000 bits",
"100 bytes",
"512 bytes"
],
"why": "2¹⁰ = 1024."
},
{
"q": "Inme se input device kaunsa hai?",
"a": "Keyboard",
"o": [
"Monitor",
"Printer",
"Speaker"
],
"why": "Input = data andar bhejna."
},
{
"q": "Inme se output device kaunsa hai?",
"a": "Printer",
"o": [
"Mouse",
"Scanner",
"Microphone"
],
"why": "Output = result bahar dikhana/nikalna."
},
{
"q": "Inme se operating system kaunsa hai?",
"a": "Linux",
"o": [
"MS Excel",
"Photoshop",
"Google Chrome browser"
],
"why": "OS hardware aur apps ko manage karta hai: Windows, Linux, Android, macOS."
},
{
"q": "Compiler kya karta hai?",
"a": "Poora program ek saath machine code me badalta hai",
"o": [
"Line-by-line chalata hai",
"Internet chalata hai",
"Virus hatata hai"
],
"why": "C compiler (jaise gcc) use karta hai; interpreter line-by-line chalata hai."
},
{
"q": "C language kisne banayi?",
"a": "Dennis Ritchie",
"o": [
"James Gosling",
"Guido van Rossum",
"Bjarne Stroustrup"
],
"why": "Bell Labs, early 1970s. Java = Gosling, Python = Guido, C++ = Stroustrup."
},
{
"q": "Machine language kis form me hoti hai?",
"a": "Binary (0 aur 1)",
"o": [
"English",
"Hindi",
"Decimal"
],
"why": "CPU sirf 0/1 samajhta hai."
},
{
"q": "Ctrl + Z ka kaam?",
"a": "Undo",
"o": [
"Save",
"Paste",
"Zoom"
],
"why": "Galti hui? Ctrl+Z. Copy = Ctrl+C, Paste = Ctrl+V."
},
{
"q": "Excel me formula kis sign se shuru hota hai?",
"a": "=",
"o": [
"#",
"@",
"$"
],
"why": "Jaise =SUM(A1:A5)."
},
{
"q": "=SUM(A1:A5) kya karega?",
"a": "A1 se A5 tak sab add",
"o": [
"Sirf A1 aur A5 add",
"A1 ko 5 se guna",
"Average"
],
"why": "':' range batata hai."
},
{
"q": "Cache memory kya hai?",
"a": "CPU ke paas chhoti, bahut fast memory",
"o": [
"Hard disk ka naam",
"Internet history",
"USB drive"
],
"why": "Baar-baar chahiye data cache me rakha jata hai."
},
{
"q": "URL ka full form?",
"a": "Uniform Resource Locator",
"o": [
"Universal Remote Link",
"User Record List",
"Unique Real Location"
],
"why": "Website ka address = URL."
},
{
"q": "HTTP ka full form?",
"a": "HyperText Transfer Protocol",
"o": [
"High Transfer Text Process",
"Home Tool Transfer Page",
"Hyper Tech Type Program"
],
"why": "Web pages HTTP/HTTPS se aate hain; S = secure."
},
{
"q": "World Wide Web kisne banaya?",
"a": "Tim Berners-Lee",
"o": [
"Bill Gates",
"Steve Jobs",
"Charles Babbage"
],
"why": "1989, CERN."
},
{
"q": "Email me CC ka matlab?",
"a": "Carbon Copy",
"o": [
"Central Copy",
"Computer Code",
"Close Chat"
],
"why": "BCC = Blind Carbon Copy (baaki logo ko dikhta nahi)."
},
{
"q": "Sabse fast memory kaunsi?",
"a": "CPU registers",
"o": [
"RAM",
"Hard disk",
"Pen drive"
],
"why": "Speed: Registers > Cache > RAM > SSD > HDD."
},
{
"q": "SSD ka full form?",
"a": "Solid State Drive",
"o": [
"Super Speed Disk",
"System Storage Device",
"Single Side Disk"
],
"why": "SSD me moving parts nahi, isliye HDD se fast."
}
],
"elec": [
{
"q": "5 ko binary me likho:",
"a": "101",
"o": [
"110",
"111",
"100"
],
"why": "5 = 4 + 1 = 101₂."
},
{
"q": "Binary 1010 = decimal?",
"a": "10",
"o": [
"12",
"8",
"5"
],
"why": "8 + 0 + 2 + 0 = 10."
},
{
"q": "13 ka binary?",
"a": "1101",
"o": [
"1011",
"1110",
"1001"
],
"why": "13 = 8 + 4 + 1 = 1101₂."
},
{
"q": "255 ka hexadecimal?",
"a": "FF",
"o": [
"EE",
"100",
"F0"
],
"why": "255 = 15×16 + 15 = FF."
},
{
"q": "Hex 'A' = decimal?",
"a": "10",
"o": [
"11",
"1",
"16"
],
"why": "Hex digits: 0–9, A=10 … F=15."
},
{
"q": "Octal number system ka base?",
"a": "8",
"o": [
"2",
"10",
"16"
],
"why": "Octal = 0 se 7 digits."
},
{
"q": "Hexadecimal ka base?",
"a": "16",
"o": [
"8",
"10",
"2"
],
"why": "Hex = 0–9 + A–F."
},
{
"q": "1010 ka 1's complement?",
"a": "0101",
"o": [
"1011",
"1010",
"0110"
],
"why": "1's complement = har bit ulta karo."
},
{
"q": "0101 ka 2's complement (4-bit)?",
"a": "1011",
"o": [
"1010",
"0110",
"1100"
],
"why": "1's complement 1010, +1 = 1011."
},
{
"q": "Binary me 1 + 1 = ?",
"a": "10",
"o": [
"2",
"11",
"0"
],
"why": "1+1 = 0, carry 1 → 10₂."
},
{
"q": "AND gate output 1 kab deta hai?",
"a": "Jab saare inputs 1 ho",
"o": [
"Jab koi ek input 1 ho",
"Jab inputs alag ho",
"Kabhi nahi"
],
"why": "AND = sab sach chahiye."
},
{
"q": "OR gate output 0 kab deta hai?",
"a": "Jab saare inputs 0 ho",
"o": [
"Jab saare inputs 1 ho",
"Jab inputs alag ho",
"Hamesha"
],
"why": "OR = ek bhi 1 ho to 1."
},
{
"q": "NOT gate kya karta hai?",
"a": "Input ulta kar deta hai",
"o": [
"Do inputs jodta hai",
"Kuch nahi",
"Input double karta hai"
],
"why": "0 → 1, 1 → 0."
},
{
"q": "Universal gates kaun se hain?",
"a": "NAND aur NOR",
"o": [
"AND aur OR",
"XOR aur XNOR",
"NOT aur AND"
],
"why": "Sirf NAND (ya sirf NOR) se koi bhi gate ban sakta hai."
},
{
"q": "XOR output 1 kab?",
"a": "Jab inputs alag ho",
"o": [
"Jab inputs same ho",
"Jab dono 0 ho",
"Jab dono 1 ho"
],
"why": "XOR = 'exclusive OR', ek hi 1 hona chahiye."
},
{
"q": "Boolean: A · 0 = ?",
"a": "0",
"o": [
"A",
"1",
"A'"
],
"why": "Kisi bhi cheez ko 0 se AND karo = 0."
},
{
"q": "Boolean: A + 1 = ?",
"a": "1",
"o": [
"A",
"0",
"A'"
],
"why": "OR me ek 1 ho to result 1."
},
{
"q": "De Morgan: (A·B)' = ?",
"a": "A' + B'",
"o": [
"A' · B'",
"A + B",
"A · B"
],
"why": "AND ka complement = complements ka OR."
},
{
"q": "Octal 17 = decimal?",
"a": "15",
"o": [
"17",
"8",
"71"
],
"why": "1×8 + 7 = 15."
},
{
"q": "Ohm's law:",
"a": "V = I × R",
"o": [
"V = I / R",
"P = V / R",
"I = V × R"
],
"why": "Voltage = Current × Resistance."
},
{
"q": "Resistance ki unit?",
"a": "Ohm (Ω)",
"o": [
"Volt",
"Ampere",
"Watt"
],
"why": "Current = Ampere, Voltage = Volt, Power = Watt."
},
{
"q": "Diode current ko kaise allow karta hai?",
"a": "Sirf ek direction me",
"o": [
"Dono directions me",
"Bilkul nahi",
"Sirf AC me"
],
"why": "Isliye diode rectifier me use hota hai."
},
{
"q": "Rectifier kya karta hai?",
"a": "AC ko DC me badalta hai",
"o": [
"DC ko AC me",
"Voltage badhata hai",
"Signal store karta hai"
],
"why": "Phone charger ke andar bhi rectifier hota hai."
},
{
"q": "Transistor ke 3 terminals:",
"a": "Emitter, Base, Collector",
"o": [
"Anode, Cathode, Gate",
"Positive, Negative, Earth",
"Input, Output, Ground"
],
"why": "BJT = Emitter, Base, Collector."
},
{
"q": "Kirchhoff's Current Law (KCL):",
"a": "Node me aane wala current = jaane wala current",
"o": [
"Voltage hamesha 0",
"Resistance = current",
"Power = V × I"
],
"why": "Charge kahin gayab nahi hota."
}
],
"math": [
{
"q": "d/dx (x²) = ?",
"a": "2x",
"o": [
"x",
"2x²",
"x²/2"
],
"why": "Power rule: xⁿ → n·xⁿ⁻¹."
},
{
"q": "d/dx (5) = ?",
"a": "0",
"o": [
"5",
"1",
"5x"
],
"why": "Constant ka derivative hamesha 0."
},
{
"q": "d/dx (x⁵) = ?",
"a": "5x⁴",
"o": [
"4x⁵",
"5x⁵",
"x⁴"
],
"why": "Power aage, power me −1."
},
{
"q": "d/dx (2x⁵ + 3x³ − 7) = ?",
"a": "10x⁴ + 9x²",
"o": [
"10x³ + 9x²",
"10x⁴ + 9x² − 7",
"7x⁴ + 6x²"
],
"why": "Har term alag; −7 ka derivative 0."
},
{
"q": "d/dx (sin x) = ?",
"a": "cos x",
"o": [
"−cos x",
"−sin x",
"tan x"
],
"why": "sin → cos."
},
{
"q": "d/dx (cos x) = ?",
"a": "−sin x",
"o": [
"sin x",
"cos x",
"−cos x"
],
"why": "'co' wale me minus aata hai."
},
{
"q": "d/dx (eˣ) = ?",
"a": "eˣ",
"o": [
"x·eˣ⁻¹",
"1",
"e"
],
"why": "eˣ ka derivative khud eˣ."
},
{
"q": "d/dx (log x) = ?",
"a": "1/x",
"o": [
"log x",
"x",
"eˣ"
],
"why": "Natural log ka derivative 1/x."
},
{
"q": "d/dx (√x) = ?",
"a": "1/(2√x)",
"o": [
"2√x",
"√x/2",
"1/√x"
],
"why": "√x = x^(1/2) → (1/2)x^(−1/2)."
},
{
"q": "d/dx (1/x) = ?",
"a": "−1/x²",
"o": [
"1/x²",
"log x",
"−1/x"
],
"why": "x⁻¹ → −x⁻²."
},
{
"q": "d/dx (tan x) = ?",
"a": "sec²x",
"o": [
"cot x",
"−sec²x",
"sec x tan x"
],
"why": "Standard formula."
},
{
"q": "d/dx (sin 3x) = ?",
"a": "3 cos 3x",
"o": [
"cos 3x",
"−3 cos 3x",
"3 sin 3x"
],
"why": "Chain rule: bahar ka × andar ka (3)."
},
{
"q": "d/dx (sin x²) = ?",
"a": "2x cos(x²)",
"o": [
"cos(x²)",
"2x sin(x²)",
"cos(2x)"
],
"why": "Chain rule: cos(x²) × 2x."
},
{
"q": "Product rule: (uv)′ = ?",
"a": "u′v + uv′",
"o": [
"u′v′",
"u′v − uv′",
"(u′v − uv′)/v²"
],
"why": "Last option quotient rule ka numerator jaisa hai."
},
{
"q": "d/dx (x³ sin x) = ?",
"a": "3x² sin x + x³ cos x",
"o": [
"3x² cos x",
"x³ cos x",
"3x² sin x − x³ cos x"
],
"why": "Product rule lagao."
},
{
"q": "d/dx (x³ + 7)¹⁰ = ?",
"a": "30x²(x³ + 7)⁹",
"o": [
"10(x³ + 7)⁹",
"30x²(x³ + 7)¹⁰",
"3x²(x³ + 7)⁹"
],
"why": "10·(x³+7)⁹ × 3x²."
},
{
"q": "ax² + bx + c ka discriminant?",
"a": "b² − 4ac",
"o": [
"b² + 4ac",
"−b/2a",
"4ac − b"
],
"why": "D = b² − 4ac batata hai roots kaise honge."
},
{
"q": "x² − 5x + 6 = 0 ke roots?",
"a": "2 aur 3",
"o": [
"−2 aur −3",
"1 aur 6",
"5 aur 6"
],
"why": "(x − 2)(x − 3) = 0."
},
{
"q": "Agar discriminant < 0 ho to roots:",
"a": "Real nahi (imaginary)",
"o": [
"Do equal real",
"Do alag real",
"Zero"
],
"why": "D > 0 alag real, D = 0 equal, D < 0 imaginary."
},
{
"q": "|2 3; 1 4| (2×2 determinant) = ?",
"a": "5",
"o": [
"11",
"8",
"−5"
],
"why": "2×4 − 3×1 = 5."
},
{
"q": "2 rows aur 3 columns wali matrix ka order?",
"a": "2 × 3",
"o": [
"3 × 2",
"6",
"5"
],
"why": "Order = rows × columns."
},
{
"q": "(2×3) matrix × (3×4) matrix ka order?",
"a": "2 × 4",
"o": [
"3 × 3",
"2 × 3",
"4 × 2"
],
"why": "Bahar wale numbers: 2 × 4."
},
{
"q": "Identity matrix me kya hota hai?",
"a": "Diagonal par 1, baaki 0",
"o": [
"Sab 1",
"Sab 0",
"Diagonal par 0"
],
"why": "AI = A (identity se guna = same)."
},
{
"q": "2, 4, 6, 8, 10 ka mean?",
"a": "6",
"o": [
"5",
"8",
"30"
],
"why": "Sum 30 ÷ 5 = 6."
},
{
"q": "3, 7, 1, 9, 5 ka median?",
"a": "5",
"o": [
"7",
"3",
"25"
],
"why": "Sort: 1, 3, 5, 7, 9 → beech wala 5."
},
{
"q": "2, 3, 3, 5, 3, 7 ka mode?",
"a": "3",
"o": [
"5",
"2",
"7"
],
"why": "Sabse zyada baar aaya: 3."
},
{
"q": "Variance aur standard deviation ka relation?",
"a": "Variance = SD²",
"o": [
"SD = Variance²",
"Dono same",
"Variance = 2 × SD"
],
"why": "SD = √Variance."
},
{
"q": "lim (x→2) (x² − 4)/(x − 2) = ?",
"a": "4",
"o": [
"0",
"2",
"Undefined"
],
"why": "(x−2)(x+2)/(x−2) = x+2 → 4."
},
{
"q": "Correlation coefficient (r) ki range?",
"a": "−1 se +1",
"o": [
"0 se 1",
"0 se 100",
"−∞ se +∞"
],
"why": "+1 perfect positive, −1 perfect negative, 0 no linear relation."
}
]
},
"edit": [
{
"t": "9:16",
"m": "Vertical video ratio — Shorts, Reels"
},
{
"t": "16:9",
"m": "Normal horizontal YouTube video ratio"
},
{
"t": "4:5",
"m": "Instagram portrait post ratio"
},
{
"t": "1080×1920",
"m": "Full-HD vertical video size"
},
{
"t": "1280×720",
"m": "Recommended YouTube thumbnail size"
},
{
"t": "FPS",
"m": "Frames per second"
},
{
"t": "24 fps",
"m": "Classic cinematic film frame rate"
},
{
"t": "J-cut",
"m": "Next clip ka audio uske video se pehle shuru"
},
{
"t": "L-cut",
"m": "Pichle clip ka audio agle clip par chalta rehta hai"
},
{
"t": "Jump cut",
"m": "Same shot me cut — time aage 'jump' karta hai"
},
{
"t": "Match cut",
"m": "Do shots ko similar shape/action se jodna"
},
{
"t": "B-roll",
"m": "Main shot ke upar extra/support footage"
},
{
"t": "Keyframe",
"m": "Animation ke liye ek time point par value fix karna"
},
{
"t": "Color correction",
"m": "White balance/exposure theek karna"
},
{
"t": "Color grading",
"m": "Video ko creative look/mood dena"
},
{
"t": "White balance",
"m": "Safed ko safed dikhana (colour temperature fix)"
},
{
"t": "Saturation",
"m": "Colours kitne gehre/intense hain"
},
{
"t": "Contrast",
"m": "Dark aur light parts ka difference"
},
{
"t": "Exposure",
"m": "Image kitni bright ya dark hai"
},
{
"t": "LUT",
"m": "Look-Up Table — ready-made colour preset"
},
{
"t": "Bitrate",
"m": "Har second kitna data — zyada = better quality, badi file"
},
{
"t": "Hook",
"m": "Pehle 1–3 second jo viewer ko rok le"
},
{
"t": "Rule of thirds",
"m": "Subject ko 3×3 grid ki lines par rakhna"
},
{
"t": "Ken Burns effect",
"m": "Photo par slow zoom/pan"
},
{
"t": "Speed ramp",
"m": "Ek hi clip me speed smoothly slow↔fast"
},
{
"t": "Chroma key",
"m": "Green/blue screen background hatana"
},
{
"t": "H.264",
"m": "Common video compression codec"
},
{
"t": "4K UHD",
"m": "3840 × 2160 resolution"
},
{
"t": "Cross dissolve",
"m": "Ek clip dheere se dusre me fade"
},
{
"t": "Cut on action",
"m": "Movement ke beech cut — smooth lagta hai"
},
{
"t": "JPEG",
"m": "Lossy image format (thoda quality kam, file chhoti)"
},
{
"t": "PNG",
"m": "Lossless image format, transparency support"
},
{
"t": "Safe zone (Shorts)",
"m": "Text ko neeche/right ke buttons se door rakhna"
},
{
"t": "Aspect ratio",
"m": "Width aur height ka ratio"
},
{
"t": "Timeline",
"m": "Jahan clips ko order me lagate ho"
},
{
"t": "Render / Export",
"m": "Final video file banana"
}
],
"editTF": [
{
"s": "60 fps clip ko 30 fps timeline par 50% speed karne se slow-mo smooth rehta hai.",
"v": true,
"why": "60 me se har second 30 frames chahiye — koi frame duplicate nahi hota."
},
{
"s": "Shorts ke liye 16:9 horizontal best hai.",
"v": false,
"why": "Shorts/Reels = 9:16 vertical, poori screen bharta hai."
},
{
"s": "Hook video ke end me hona chahiye.",
"v": false,
"why": "Hook pehle 1–3 second me — warna viewer swipe kar dega."
},
{
"s": "Captions isliye helpful hain kyunki bahut log video bina sound ke dekhte hain.",
"v": true,
"why": "Captions = muted viewers bhi samjhein."
},
{
"s": "YouTube Audio Library ka music YouTube videos me free use ho sakta hai.",
"v": true,
"why": "Uski license terms padh lo; kuch tracks me attribution chahiye."
},
{
"s": "Koi bhi trending gaana bina permission ke kahin bhi use karna safe hai.",
"v": false,
"why": "Copyright claim/strike aa sakta hai. Licensed ya platform ki library ka audio use karo."
},
{
"s": "Bitrate badhane se file size bhi badhta hai.",
"v": true,
"why": "Zyada data per second = badi file."
},
{
"s": "PNG lossy format hai.",
"v": false,
"why": "PNG lossless hai; JPEG lossy."
},
{
"s": "Colour correction pehle, colour grading baad me.",
"v": true,
"why": "Pehle footage theek karo, phir creative look do."
},
{
"s": "Thumbnail ka text chhote phone par bhi padhne layak bada hona chahiye.",
"v": true,
"why": "Zyadatar log phone par dekhte hain."
}
],
"ff": [
{
"q": "'Booyah!' screen kab aata hai?",
"a": "Match jeetne par",
"o": [
"Pehla kill karne par",
"Zone shrink hone par",
"Revive karne par"
],
"why": "Booyah = last survivor/team = WIN."
},
{
"q": "Gloo Wall ka kaam?",
"a": "Turant cover deta hai",
"o": [
"Heal karta hai",
"Speed badhata hai",
"Enemy dikhata hai"
],
"why": "Gloo wall ke peeche heal/reload karo."
},
{
"q": "Safe zone ke bahar khade raho to?",
"a": "HP kam hota rehta hai",
"o": [
"Kuch nahi hota",
"HP badhta hai",
"Ammo milta hai"
],
"why": "Zone damage time ke saath badhta hai — rotate early."
},
{
"q": "Bilkul close range fight ke liye best gun type?",
"a": "Shotgun",
"o": [
"Sniper",
"LMG",
"Marksman rifle"
],
"why": "Shotgun close me sabse zyada damage deta hai."
},
{
"q": "Bahut long range ke liye best?",
"a": "Sniper",
"o": [
"Shotgun",
"SMG",
"Pistol"
],
"why": "Sniper long range ka king hai."
},
{
"q": "Assault Rifle (AR) kis range ke liye all-rounder hai?",
"a": "Mid range",
"o": [
"Sirf melee",
"Sirf 1 meter",
"Sirf air"
],
"why": "AR = mid range all-rounder."
},
{
"q": "SMG ka strong point?",
"a": "Close range, fast fire",
"o": [
"Long range",
"Gloo wall todna",
"Healing"
],
"why": "SMG = close range rush."
},
{
"q": "Classic Battle Royale match me max kitne players?",
"a": "50",
"o": [
"100",
"20",
"64"
],
"why": "Free Fire BR = 50 players."
},
{
"q": "Squad me HP 0 hone par pehle kya hota hai?",
"a": "Knock down (revive ho sakta)",
"o": [
"Turant out",
"Respawn",
"Zone ke bahar"
],
"why": "Teammate revive kar sakta hai. Solo me direct eliminate."
},
{
"q": "Wukong character ki skill?",
"a": "Bush ban jata hai",
"o": [
"Gloo tod deta hai",
"Heal aura",
"Force field"
],
"why": "Camouflage: jhaadi ban ke chhupna."
},
{
"q": "Alok character ki skill?",
"a": "Heal + speed aura",
"o": [
"Bush camouflage",
"Wall break",
"Enemy tag"
],
"why": "Drop the Beat: aura me heal + speed."
},
{
"q": "Chrono character ki skill?",
"a": "Damage rokne wala shield",
"o": [
"Bush camouflage",
"Fast eating",
"Sniper accuracy"
],
"why": "Time Turner: force field jo damage block karta hai."
},
{
"q": "Skyler character ki skill?",
"a": "Gloo walls tod deta hai",
"o": [
"Heal karta hai",
"Invisible",
"Fast revive"
],
"why": "Riptide Rhythm: sonic wave gloo walls todti hai."
},
{
"q": "Kelly character ki skill?",
"a": "Fast sprint",
"o": [
"Heal aura",
"Gloo tod",
"Armor repair"
],
"why": "Kelly = speed."
},
{
"q": "Maxim character ki skill?",
"a": "Fast eating / medkit",
"o": [
"Fast sprint",
"Enemy tag",
"Bush"
],
"why": "Gluttony: mushroom aur medkit fast use."
},
{
"q": "Olivia character ki skill?",
"a": "Revive par extra HP",
"o": [
"Bush",
"Wall break",
"Fast sprint"
],
"why": "Healing Touch: revive kiye teammate ko extra HP."
},
{
"q": "Moco character ki skill?",
"a": "Shot enemy ko tag",
"o": [
"Heal",
"Fast sprint",
"Gloo tod"
],
"why": "Hacker's Eye: jis enemy ko maaro wo team ko dikhta hai."
},
{
"q": "Jai character ki skill?",
"a": "Knock par auto reload",
"o": [
"Heal aura",
"Bush",
"Fast eat"
],
"why": "Raging Reload."
},
{
"q": "Diamonds kya hain?",
"a": "Premium currency",
"o": [
"Free health",
"Gun skin",
"Map name"
],
"why": "Real money se aate hain. Gold = normal currency."
},
{
"q": "Airdrop me usually kya milta hai?",
"a": "High-tier loot",
"o": [
"Kuch nahi",
"Sirf food",
"Zone damage"
],
"why": "Airdrop par jaana risky — doosri teams bhi aati hain."
},
{
"q": "Factory roof fist-fight kis map par famous hai?",
"a": "Bermuda",
"o": [
"Erangel",
"Verdansk",
"Kings Canyon"
],
"why": "Factory = Bermuda. Baaki naam doosre games ke maps hain."
},
{
"q": "Kaunsa grenade dushman ko andha (blind) karta hai?",
"a": "Flashbang",
"o": [
"Smoke",
"Gloo wall",
"Frag"
],
"why": "Flash = white screen."
},
{
"q": "Smoke grenade ka best use?",
"a": "Revive/rotate cover",
"o": [
"Damage",
"Heal",
"Ammo"
],
"why": "Smoke vision block karta hai."
},
{
"q": "Sensitivity badhane se?",
"a": "Aim tez ghoomta hai",
"o": [
"Damage badhta hai",
"HP badhta hai",
"Recoil zero"
],
"why": "Same swipe par zyada movement."
},
{
"q": "Headshot vs body shot?",
"a": "Headshot zyada damage",
"o": [
"Dono same",
"Body zyada",
"Headshot 0"
],
"why": "Isliye crosshair head level par rakho."
},
{
"q": "Helmet kya kam karta hai?",
"a": "Head damage",
"o": [
"Zone damage",
"Fall damage",
"Speed"
],
"why": "Vest body ko protect karta hai."
},
{
"q": "Zone door hai — best move?",
"a": "Jaldi rotate, cover se",
"o": [
"Last tak loot",
"Center me khade",
"Zone ignore"
],
"why": "Late rotate = open field me pakde jaoge."
},
{
"q": "Fight ke baad heal kahan karein?",
"a": "Gloo/cover ke peeche",
"o": [
"Open field me",
"Roof edge par",
"Gaadi ke upar"
],
"why": "Open me heal = third party ka target."
},
{
"q": "'Third party' kya hai?",
"a": "Doosri fight me ghus ke attack",
"o": [
"Teesra teammate",
"Teesra zone",
"Gun ka naam"
],
"why": "Do teams lad rahi hain, teesri finish karti hai."
},
{
"q": "High ground ka fayda?",
"a": "Zyada dikhta, hit karna mushkil",
"o": [
"Kuch nahi",
"Zone damage kam",
"Free ammo"
],
"why": "Upar se area control easy."
},
{
"q": "Headphones kyun?",
"a": "Footsteps/gunshot direction",
"o": [
"Graphics",
"Ping kam",
"Free diamonds"
],
"why": "Sound se enemy ki location pata chalti hai."
},
{
"q": "Clash Squad kitne vs kitne?",
"a": "4 vs 4",
"o": [
"2 vs 2",
"1 vs 50",
"6 vs 6"
],
"why": "CS = round-based 4v4."
},
{
"q": "Clash Squad me guns kaise milte hain?",
"a": "Round start me kharidte",
"o": [
"Airdrop se",
"Sirf melee",
"Zone se"
],
"why": "Har round shuru me shop se buy."
},
{
"q": "Mushroom kya restore karta hai?",
"a": "EP (energy points)",
"o": [
"Ammo",
"Gloo wall",
"Vest"
],
"why": "EP dheere-dheere HP me convert hota hai."
},
{
"q": "Free Fire ko kaunsi company publish karti hai?",
"a": "Garena",
"o": [
"EA",
"Rockstar",
"Ubisoft"
],
"why": "Ye fan-made quiz hai — Garena se koi link nahi."
}
],
"duel": [
{
"goal": "Instagram caption",
"good": "Write 3 short Hinglish Instagram captions for my Free Fire 1v4 clutch clip. Max 15 words each, 2 emojis, end with a question to get comments.",
"weak": "Write a caption.",
"tip": "Number, length, language aur goal (comments) batao — AI ko guess nahi karna padega."
},
{
"goal": "C loops seekhna",
"good": "You are a patient C teacher. Explain for, while and do-while loops to a BCA first-year beginner in simple Hinglish, with one 5-line example each and 2 practice questions at the end.",
"weak": "Explain loops.",
"tip": "Role + audience + format = 3x better answer."
},
{
"goal": "YouTube Shorts title",
"good": "Give me 5 YouTube Shorts titles for a video where I win a 1v4 in Free Fire. Under 60 characters, curiosity hook, no fake clickbait.",
"weak": "Make my title viral.",
"tip": "Constraints (length, no fake claims) quality badhate hain."
},
{
"goal": "Teacher ko email",
"good": "Write a polite email to my professor asking for a 2-day extension on my C programming assignment because I was sick. Include a subject line. Under 100 words.",
"weak": "Write an email to teacher.",
"tip": "Kisko, kyun, tone aur length — sab clear."
},
{
"goal": "Code debug",
"good": "Here is my C code: [code]. It should print 1 to 10 but prints nothing. Find the bug, explain it in simple words, then give the fixed code.",
"weak": "fix code",
"tip": "Expected vs actual output batao — bug jaldi milega."
},
{
"goal": "Thumbnail image",
"good": "Cinematic portrait of a young Indian gamer with headphones, gold neon rim light, dark background, shallow depth of field, vertical 9:16.",
"weak": "a gamer",
"tip": "Image prompt = subject + style + light + camera + ratio."
},
{
"goal": "Study plan",
"good": "Make a 7-day study plan for derivatives, 1 hour per day, beginner level. Table with day, topic and 3 practice questions.",
"weak": "study plan maths",
"tip": "Time, level aur format do — plan use karne layak banega."
},
{
"goal": "Article summary",
"good": "Summarise this article in 5 bullet points for a first-year student, each under 20 words, then one key takeaway.",
"weak": "summarise",
"tip": "Bullet count + length + audience."
},
{
"goal": "Exam date",
"good": "Using only the notice text I paste below, tell me the exam date. If it's not in the text, say 'not found'.",
"weak": "When is my VGU exam?",
"tip": "AI ko source do aur 'not found' bolne ki permission do — hallucination kam."
},
{
"goal": "Short ka script",
"good": "Write a 30-second Shorts script with 3 typing tips. Hook in the first line, no 'hey guys' intro, end with a question.",
"weak": "write script on typing",
"tip": "Hook + duration + ending = ready-to-shoot script."
},
{
"goal": "Style copy karna",
"good": "Here are 2 captions in my style: 'Clutch ho gaya 🔥 tum hote toh?' and 'Zone ne dhoka diya 😭'. Write 3 more in the same style.",
"weak": "write captions in my style",
"tip": "Examples do (few-shot) — AI tumhara style pakad lega."
},
{
"goal": "Tutor mode",
"good": "Before explaining C arrays, ask me 3 quick questions to check my level, then explain at that level.",
"weak": "Explain arrays.",
"tip": "AI se pehle sawaal puchwao — answer tumhare level ka milega."
}
],
"puz": [
{
"goal": "Shorts script banana — '3 typing tips'",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a YouTube Shorts scriptwriter.",
"g": 2
},
{
"t": "You are a robot.",
"g": 0
},
{
"t": "You are smart.",
"g": 1
},
{
"t": "You are my friend Rahul.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Write a 30-second script with 3 typing tips.",
"g": 2
},
{
"t": "Write something about typing.",
"g": 1
},
{
"t": "Tell me a joke.",
"g": 0
},
{
"t": "Make a logo.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Audience: Indian students learning to type fast.",
"g": 2
},
{
"t": "Audience: everyone.",
"g": 1
},
{
"t": "It is raining today.",
"g": 0
},
{
"t": "My phone is Android.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Hook line first, then 3 numbered tips, then a closing question.",
"g": 2
},
{
"t": "Any format.",
"g": 0
},
{
"t": "Make it look nice.",
"g": 1
},
{
"t": "Use a table with 10 columns.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Under 80 words, simple Hinglish, no 'hey guys' intro.",
"g": 2
},
{
"t": "Not too long.",
"g": 1
},
{
"t": "Minimum 2000 words.",
"g": 0
},
{
"t": "Use only emojis.",
"g": 0
}
]
}
],
"tip": "Role + task + audience + format + limit = pro prompt. Ye 5-part formula yaad rakho."
},
{
"goal": "C ka doubt solve karna — 'pointers samajh nahi aaye'",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a patient C programming teacher.",
"g": 2
},
{
"t": "You are a teacher.",
"g": 1
},
{
"t": "You are a chef.",
"g": 0
},
{
"t": "You are a hacker.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Explain pointers with one simple real-life analogy.",
"g": 2
},
{
"t": "Explain.",
"g": 1
},
{
"t": "Write my assignment and submit it.",
"g": 0
},
{
"t": "Translate to French.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "I'm a BCA Sem-1 beginner; I know variables and arrays only.",
"g": 2
},
{
"t": "I'm a student.",
"g": 1
},
{
"t": "I like pizza.",
"g": 0
},
{
"t": "I play Free Fire daily.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Analogy, then a 5-line C example, then 2 practice questions.",
"g": 2
},
{
"t": "Give some text.",
"g": 1
},
{
"t": "Only a long paragraph.",
"g": 0
},
{
"t": "A poem.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Simple Hinglish, under 150 words, no advanced jargon.",
"g": 2
},
{
"t": "Keep it short-ish.",
"g": 1
},
{
"t": "Use maximum jargon.",
"g": 0
},
{
"t": "Answer in binary.",
"g": 0
}
]
}
],
"tip": "Apna level batao (kya aata hai, kya nahi) — AI wahi se shuru karega."
},
{
"goal": "YouTube thumbnail image — 'Free Fire 1v4 clutch'",
"slots": [
{
"n": "Subject",
"o": [
{
"t": "A young gamer with headphones, shocked face, holding a phone.",
"g": 2
},
{
"t": "A person.",
"g": 1
},
{
"t": "A bowl of fruit.",
"g": 0
},
{
"t": "A tax form.",
"g": 0
}
]
},
{
"n": "Style",
"o": [
{
"t": "Bold, high-contrast YouTube thumbnail style.",
"g": 2
},
{
"t": "Nice style.",
"g": 1
},
{
"t": "Pencil sketch on lined paper.",
"g": 0
},
{
"t": "Blurry photo.",
"g": 0
}
]
},
{
"n": "Light",
"o": [
{
"t": "Gold neon rim light on a dark background.",
"g": 2
},
{
"t": "Some light.",
"g": 1
},
{
"t": "Flat office light.",
"g": 0
},
{
"t": "Total darkness.",
"g": 0
}
]
},
{
"n": "Text",
"o": [
{
"t": "Big text '1v4 CLUTCH' on the left, easy to read.",
"g": 2
},
{
"t": "Add some text.",
"g": 1
},
{
"t": "Tiny text in the corner, 40 words.",
"g": 0
},
{
"t": "No idea.",
"g": 0
}
]
},
{
"n": "Ratio",
"o": [
{
"t": "16:9, 1280×720.",
"g": 2
},
{
"t": "Square-ish.",
"g": 1
},
{
"t": "9:16 vertical.",
"g": 0
},
{
"t": "Any size.",
"g": 0
}
]
}
],
"tip": "YouTube thumbnail = 16:9 (1280×720). Shorts video = 9:16 — dono alag hain!"
},
{
"goal": "Collab email — brand ko reply",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a professional influencer manager.",
"g": 2
},
{
"t": "You are helpful.",
"g": 1
},
{
"t": "You are a pirate.",
"g": 0
},
{
"t": "You are a cat.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Write a reply email accepting a collab and asking for the brief and budget.",
"g": 2
},
{
"t": "Write email.",
"g": 1
},
{
"t": "Accept any amount instantly.",
"g": 0
},
{
"t": "Write a song.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "I'm a Free Fire creator; the brand sells gaming phone triggers.",
"g": 2
},
{
"t": "I make videos.",
"g": 1
},
{
"t": "I woke up late.",
"g": 0
},
{
"t": "My dog is cute.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Subject line, 3 short paragraphs, sign-off with my name.",
"g": 2
},
{
"t": "Some paragraphs.",
"g": 1
},
{
"t": "One giant paragraph, no subject.",
"g": 0
},
{
"t": "A meme.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Polite, under 120 words, don't promise dates yet.",
"g": 2
},
{
"t": "Not rude.",
"g": 1
},
{
"t": "Promise delivery tomorrow.",
"g": 0
},
{
"t": "Use all caps.",
"g": 0
}
]
}
],
"tip": "Brand emails me kabhi bhi paisa/date pehle commit mat karo — pehle brief maango."
},
{
"goal": "Exam ki taiyari — 'derivatives revision'",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a maths tutor for first-year college students.",
"g": 2
},
{
"t": "You are a tutor.",
"g": 1
},
{
"t": "You are a DJ.",
"g": 0
},
{
"t": "You are a news anchor.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Make a 20-minute revision quiz on derivatives.",
"g": 2
},
{
"t": "Make questions.",
"g": 1
},
{
"t": "Solve my whole exam.",
"g": 0
},
{
"t": "Write a story.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Covered: power, product, quotient, chain rule; sin, cos, eˣ, log x.",
"g": 2
},
{
"t": "Topic is maths.",
"g": 1
},
{
"t": "Exam is boring.",
"g": 0
},
{
"t": "I like cricket.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "10 questions, easy→hard, answers at the end.",
"g": 2
},
{
"t": "Some questions.",
"g": 1
},
{
"t": "Answers mixed inside questions.",
"g": 0
},
{
"t": "One question only.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Only topics I listed; show working steps in answers.",
"g": 2
},
{
"t": "Normal difficulty.",
"g": 1
},
{
"t": "Add topics from PhD level.",
"g": 0
},
{
"t": "No answers at all.",
"g": 0
}
]
}
],
"tip": "Jo padha hai wahi list karo — AI out-of-syllabus questions nahi dega."
},
{
"goal": "Instagram Reel caption",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a social media copywriter for gaming creators.",
"g": 2
},
{
"t": "You write.",
"g": 1
},
{
"t": "You are a doctor.",
"g": 0
},
{
"t": "You are a lawyer.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Write 3 caption options for my Reel.",
"g": 2
},
{
"t": "Write a caption.",
"g": 1
},
{
"t": "Write a 5-page essay.",
"g": 0
},
{
"t": "Design a poster.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Reel: my funniest Free Fire fail, Hinglish audience.",
"g": 2
},
{
"t": "Reel about a game.",
"g": 1
},
{
"t": "Reel about nothing.",
"g": 0
},
{
"t": "My exam is tomorrow.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Each: 1 line + 2 emojis + 3 relevant hashtags.",
"g": 2
},
{
"t": "Add hashtags.",
"g": 1
},
{
"t": "50 hashtags each.",
"g": 0
},
{
"t": "No text, only dots.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Max 15 words each, end with a question to get comments.",
"g": 2
},
{
"t": "Short.",
"g": 1
},
{
"t": "At least 300 words.",
"g": 0
},
{
"t": "Don't mention the video.",
"g": 0
}
]
}
],
"tip": "Caption ke end me question = zyada comments = zyada reach."
},
{
"goal": "Python seekhna — pehla program",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a friendly Python coach for absolute beginners.",
"g": 2
},
{
"t": "You know Python.",
"g": 1
},
{
"t": "You are a magician.",
"g": 0
},
{
"t": "You are a cricket umpire.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Teach me to write a program that adds two numbers.",
"g": 2
},
{
"t": "Teach Python.",
"g": 1
},
{
"t": "Write an AI like ChatGPT for me.",
"g": 0
},
{
"t": "Fix my phone.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "I've never coded; I use a Windows laptop.",
"g": 2
},
{
"t": "I'm new.",
"g": 1
},
{
"t": "I'm an expert.",
"g": 0
},
{
"t": "I have no computer and won't use one.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Step-by-step: install, code, run, expected output.",
"g": 2
},
{
"t": "Some steps.",
"g": 1
},
{
"t": "Only the final code, no explanation.",
"g": 0
},
{
"t": "A riddle.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Explain every line in one simple sentence.",
"g": 2
},
{
"t": "Be clear.",
"g": 1
},
{
"t": "Use advanced libraries.",
"g": 0
},
{
"t": "Skip the explanation.",
"g": 0
}
]
}
],
"tip": "Apna setup batao (Windows/Android, kya installed hai) — steps tumhare liye kaam karenge."
},
{
"goal": "Notes ka summary",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a study assistant who makes exam notes.",
"g": 2
},
{
"t": "You help.",
"g": 1
},
{
"t": "You are a comedian.",
"g": 0
},
{
"t": "You are a spy.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Turn my lecture notes into revision notes.",
"g": 2
},
{
"t": "Make it shorter.",
"g": 1
},
{
"t": "Rewrite them as a rap.",
"g": 0
},
{
"t": "Delete them.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Subject: Basic Electronics, logic gates; exam is MCQ-based.",
"g": 2
},
{
"t": "It's for exams.",
"g": 1
},
{
"t": "I am hungry.",
"g": 0
},
{
"t": "Notes are about cooking.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Bullet points + one truth-table per gate + 5 MCQs.",
"g": 2
},
{
"t": "Bullets.",
"g": 1
},
{
"t": "One long paragraph.",
"g": 0
},
{
"t": "A crossword.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Use only my notes; mark anything unclear as 'check'.",
"g": 2
},
{
"t": "Be accurate.",
"g": 1
},
{
"t": "Add facts from your imagination.",
"g": 0
},
{
"t": "Keep only jokes.",
"g": 0
}
]
}
],
"tip": "'Use only my notes' likhne se AI apni taraf se galat facts nahi jodega."
},
{
"goal": "Video idea brainstorm",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a YouTube growth strategist for Indian gaming channels.",
"g": 2
},
{
"t": "You know YouTube.",
"g": 1
},
{
"t": "You are a plumber.",
"g": 0
},
{
"t": "You are a ghost.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Give me 5 Shorts ideas I can shoot today.",
"g": 2
},
{
"t": "Give ideas.",
"g": 1
},
{
"t": "Give 500 ideas.",
"g": 0
},
{
"t": "Write my biography.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Channel: Free Fire India, 200 subs, I can't afford new gear.",
"g": 2
},
{
"t": "Small channel.",
"g": 1
},
{
"t": "I have a film studio.",
"g": 0
},
{
"t": "Channel about cooking.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "For each: hook line, 3-shot plan, title.",
"g": 2
},
{
"t": "A list.",
"g": 1
},
{
"t": "One word each.",
"g": 0
},
{
"t": "Only emojis.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Each needs only a phone and under 1 hour to make.",
"g": 2
},
{
"t": "Easy ones.",
"g": 1
},
{
"t": "Need drones and actors.",
"g": 0
},
{
"t": "Must take a month.",
"g": 0
}
]
}
],
"tip": "Apni limits (gear, time) batao — ideas realistic aayenge."
},
{
"goal": "Typing practice text",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are a typing coach.",
"g": 2
},
{
"t": "You are a coach.",
"g": 1
},
{
"t": "You are a pilot.",
"g": 0
},
{
"t": "You are a painter.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Create a typing drill for the home row keys.",
"g": 2
},
{
"t": "Make a drill.",
"g": 1
},
{
"t": "Type it for me.",
"g": 0
},
{
"t": "Draw a keyboard.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "I type 15 WPM with two fingers and want to touch type.",
"g": 2
},
{
"t": "I'm slow.",
"g": 1
},
{
"t": "I'm a 150 WPM champion.",
"g": 0
},
{
"t": "My keyboard is pink.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "5 lines, easy→harder, using only a s d f j k l ;",
"g": 2
},
{
"t": "Some lines.",
"g": 1
},
{
"t": "Random symbols only.",
"g": 0
},
{
"t": "A movie review.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Each line under 40 characters, with a daily goal.",
"g": 2
},
{
"t": "Not too hard.",
"g": 1
},
{
"t": "Each line 2000 characters.",
"g": 0
},
{
"t": "No letters allowed.",
"g": 0
}
]
}
],
"tip": "Specific level (15 WPM) + goal (touch typing) = drill sahi level ka."
},
{
"goal": "AI agent banana — WhatsApp auto reply",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are an expert in WhatsApp Business automation.",
"g": 2
},
{
"t": "You know apps.",
"g": 1
},
{
"t": "You are a chef.",
"g": 0
},
{
"t": "You are a poet.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Give me setup steps for a busy-mode auto-reply.",
"g": 2
},
{
"t": "Make a bot.",
"g": 1
},
{
"t": "Hack my friend's WhatsApp.",
"g": 0
},
{
"t": "Write a novel.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "I'm a creator; collab messages need a polite auto-reply.",
"g": 2
},
{
"t": "I get messages.",
"g": 1
},
{
"t": "I hate messages.",
"g": 0
},
{
"t": "I'm on a ship.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Numbered steps + the exact reply text.",
"g": 2
},
{
"t": "Some steps.",
"g": 1
},
{
"t": "Just one word.",
"g": 0
},
{
"t": "A song.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Official WhatsApp Business features only, free tools.",
"g": 2
},
{
"t": "Cheap.",
"g": 1
},
{
"t": "Use unofficial mods.",
"g": 0
},
{
"t": "Must cost a lot.",
"g": 0
}
]
}
],
"tip": "Official route likhne se number ban ka risk nahi."
},
{
"goal": "Excel help",
"slots": [
{
"n": "Role",
"o": [
{
"t": "You are an Excel trainer.",
"g": 2
},
{
"t": "You know computers.",
"g": 1
},
{
"t": "You are a singer.",
"g": 0
},
{
"t": "You are a goalkeeper.",
"g": 0
}
]
},
{
"n": "Task",
"o": [
{
"t": "Show me how to total marks and find the average.",
"g": 2
},
{
"t": "Help with Excel.",
"g": 1
},
{
"t": "Delete my sheet.",
"g": 0
},
{
"t": "Make a video game.",
"g": 0
}
]
},
{
"n": "Context",
"o": [
{
"t": "Marks for 5 subjects are in cells B2 to F2.",
"g": 2
},
{
"t": "I have marks.",
"g": 1
},
{
"t": "I have no data.",
"g": 0
},
{
"t": "My laptop is new.",
"g": 0
}
]
},
{
"n": "Format",
"o": [
{
"t": "Exact formulas with a one-line explanation each.",
"g": 2
},
{
"t": "Some formulas.",
"g": 1
},
{
"t": "A long essay on Excel history.",
"g": 0
},
{
"t": "A drawing.",
"g": 0
}
]
},
{
"n": "Limit",
"o": [
{
"t": "Use only SUM and AVERAGE.",
"g": 2
},
{
"t": "Simple.",
"g": 1
},
{
"t": "Use VBA macros.",
"g": 0
},
{
"t": "No formulas.",
"g": 0
}
]
}
],
"tip": "Cell range batao (B2:F2) — AI exact formula dega: =SUM(B2:F2), =AVERAGE(B2:F2)."
}
],
"type": {
"home": {
"name": "Home Row",
"words": [
"a",
"s",
"d",
"f",
"j",
"k",
"l",
"ask",
"dad",
"sad",
"lad",
"fad",
"add",
"all",
"fall",
"hall",
"flask",
"glass",
"half",
"shall",
"flash",
"dash",
"gash",
"hash",
"lash",
"jag",
"sag",
"flag",
"lass",
"alas",
"gala",
"salad",
"ladle",
"falls",
"asks",
"dads",
"lads",
"flags",
"glad",
"sash"
],
"race": [
"a sad lad asks dad; all fall; a glad lass",
"dad has a flask; all lads add salad",
"ask a lad; flash a flag; shall dad fall",
"a lass had half a salad; dads laugh"
]
},
"words": {
"name": "Words",
"words": [
"time",
"people",
"year",
"way",
"day",
"thing",
"world",
"life",
"hand",
"part",
"child",
"eye",
"place",
"work",
"week",
"case",
"point",
"number",
"group",
"problem",
"fact",
"study",
"learn",
"code",
"game",
"play",
"level",
"skill",
"speed",
"focus",
"daily",
"goal",
"smart",
"brain",
"power",
"quick",
"light",
"dream",
"build",
"start",
"practice",
"score"
],
"race": [
"practice every day and your speed will grow slowly but surely",
"small daily goals beat one big plan that never starts",
"learn one new thing today and teach it to a friend",
"focus on accuracy first and speed will follow"
]
},
"code": {
"name": "Code",
"words": [
"int",
"float",
"char",
"double",
"void",
"main",
"return",
"printf",
"scanf",
"include",
"stdio",
"while",
"for",
"if",
"else",
"break",
"continue",
"switch",
"case",
"default",
"const",
"sizeof",
"struct",
"array",
"i++",
"a[i]",
"%d",
"&n",
"x==y",
"n%2",
"sum+=i",
"def",
"print",
"input",
"range",
"len"
],
"race": [
"int a = 5; printf(\"%d\", a);",
"for (i = 0; i < n; i++) sum += i;",
"if (n % 2 == 0) printf(\"Even\");",
"scanf(\"%d\", &n); return 0;",
"print(\"Hello BCA\")"
]
},
"nums": {"name": "Numbers", "words": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "15", "20", "25", "42", "50", "64", "99", "100", "108", "123", "256", "365", "404", "500", "786", "999", "1000", "2026", "24x7"], "race": ["1 2 3 4 5 6 7 8 9 10", "100 200 300 400 500 600 700 800 900", "my score is 250 and my best is 999", "2 + 2 = 4 and 9 x 9 = 81"]},
"hinglish": {
"name": "Hinglish",
"words": [
"bhai",
"kya",
"scene",
"padhai",
"jaldi",
"mast",
"chalo",
"seekho",
"dost",
"booyah",
"zone",
"khelo",
"aaj",
"kal",
"raat",
"subah",
"kaam",
"paisa",
"yaar",
"sahi",
"galat",
"pakka",
"shuru",
"khatam",
"bas",
"thoda",
"zyada",
"likho",
"padho",
"jeeto"
],
"race": [
"aaj thoda padhai karenge phir game khelenge",
"bhai roz practice karo typing fast ho jayegi",
"pehle C seekho phir python aur AI",
"chalo dost aaj ka challenge pura karte hain"
]
}
}
};
