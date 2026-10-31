/* HEYYANIXX Learn Arcade — Commerce • CA • Sarkari Exam Zone question banks
   Accounting entries follow the golden rules (Personal: receiver Dr / giver Cr · Real: what comes in Dr / what goes out Cr ·
   Nominal: expenses & losses Dr / incomes & gains Cr). Maths questions are generated + computed in code (games3.js). */
(function(){
'use strict';
const C=window.BANK_COM={};

/* ---- Debit-Credit: simple entries. ok=[Dr,Cr]; bad = wrong entries (first one is always the reversed entry) ---- */
C.dc=[
 {t:'Business shuru kiya — owner ne ₹50,000 cash lagaya',ok:['Cash','Capital'],bad:[['Capital','Cash'],['Cash','Sales']],why:'Cash aaya → Dr (Real). Owner ne capital diya (giver) → Capital Cr.'},
 {t:'Furniture kharida cash me ₹5,000',ok:['Furniture','Cash'],bad:[['Cash','Furniture'],['Purchases','Cash']],why:'Furniture aaya → Dr, cash gaya → Cr (Real). Furniture bechne ka maal nahi, isliye Purchases nahi.'},
 {t:'Bechne ke liye maal (goods) kharida cash me ₹10,000',ok:['Purchases','Cash'],bad:[['Cash','Purchases'],['Purchases','Capital']],why:'Trading maal = Purchases A/c Dr. Cash gaya → Cr.'},
 {t:'Ramesh se maal udhaar (credit) kharida ₹8,000',ok:['Purchases','Ramesh'],bad:[['Ramesh','Purchases'],['Purchases','Cash']],why:'Maal aaya → Purchases Dr. Ramesh ne diya (giver) → Ramesh Cr. Cash diya hi nahi.'},
 {t:'Maal becha cash me ₹12,000',ok:['Cash','Sales'],bad:[['Sales','Cash'],['Cash','Purchases']],why:'Cash aaya → Dr. Maal becha → Sales A/c Cr.'},
 {t:'Suresh ko maal udhaar becha ₹6,000',ok:['Suresh','Sales'],bad:[['Sales','Suresh'],['Cash','Sales']],why:'Suresh ne maal liya (receiver) → Suresh Dr. Sales → Cr.'},
 {t:'Staff ko salary di cash me ₹15,000',ok:['Salary','Cash'],bad:[['Cash','Salary'],['Capital','Cash']],why:'Salary expense hai → Dr (Nominal). Cash gaya → Cr.'},
 {t:'Dukaan ka rent diya cheque se ₹7,000',ok:['Rent','Bank'],bad:[['Bank','Rent'],['Rent','Cash']],why:'Rent expense → Dr. Cheque = bank se paisa gaya → Bank Cr (Cash nahi).'},
 {t:'Commission mila cash me ₹2,000',ok:['Cash','Commission Received'],bad:[['Commission Received','Cash'],['Cash','Capital']],why:'Cash aaya → Dr. Commission income hai → Cr (Nominal).'},
 {t:'Cash bank me jama kiya ₹20,000',ok:['Bank','Cash'],bad:[['Cash','Bank'],['Bank','Capital']],why:'Bank ne paisa liya (receiver) → Bank Dr. Cash gaya → Cr. Ye contra entry hai.'},
 {t:'Office use ke liye bank se cash nikala ₹5,000',ok:['Cash','Bank'],bad:[['Bank','Cash'],['Drawings','Bank']],why:'Cash aaya → Dr, bank se gaya → Bank Cr. Office use hai, isliye Drawings nahi.'},
 {t:'Owner ne ghar ke kharch ke liye cash nikala ₹3,000',ok:['Drawings','Cash'],bad:[['Cash','Drawings'],['Salary','Cash']],why:'Owner ka personal use = Drawings Dr. Cash gaya → Cr.'},
 {t:'Ramesh (creditor) ko cash payment ₹8,000',ok:['Ramesh','Cash'],bad:[['Cash','Ramesh'],['Purchases','Cash']],why:'Ramesh ne paisa liya (receiver) → Ramesh Dr. Cash gaya → Cr.'},
 {t:'Suresh (debtor) se cash mila ₹6,000',ok:['Cash','Suresh'],bad:[['Suresh','Cash'],['Cash','Sales']],why:'Cash aaya → Dr. Suresh ne diya (giver) → Suresh Cr.'},
 {t:'XYZ Ltd se machinery udhaar kharidi ₹40,000',ok:['Machinery','XYZ Ltd'],bad:[['XYZ Ltd','Machinery'],['Purchases','XYZ Ltd']],why:'Machinery aayi → Dr. XYZ Ltd giver → Cr. Machinery asset hai, Purchases nahi.'},
 {t:'Bijli ka bill cash me bhara ₹1,200',ok:['Electricity Expenses','Cash'],bad:[['Cash','Electricity Expenses'],['Electricity Expenses','Capital']],why:'Expense → Dr (Nominal). Cash gaya → Cr.'},
 {t:'Interest mila cash me ₹500',ok:['Cash','Interest Received'],bad:[['Interest Received','Cash'],['Cash','Capital']],why:'Cash aaya → Dr. Interest income → Cr.'},
 {t:'Owner ne ghar ke liye business ka maal liya ₹2,000',ok:['Drawings','Purchases'],bad:[['Purchases','Drawings'],['Drawings','Cash']],why:'Owner ne liya → Drawings Dr. Maal business se gaya → Purchases Cr (cost price pe).'},
 {t:'Maal free samples me baanta ₹1,000',ok:['Advertisement','Purchases'],bad:[['Purchases','Advertisement'],['Advertisement','Cash']],why:'Free sample = Advertisement expense Dr. Maal gaya → Purchases Cr.'},
 {t:'Aag me ₹4,000 ka maal jal gaya (insurance nahi tha)',ok:['Loss by Fire','Purchases'],bad:[['Purchases','Loss by Fire'],['Loss by Fire','Cash']],why:'Loss → Dr (Nominal). Maal kam hua → Purchases Cr.'},
 {t:'Ramesh ko maal wapas kiya ₹1,000 (purchase return)',ok:['Ramesh','Purchases Return'],bad:[['Purchases Return','Ramesh'],['Ramesh','Sales Return']],why:'Ramesh ne maal liya (receiver) → Dr. Purchases Return (Return Outwards) → Cr.'},
 {t:'Suresh ne maal wapas kiya ₹500 (sales return)',ok:['Sales Return','Suresh'],bad:[['Suresh','Sales Return'],['Purchases Return','Suresh']],why:'Sales Return (Return Inwards) → Dr. Suresh ne maal diya (giver) → Suresh Cr.'},
 {t:'Mohan se cash me loan liya ₹25,000',ok:['Cash','Mohan\'s Loan'],bad:[['Mohan\'s Loan','Cash'],['Cash','Capital']],why:'Cash aaya → Dr. Mohan ne diya → Loan A/c Cr. Loan capital nahi hota.'},
 {t:'Mazdoori (wages) di cash me ₹3,000',ok:['Wages','Cash'],bad:[['Cash','Wages'],['Wages','Capital']],why:'Wages expense → Dr. Cash gaya → Cr.'},
 {t:'Rent mila cash me ₹4,000 (apni property ka)',ok:['Cash','Rent Received'],bad:[['Rent Received','Cash'],['Cash','Sales']],why:'Cash aaya → Dr. Rent income → Cr.'},
 {t:'Office stationery kharidi cash me ₹600',ok:['Stationery','Cash'],bad:[['Cash','Stationery'],['Purchases','Cash']],why:'Stationery office expense → Dr. Bechne ka maal nahi, isliye Purchases nahi.'},
 {t:'Purana furniture book value pe cash me becha ₹2,500',ok:['Cash','Furniture'],bad:[['Furniture','Cash'],['Cash','Sales']],why:'Cash aaya → Dr. Furniture gaya → Furniture Cr. Asset bechna Sales A/c me nahi jata.'},
 {t:'Machinery pe depreciation lagaya ₹4,000',ok:['Depreciation','Machinery'],bad:[['Machinery','Depreciation'],['Depreciation','Cash']],why:'Depreciation loss → Dr. Machinery ki value kam → Machinery Cr. Cash nahi gaya.'},
 {t:'Suresh diwaliya (insolvent) — ₹1,000 ab nahi milega',ok:['Bad Debts','Suresh'],bad:[['Suresh','Bad Debts'],['Bad Debts','Cash']],why:'Bad debt loss → Dr. Suresh ka balance khatam → Suresh Cr.'},
 {t:'Insurance premium diya cash me ₹2,400',ok:['Insurance','Cash'],bad:[['Cash','Insurance'],['Insurance','Capital']],why:'Insurance expense → Dr. Cash gaya → Cr.'},
 {t:'Office ke liye computer kharida cheque se ₹35,000',ok:['Computer','Bank'],bad:[['Bank','Computer'],['Purchases','Bank']],why:'Computer (asset) aaya → Dr. Bank se paisa gaya → Bank Cr.'},
 {t:'Advertisement ka payment cheque se ₹3,000',ok:['Advertisement','Bank'],bad:[['Bank','Advertisement'],['Advertisement','Cash']],why:'Advertisement expense → Dr. Cheque = Bank Cr.'},
 {t:'Bank ne charges kaat liye ₹200',ok:['Bank Charges','Bank'],bad:[['Bank','Bank Charges'],['Bank Charges','Cash']],why:'Bank charges expense → Dr. Bank balance kam → Bank Cr.'},
 {t:'Bank ne account me interest credit kiya ₹800',ok:['Bank','Interest Received'],bad:[['Interest Received','Bank'],['Cash','Interest Received']],why:'Bank me paisa badha → Bank Dr. Interest income → Cr. Cash haath me nahi aaya.'}
];

/* ---- Debit-Credit: BOSS cases (compound / adjustment). opts[0] is correct; lines "Dr X ₹a" / "Cr Y ₹b" ---- */
C.dcBoss=[
 {t:'Ramesh ko ₹10,000 ke full settlement me ₹9,800 cash diya',opts:[
   ['Dr Ramesh ₹10,000','Cr Cash ₹9,800','Cr Discount Received ₹200'],
   ['Dr Ramesh ₹9,800','Cr Cash ₹9,800'],
   ['Dr Ramesh ₹9,800','Dr Discount Allowed ₹200','Cr Cash ₹10,000']],
  why:'Ramesh ka poora ₹10,000 khatam → Dr. ₹200 ki chhoot mili = Discount Received (gain) → Cr.'},
 {t:'Suresh se ₹5,000 ke full settlement me ₹4,900 cash mila',opts:[
   ['Dr Cash ₹4,900','Dr Discount Allowed ₹100','Cr Suresh ₹5,000'],
   ['Dr Cash ₹4,900','Cr Suresh ₹4,900'],
   ['Dr Cash ₹5,000','Cr Suresh ₹4,900','Cr Discount Received ₹100']],
  why:'Cash ₹4,900 aaya → Dr. ₹100 chhoot di = Discount Allowed (loss) → Dr. Suresh ka poora ₹5,000 → Cr.'},
 {t:'Mohan se ₹10,000 ka maal kharida — aadha cash, baaki udhaar',opts:[
   ['Dr Purchases ₹10,000','Cr Cash ₹5,000','Cr Mohan ₹5,000'],
   ['Dr Purchases ₹5,000','Cr Cash ₹5,000'],
   ['Dr Purchases ₹10,000','Cr Mohan ₹10,000']],
  why:'Poora maal ₹10,000 aaya → Purchases Dr. ₹5,000 cash gaya, ₹5,000 Mohan (giver) ko dena → dono Cr.'},
 {t:'Year end: ₹2,000 salary outstanding hai (abhi di nahi)',opts:[
   ['Dr Salary ₹2,000','Cr Outstanding Salary ₹2,000'],
   ['Dr Outstanding Salary ₹2,000','Cr Salary ₹2,000'],
   ['Dr Salary ₹2,000','Cr Cash ₹2,000']],
  why:'Expense isi saal ka → Salary Dr. Abhi dena baaki = liability → Outstanding Salary Cr.'},
 {t:'Year end: ₹600 insurance agle saal ka hai (prepaid)',opts:[
   ['Dr Prepaid Insurance ₹600','Cr Insurance ₹600'],
   ['Dr Insurance ₹600','Cr Prepaid Insurance ₹600'],
   ['Dr Prepaid Insurance ₹600','Cr Cash ₹600']],
  why:'Agle saal ka hissa asset hai → Prepaid Insurance Dr. Is saal ka expense kam → Insurance Cr.'},
 {t:'Year end: ₹300 interest kamaya par abhi mila nahi (accrued)',opts:[
   ['Dr Accrued Interest ₹300','Cr Interest ₹300'],
   ['Dr Interest ₹300','Cr Accrued Interest ₹300'],
   ['Dr Cash ₹300','Cr Interest ₹300']],
  why:'Milna baaki = asset → Accrued Interest Dr. Income isi saal ki → Interest Cr.'},
 {t:'Year end: ₹1,000 commission agle saal ka advance me aa chuka hai',opts:[
   ['Dr Commission ₹1,000','Cr Commission Received in Advance ₹1,000'],
   ['Dr Commission Received in Advance ₹1,000','Cr Commission ₹1,000'],
   ['Dr Cash ₹1,000','Cr Commission ₹1,000']],
  why:'Ye is saal ki income nahi → Commission Dr (income kam). Advance = liability → Cr.'},
 {t:'Owner ke capital pe ₹1,500 interest allow kiya',opts:[
   ['Dr Interest on Capital ₹1,500','Cr Capital ₹1,500'],
   ['Dr Capital ₹1,500','Cr Interest on Capital ₹1,500'],
   ['Dr Interest on Capital ₹1,500','Cr Cash ₹1,500']],
  why:'Business ka expense → Interest on Capital Dr. Owner ka capital badha → Capital Cr.'},
 {t:'Machinery ₹50,000 cash me kharidi + installation ₹2,000 cash',opts:[
   ['Dr Machinery ₹52,000','Cr Cash ₹52,000'],
   ['Dr Machinery ₹50,000','Dr Installation Expenses ₹2,000','Cr Cash ₹52,000'],
   ['Dr Purchases ₹52,000','Cr Cash ₹52,000']],
  why:'Installation ka kharcha machine ki cost me judta hai (capitalise) → Machinery Dr ₹52,000.'},
 {t:'Owner ki drawings pe ₹400 interest charge kiya',opts:[
   ['Dr Drawings ₹400','Cr Interest on Drawings ₹400'],
   ['Dr Interest on Drawings ₹400','Cr Drawings ₹400'],
   ['Dr Interest on Drawings ₹400','Cr Cash ₹400']],
  why:'Owner pe charge → Drawings (ya Capital) Dr. Business ki income → Interest on Drawings Cr.'}
];

/* ---- Balance Sheet Sorter: a = asset · l = liability · c = capital (owner's side) ---- */
C.bs=[
 ['Cash in Hand','a','Haath me paisa — asset.'],['Bank Balance','a','Bank me jama paisa — asset.'],
 ['Debtors','a','Jinse paisa lena hai — asset.'],['Bills Receivable','a','Milne wala bill — asset.'],
 ['Closing Stock','a','Bacha hua maal — current asset.'],['Machinery','a','Fixed asset.'],['Furniture','a','Fixed asset.'],
 ['Building','a','Fixed asset.'],['Land','a','Fixed asset.'],['Plant','a','Fixed asset.'],['Motor Vehicle','a','Fixed asset.'],
 ['Computer','a','Fixed asset (office equipment).'],['Prepaid Rent','a','Advance diya kharcha — asset.'],
 ['Accrued Interest','a','Kamaya par mila nahi — milna baaki = asset.'],['Goodwill','a','Intangible asset.'],
 ['Investments','a','Asset.'],['Patents','a','Intangible asset.'],['Loose Tools','a','Asset.'],
 ['Creditors','l','Jinko paisa dena hai — liability.'],['Bills Payable','l','Dena wala bill — liability.'],
 ['Outstanding Salary','l','Salary dena baaki — liability.'],['Outstanding Rent','l','Rent dena baaki — liability.'],
 ['Outstanding Wages','l','Wages dena baaki — liability.'],['Bank Overdraft','l','Bank ko lautana hai — liability.'],
 ['Bank Loan','l','Loan lautana hai — liability.'],['Loan from Mohan','l','Bahar wale ka loan — liability, capital nahi.'],
 ['Commission Received in Advance','l','Advance income — kaam karna/lautana baaki = liability.'],
 ['Advance from Customers','l','Customer ka advance — liability.'],
 ['Capital','c','Owner ka paisa — Capital.'],['Additional Capital','c','Owner ne aur paisa daala — Capital me add.'],
 ['Net Profit','c','Profit owner ka — Capital me add hota hai.'],['Net Loss','c','Loss Capital se minus hota hai.'],
 ['Drawings','c','Drawings Capital se minus hoti hai.'],['Interest on Capital','c','Owner ko milta hai — Capital me add.']
];

/* ---- Brain Test (reasoning). a = index of correct option ---- */
C.brain=[
 {k:'Series',q:'2, 6, 12, 20, 30, ?',o:['40','42','44','36'],a:1,why:'n×(n+1): 1×2, 2×3, 3×4… 6×7 = 42.'},
 {k:'Series',q:'3, 9, 27, 81, ?',o:['162','243','108','324'],a:1,why:'Har baar ×3 → 81×3 = 243.'},
 {k:'Series',q:'1, 4, 9, 16, 25, ?',o:['30','36','49','35'],a:1,why:'Squares: 6² = 36.'},
 {k:'Series',q:'5, 11, 23, 47, ?',o:['94','95','96','71'],a:1,why:'×2 + 1 → 47×2+1 = 95.'},
 {k:'Series',q:'2, 3, 5, 7, 11, 13, ?',o:['15','17','19','16'],a:1,why:'Prime numbers — 13 ke baad 17.'},
 {k:'Series',q:'1, 1, 2, 3, 5, 8, ?',o:['11','12','13','16'],a:2,why:'Fibonacci: pichhle do ka sum → 5+8 = 13.'},
 {k:'Series',q:'7, 10, 16, 25, 37, ?',o:['49','52','50','54'],a:1,why:'Difference +3, +6, +9, +12, +15 → 37+15 = 52.'},
 {k:'Series',q:'100, 96, 88, 76, 60, ?',o:['44','40','36','42'],a:1,why:'−4, −8, −12, −16, −20 → 60−20 = 40.'},
 {k:'Series',q:'1, 8, 27, 64, ?',o:['100','125','81','216'],a:1,why:'Cubes: 5³ = 125.'},
 {k:'Series',q:'4, 6, 10, 18, 34, ?',o:['50','66','68','62'],a:1,why:'+2, +4, +8, +16, +32 → 34+32 = 66.'},
 {k:'Series',q:'120, 60, 20, 5, ?',o:['1','2','0','2.5'],a:0,why:'÷2, ÷3, ÷4, ÷5 → 5÷5 = 1.'},
 {k:'Series',q:'2, 5, 10, 17, 26, ?',o:['35','37','36','39'],a:1,why:'n² + 1 → 6²+1 = 37.'},
 {k:'Letters',q:'A, C, F, J, O, ?',o:['T','U','V','S'],a:1,why:'Gap +2, +3, +4, +5, +6 → O(15)+6 = U(21).'},
 {k:'Letters',q:'B, D, G, K, ?',o:['O','P','Q','N'],a:1,why:'Gap +2, +3, +4, +5 → K(11)+5 = P(16).'},
 {k:'Letters',q:'AZ, BY, CX, ?',o:['DV','DW','EW','CW'],a:1,why:'Pehla letter aage, doosra peeche → DW.'},
 {k:'Odd one',q:'Odd one out: 2, 3, 5, 9, 11',o:['2','5','9','11'],a:2,why:'9 prime nahi hai (3×3), baaki sab prime.'},
 {k:'Odd one',q:'Odd one out: Apple, Mango, Potato, Banana',o:['Apple','Mango','Potato','Banana'],a:2,why:'Potato sabzi hai, baaki fruits.'},
 {k:'Odd one',q:'Odd one out: 121, 144, 169, 196, 200',o:['144','169','196','200'],a:3,why:'200 perfect square nahi; 11², 12², 13², 14² hain.'},
 {k:'Odd one',q:'Odd one out: Circle, Triangle, Square, Cube',o:['Circle','Triangle','Square','Cube'],a:3,why:'Cube 3D hai, baaki 2D shapes.'},
 {k:'Odd one',q:'Odd one out: Mercury, Venus, Moon, Mars',o:['Mercury','Venus','Moon','Mars'],a:2,why:'Moon planet nahi, Earth ka satellite hai.'},
 {k:'Odd one',q:'Odd one out: 27, 64, 125, 150, 216',o:['64','125','150','216'],a:2,why:'150 cube nahi; 3³, 4³, 5³, 6³ hain.'},
 {k:'Coding',q:'Agar CAT = DBU, to DOG = ?',o:['EPH','EPG','DPH','FQI'],a:0,why:'Har letter +1: D→E, O→P, G→H.'},
 {k:'Coding',q:'Agar BOOK = CPPL, to PEN = ?',o:['QFO','QEO','OFM','QFN'],a:0,why:'Har letter +1: P→Q, E→F, N→O.'},
 {k:'Coding',q:'Agar A=1, B=2, C=3…, to BAD ka sum = ?',o:['6','7','8','9'],a:1,why:'B(2)+A(1)+D(4) = 7.'},
 {k:'Coding',q:'Agar ROSE = SPTF, to LILY = ?',o:['MJMZ','MJMY','KHKX','MILZ'],a:0,why:'Har letter +1: L→M, I→J, L→M, Y→Z.'},
 {k:'Coding',q:'TABLE ko ELBAT likhte hain, to CHAIR = ?',o:['RIAHC','RIAHB','CRIAH','HCAIR'],a:0,why:'Word ulta likha hai → RIAHC.'},
 {k:'Coding',q:'Agar 2★3 = 13 aur 3★4 = 25, to 4★5 = ?',o:['20','41','40','45'],a:1,why:'a² + b²: 16 + 25 = 41.'},
 {k:'Direction',q:'Ravi 10 km North, phir 10 km East gaya. Start se wo kis direction me hai?',o:['North','East','North-East','South-East'],a:2,why:'North + East dono → North-East.'},
 {k:'Direction',q:'Tum North face kar rahe ho. Right mudo, phir se right. Ab kis taraf face?',o:['East','South','West','North'],a:1,why:'North → right = East → right = South.'},
 {k:'Direction',q:'3 km East, phir 4 km North chale. Start se seedhi doori?',o:['7 km','5 km','1 km','6 km'],a:1,why:'Pythagoras: √(3²+4²) = √25 = 5 km.'},
 {k:'Direction',q:'East face kar rahe ho, 90° left (anticlockwise) mude. Ab?',o:['North','South','West','East'],a:0,why:'East se left = North.'},
 {k:'Direction',q:'Subah dhoop me tumhari parchhai (shadow) kis taraf girti hai?',o:['East','West','North','South'],a:1,why:'Subah sooraj East me → shadow ulti taraf West me.'},
 {k:'Analogy',q:'Doctor : Hospital :: Teacher : ?',o:['Book','School','Student','Class test'],a:1,why:'Jahan kaam karte hain — Teacher school me.'},
 {k:'Analogy',q:'3 : 9 :: 5 : ?',o:['15','25','10','125'],a:1,why:'Square: 3²=9, 5²=25.'},
 {k:'Analogy',q:'2 : 8 :: 3 : ?',o:['9','27','12','18'],a:1,why:'Cube: 2³=8, 3³=27.'},
 {k:'Analogy',q:'Eye : See :: Ear : ?',o:['Sound','Hear','Music','Noise'],a:1,why:'Kaam: aankh se dekhna, kaan se sunna.'},
 {k:'Analogy',q:'Pen : Write :: Knife : ?',o:['Sharp','Cut','Kitchen','Steel'],a:1,why:'Kaam: pen likhta hai, knife kaatta hai.'},
 {k:'Relation',q:'A, B ka bhai hai. B, C ki maa hai. A, C ka kya laga?',o:['Chacha','Mama','Nana','Bhai'],a:1,why:'Maa ka bhai = Mama (maternal uncle).'},
 {k:'Relation',q:'Ek aadmi ki photo dikha ke Riya boli: "Ye mere dada ke ikloute bete ka beta hai." Wo Riya ka kya hai?',o:['Bhai','Chacha','Papa','Cousin'],a:0,why:'Dada ka iklouta beta = Riya ke papa; papa ka beta = Riya ka bhai.'},
 {k:'Logic',q:'5 machines 5 minute me 5 items banati hain. 100 machines 100 items kitne minute me?',o:['100','20','5','1'],a:2,why:'1 machine = 1 item / 5 min. 100 machines saath me → 5 min.'},
 {k:'Logic',q:'Ghadi me 3:00 baje dono suiyon ke beech angle?',o:['60°','90°','120°','180°'],a:1,why:'Har ghanta = 30°; 3 ghante × 30° = 90°.'}
];

/* ---- Sarkari GK (static only). d = difficulty 1 easy · 2 medium · 3 hard ---- */
C.gk=[
 {d:1,s:'Polity',q:'Indian Constitution kab lagu (in force) hua?',o:['15 August 1947','26 January 1950','26 November 1949','2 October 1950'],a:1,why:'26 Jan 1950 se lagu → isliye Republic Day.'},
 {d:2,s:'Polity',q:'Constituent Assembly ne Constitution kab adopt kiya?',o:['26 November 1949','26 January 1950','15 August 1947','9 December 1946'],a:0,why:'26 Nov 1949 — isliye Constitution Day / Samvidhan Divas.'},
 {d:1,s:'Polity',q:'Constitution ki Drafting Committee ke Chairman kaun the?',o:['Jawaharlal Nehru','Dr. B. R. Ambedkar','Dr. Rajendra Prasad','Sardar Patel'],a:1,why:'Dr. B. R. Ambedkar — Drafting Committee chairman.'},
 {d:2,s:'Polity',q:'Constituent Assembly ke President kaun the?',o:['Dr. B. R. Ambedkar','Dr. Rajendra Prasad','Jawaharlal Nehru','C. Rajagopalachari'],a:1,why:'Dr. Rajendra Prasad Constituent Assembly ke President the.'},
 {d:1,s:'Polity',q:'Fundamental Rights Constitution ke kis Part me hain?',o:['Part II','Part III','Part IV','Part V'],a:1,why:'Fundamental Rights = Part III (Art. 12–35).'},
 {d:2,s:'Polity',q:'Directive Principles of State Policy (DPSP) kis Part me hain?',o:['Part III','Part IV','Part IV-A','Part VI'],a:1,why:'DPSP = Part IV (Art. 36–51).'},
 {d:2,s:'Polity',q:'Fundamental Duties kis Article me hain?',o:['Article 21','Article 32','Article 51A','Article 370'],a:2,why:'Article 51A, Part IV-A.'},
 {d:2,s:'Polity',q:'Article 17 kis baare me hai?',o:['Right to Education','Abolition of Untouchability','Equality before law','Freedom of speech'],a:1,why:'Article 17 — chhuachhoot (untouchability) khatam.'},
 {d:1,s:'Polity',q:'"Protection of life and personal liberty" kis Article me hai?',o:['Article 14','Article 19','Article 21','Article 32'],a:2,why:'Article 21 — jeevan aur personal liberty.'},
 {d:2,s:'Polity',q:'Right to Constitutional Remedies kis Article me hai?',o:['Article 32','Article 21','Article 14','Article 356'],a:0,why:'Article 32 — Supreme Court jaane ka adhikar.'},
 {d:1,s:'Polity',q:'Article 14 kya deta hai?',o:['Equality before law','Right to vote','Right to property','Right to religion'],a:0,why:'Article 14 — kanoon ke saamne sab barabar.'},
 {d:2,s:'Polity',q:'Right to Education (6–14 saal) kis Article me hai?',o:['Article 21A','Article 45','Article 19','Article 51A'],a:0,why:'Article 21A — 86th Amendment (2002) se joda gaya.'},
 {d:1,s:'Polity',q:'President banne ki minimum age?',o:['25 saal','30 saal','35 saal','40 saal'],a:2,why:'President ke liye minimum 35 saal.'},
 {d:1,s:'Polity',q:'Lok Sabha member banne ki minimum age?',o:['21 saal','25 saal','30 saal','35 saal'],a:1,why:'Lok Sabha — 25 saal; Rajya Sabha — 30 saal.'},
 {d:2,s:'Polity',q:'Rajya Sabha ka ex-officio Chairman kaun hota hai?',o:['President','Prime Minister','Vice-President','Speaker'],a:2,why:'Vice-President Rajya Sabha ke Chairman hote hain.'},
 {d:3,s:'Polity',q:'Preamble me "Socialist" aur "Secular" kis Amendment se jude?',o:['42nd','44th','52nd','73rd'],a:0,why:'42nd Amendment, 1976.'},
 {d:3,s:'Polity',q:'Abhi kitne Fundamental Duties hain?',o:['10','11','12','9'],a:1,why:'Pehle 10, 86th Amendment (2002) se 11th juda.'},
 {d:3,s:'Polity',q:'National Emergency kis Article me hai?',o:['Article 352','Article 356','Article 360','Article 370'],a:0,why:'352 National · 356 President\'s Rule · 360 Financial Emergency.'},
 {d:3,s:'Polity',q:'Financial Emergency kis Article me hai?',o:['Article 352','Article 356','Article 360','Article 368'],a:2,why:'Article 360 — Financial Emergency.'},
 {d:2,s:'Polity',q:'Money Bill sirf kahan introduce ho sakta hai?',o:['Rajya Sabha','Lok Sabha','Dono me','Supreme Court'],a:1,why:'Money Bill sirf Lok Sabha me (Article 110/109).'},
 {d:1,s:'Geography',q:'India ka sabse bada state (area me)?',o:['Madhya Pradesh','Maharashtra','Rajasthan','Uttar Pradesh'],a:2,why:'Area me Rajasthan sabse bada.'},
 {d:1,s:'Geography',q:'India ka sabse chhota state (area me)?',o:['Goa','Sikkim','Tripura','Kerala'],a:0,why:'Area me Goa sabse chhota state.'},
 {d:1,s:'Geography',q:'India ki sabse lambi nadi (river)?',o:['Yamuna','Godavari','Ganga','Brahmaputra'],a:2,why:'Ganga — India ki sabse lambi nadi.'},
 {d:2,s:'Geography',q:'"Dakshin Ganga" kis nadi ko kehte hain?',o:['Krishna','Kaveri','Godavari','Narmada'],a:2,why:'Godavari = Dakshin Ganga.'},
 {d:3,s:'Geography',q:'Tropic of Cancer kis state se NAHI guzarti?',o:['Gujarat','Rajasthan','Odisha','Mizoram'],a:2,why:'Odisha se nahi guzarti; Gujarat, Rajasthan, Mizoram se guzarti hai.'},
 {d:1,s:'Geography',q:'Duniya ka sabse bada ocean?',o:['Atlantic','Indian','Pacific','Arctic'],a:2,why:'Pacific Ocean sabse bada.'},
 {d:1,s:'Geography',q:'India ka sabse bada desert?',o:['Thar','Sahara','Gobi','Kutch'],a:0,why:'Thar (Great Indian Desert).'},
 {d:3,s:'Geography',q:'Indian Standard Time (IST) kis longitude se liya jata hai?',o:['82.5° E','90° E','75° E','68.7° E'],a:0,why:'82.5° E (82°30′E).'},
 {d:2,s:'Geography',q:'Arunachal Pradesh ki capital?',o:['Dispur','Itanagar','Kohima','Shillong'],a:1,why:'Itanagar.'},
 {d:1,s:'Geography',q:'Duniya ki sabse oonchi chotti (peak)?',o:['K2','Kangchenjunga','Mount Everest','Nanda Devi'],a:2,why:'Mount Everest.'},
 {d:2,s:'History',q:'Battle of Plassey kab hui?',o:['1757','1764','1857','1526'],a:0,why:'1757 — Robert Clive vs Siraj-ud-Daulah.'},
 {d:2,s:'History',q:'Jallianwala Bagh hatyakand kab hua?',o:['1909','1919','1930','1942'],a:1,why:'13 April 1919, Amritsar.'},
 {d:2,s:'History',q:'Dandi March (Salt Satyagraha) kab hua?',o:['1920','1930','1942','1919'],a:1,why:'1930 — Gandhi ji ka Namak Satyagraha.'},
 {d:1,s:'History',q:'Quit India Movement kab shuru hua?',o:['1930','1942','1947','1920'],a:1,why:'1942 — "Karo ya Maro".'},
 {d:1,s:'History',q:'"Do or Die" (Karo ya Maro) ka naara kisne diya?',o:['Bhagat Singh','Subhas Chandra Bose','Mahatma Gandhi','Bal Gangadhar Tilak'],a:2,why:'Mahatma Gandhi — Quit India, 1942.'},
 {d:2,s:'History',q:'"Swaraj mera janmasiddh adhikar hai" kisne kaha?',o:['Bal Gangadhar Tilak','Lala Lajpat Rai','Gopal Krishna Gokhale','Mahatma Gandhi'],a:0,why:'Bal Gangadhar Tilak.'},
 {d:2,s:'History',q:'Indian National Congress ki sthapna kab hui?',o:['1857','1885','1905','1920'],a:1,why:'1885 — A. O. Hume ne sthapit ki.'},
 {d:2,s:'History',q:'Maurya Empire ki sthapna kisne ki?',o:['Ashoka','Chandragupta Maurya','Bindusara','Samudragupta'],a:1,why:'Chandragupta Maurya.'},
 {d:3,s:'History',q:'First Battle of Panipat (1526) kiske beech hui?',o:['Babur vs Ibrahim Lodi','Akbar vs Hemu','Babur vs Rana Sanga','Ahmad Shah Abdali vs Marathas'],a:0,why:'Babur ne Ibrahim Lodi ko haraya.'},
 {d:3,s:'History',q:'Independent India ke pehle Indian Governor-General?',o:['Lord Mountbatten','C. Rajagopalachari','Dr. Rajendra Prasad','Sardar Patel'],a:1,why:'C. Rajagopalachari — pehle aur aakhri Indian Governor-General.'},
 {d:1,s:'Science',q:'Cell ka "powerhouse" kise kehte hain?',o:['Nucleus','Mitochondria','Ribosome','Chloroplast'],a:1,why:'Mitochondria — energy (ATP) banata hai.'},
 {d:2,s:'Science',q:'Vitamin C ki kami se kaunsi bimari?',o:['Rickets','Scurvy','Night blindness','Beriberi'],a:1,why:'Vitamin C → Scurvy.'},
 {d:2,s:'Science',q:'Vitamin D ki kami se kaunsi bimari?',o:['Scurvy','Rickets','Anaemia','Goitre'],a:1,why:'Vitamin D → Rickets.'},
 {d:1,s:'Science',q:'Force ki SI unit?',o:['Joule','Newton','Watt','Pascal'],a:1,why:'Newton (N).'},
 {d:1,s:'Science',q:'Hawa me sabse zyada kaunsi gas?',o:['Oxygen','Nitrogen','Carbon dioxide','Argon'],a:1,why:'Nitrogen ~78%.'},
 {d:1,s:'Science',q:'Sabse kathor (hardest) natural padarth?',o:['Iron','Gold','Diamond','Quartz'],a:2,why:'Diamond.'},
 {d:1,s:'Science',q:'"Red Planet" kise kehte hain?',o:['Venus','Mars','Jupiter','Mercury'],a:1,why:'Mars — iron oxide ki wajah se laal.'},
 {d:2,s:'Science',q:'Shuddh paani ka pH (25°C pe)?',o:['0','7','14','5'],a:1,why:'pH 7 = neutral.'},
 {d:1,s:'Science',q:'Solar system ka sabse bada planet?',o:['Saturn','Jupiter','Earth','Neptune'],a:1,why:'Jupiter.'},
 {d:3,s:'Economy',q:'RBI ki sthapna kab hui?',o:['1935','1947','1949','1969'],a:0,why:'1 April 1935 (1949 me nationalise hua).'},
 {d:1,s:'Economy',q:'RBI ka headquarters kahan hai?',o:['New Delhi','Mumbai','Kolkata','Chennai'],a:1,why:'Mumbai.'},
 {d:3,s:'Economy',q:'₹1 ke note pe kiska signature hota hai?',o:['RBI Governor','Finance Secretary','Finance Minister','President'],a:1,why:'₹1 note Finance Secretary sign karte hain; baaki notes RBI Governor.'},
 {d:1,s:'Static',q:'India ka National Animal?',o:['Lion','Tiger','Elephant','Peacock'],a:1,why:'Royal Bengal Tiger.'},
 {d:1,s:'Static',q:'National Anthem "Jana Gana Mana" kisne likha?',o:['Bankim Chandra Chatterjee','Rabindranath Tagore','Sarojini Naidu','Muhammad Iqbal'],a:1,why:'Rabindranath Tagore.'},
 {d:2,s:'Static',q:'National Song "Vande Mataram" kisne likha?',o:['Rabindranath Tagore','Bankim Chandra Chatterjee','Subramania Bharati','Sri Aurobindo'],a:1,why:'Bankim Chandra Chatterjee (Anandamath).'}
];
})();

/* ---- GST Voucher Master (Tally-style practice). v = voucher type ---- */
(function(){
const C=window.BANK_COM;
/* TallyPrime voucher shortcut keys — verified on Tally Solutions' official help page
   https://help.tallysolutions.com/keyboard-shortcuts-tally-prime/ (read 1 Nov 2026). */
C.vkeys={Contra:'F4',Payment:'F5',Receipt:'F6',Journal:'F7',Sales:'F8',Purchase:'F9','Credit Note':'Alt+F6','Debit Note':'Alt+F5'};
C.tkeys=[
 {q:'Contra voucher kholne ki key?',a:'F4'},{q:'Payment voucher kholne ki key?',a:'F5'},{q:'Receipt voucher kholne ki key?',a:'F6'},
 {q:'Journal voucher kholne ki key?',a:'F7'},{q:'Sales voucher kholne ki key?',a:'F8'},{q:'Purchase voucher kholne ki key?',a:'F9'},
 {q:'Credit Note kholne ki key?',a:'Alt+F6'},{q:'Debit Note kholne ki key?',a:'Alt+F5'},
 {q:'Screen accept / save karne ki key?',a:'Ctrl+A'},{q:'Voucher ki date badalne ki key?',a:'F2'},
 {q:'"Go To" (report/voucher jaldi kholna) ki key?',a:'Alt+G'},{q:'Company Features screen kholne ki key?',a:'F11'},
 {q:'Delivery Note kholne ki key?',a:'Alt+F8'},{q:'Sales Order kholne ki key?',a:'Ctrl+F8'},{q:'Purchase Order kholne ki key?',a:'Ctrl+F9'}
];
C.vouch=[
 {t:'Sharma Traders ko maal credit pe becha ₹10,000 + GST 18%',v:'Sales',why:'Maal becha (cash ho ya credit) → Sales voucher.'},
 {t:'Counter pe maal cash me becha ₹4,500',v:'Sales',why:'Goods ki bikri → Sales voucher, cash me ho tab bhi.'},
 {t:'Gupta & Sons se maal credit pe kharida ₹20,000 + GST 12%',v:'Purchase',why:'Maal kharida → Purchase voucher.'},
 {t:'Wholesaler se maal cash me kharida ₹6,000',v:'Purchase',why:'Goods ki kharid → Purchase voucher, cash me ho tab bhi.'},
 {t:'Office rent ₹8,000 cash me diya',v:'Payment',why:'Paisa (cash/bank) gaya → Payment voucher.'},
 {t:'Supplier Gupta & Sons ko ₹15,000 cheque se diya',v:'Payment',why:'Bank se paisa gaya → Payment voucher.'},
 {t:'Telephone bill ₹1,200 bank (UPI) se bhara',v:'Payment',why:'Kharcha bank se bhara → Payment voucher.'},
 {t:'Owner ne ghar ke liye ₹5,000 cash nikala (drawings)',v:'Payment',why:'Cash business se bahar gaya → Payment voucher.'},
 {t:'Sharma Traders se ₹10,000 ka cheque mila',v:'Receipt',why:'Paisa (cash/bank) aaya → Receipt voucher.'},
 {t:'Customer ne UPI se ₹3,000 bheje',v:'Receipt',why:'Bank me paisa aaya → Receipt voucher.'},
 {t:'Commission ₹1,000 cash me mila',v:'Receipt',why:'Cash aaya → Receipt voucher.'},
 {t:'Owner ne business me ₹50,000 capital bank me daala',v:'Receipt',why:'Bank me paisa aaya → Receipt voucher.'},
 {t:'Cash ₹20,000 bank me jama kiya',v:'Contra',why:'Cash ↔ Bank ke beech entry → Contra voucher.'},
 {t:'Office ke liye bank se ₹5,000 cash nikala',v:'Contra',why:'Bank → Cash = Contra voucher.'},
 {t:'SBI account se HDFC account me ₹10,000 transfer',v:'Contra',why:'Ek bank se doosre bank = Contra voucher.'},
 {t:'Machinery pe ₹5,000 depreciation lagaya',v:'Journal',why:'Na cash, na bank, na maal ki bikri → Journal voucher.'},
 {t:'Year end: ₹4,000 salary outstanding (abhi di nahi)',v:'Journal',why:'Adjustment entry → Journal voucher.'},
 {t:'Customer diwaliya — ₹2,000 bad debt likha',v:'Journal',why:'Non-cash adjustment → Journal voucher.'},
 {t:'Year end: ₹600 insurance prepaid adjustment',v:'Journal',why:'Adjustment entry → Journal voucher.'},
 {t:'Customer ne ₹1,000 ka maal wapas kiya (sales return)',v:'Credit Note',why:'Sales return → Credit Note (customer ko credit diya).'},
 {t:'Supplier ko ₹2,000 ka kharab maal wapas bheja (purchase return)',v:'Debit Note',why:'Purchase return → Debit Note (supplier ko debit kiya).'}
];
C.states=['Rajasthan','Maharashtra','Gujarat','Uttar Pradesh','Bihar','Karnataka','Tamil Nadu','Madhya Pradesh','West Bengal','Punjab'];
})();
