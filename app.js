const  iso3166 = require('iso-3166-2');
const isoCurrencies = require('mobitel-iso-4217-currencies');

var fs = require('fs');



//COUNTRIES
const countries = [];
const que = [];
const countriesnames = ["Afghanistan","Aland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Virgin Islands","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands ","Central African Republic","Chad","Chile","China","Hong Kong","Macao","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo","Cook Islands ","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas) ","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar ","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard and Mcdonald Islands","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Isle of Man ","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, (North)","Korea, (South)","Kuwait","Kyrgyzstan","Lao PDR","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia, Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue ","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saint-Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint-Martin (French part)","Saint Pierre and Miquelon ","Saint Vincent and Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Sout Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen Islands ","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau ","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands ","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","US Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, US","Wallis and Futuna Islands ","Western Sahara","Yemen","Zambia","Zimbabwe"]
const alpha2= ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","VG","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","HK","MO","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VI","WF","EH","YE","ZM","ZW"];
const alpha3= ["AFG","ALA","ALB","DZA","ASM","AND","AGO","AIA","ATA","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BIH","BWA","BVT","BRA","VGB","IOT","BRN","BGR","BFA","BDI","KHM","CMR","CAN","CPV","CYM","CAF","TCD","CHL","CHN","HKG","MAC","CXR","CCK","COL","COM","COG","COD","COK","CRI","CIV","HRV","CUB","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","ETH","FLK","FRO","FJI","FIN","FRA","GUF","PYF","ATF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GLP","GUM","GTM","GGY","GIN","GNB","GUY","HTI","HMD","VAT","HND","HUN","ISL","IND","IDN","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JEY","JOR","KAZ","KEN","KIR","PRK","KOR","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MKD","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MTQ","MRT","MUS","MYT","MEX","FSM","MDA","MCO","MNG","MNE","MSR","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","ANT","NCL","NZL","NIC","NER","NGA","NIU","NFK","MNP","NOR","OMN","PAK","PLW","PSE","PAN","PNG","PRY","PER","PHL","PCN","POL","PRT","PRI","QAT","REU","ROU","RUS","RWA","BLM","SHN","KNA","LCA","MAF","SPM","VCT","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SVK","SVN","SLB","SOM","ZAF","SGS","SSD","ESP","LKA","SDN","SUR","SJM","SWZ","SWE","CHE","SYR","TWN","TJK","TZA","THA","TLS","TGO","TKL","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","UMI","URY","UZB","VUT","VEN","VNM","VIR","WLF","ESH","YEM","ZMB","ZWE"];
const numberCode = ["004","248","008","012","016","020","024","660","010","028","032","051","533","036","040","031","044","048","050","052","112","056","084","204","060","064","068","070","072","074","076","092","086","096","100","854","108","116","120","124","132","136","140","148","152","156","344","446","162","166","170","174","178","180","184","188","384","191","192","196","203","208","262","212","214","218","818","222","226","232","233","231","238","234","242","246","250","254","258","260","266","270","268","276","288","292","300","304","308","312","316","320","831","324","624","328","332","334","336","340","348","352","356","360","364","368","372","833","376","380","388","392","832","400","398","404","296","408","410","414","417","418","428","422","426","430","434","438","440","442","807","450","454","458","462","466","470","584","474","478","480","175","484","583","498","492","496","499","500","504","508","104","516","520","524","528","530","540","554","558","562","566","570","574","580","578","512","586","585","275","591","598","600","604","608","612","616","620","630","634","638","642","643","646","652","654","659","662","663","666","670","882","674","678","682","686","688","690","694","702","703","705","090","706","710","239","728","724","144","736","740","744","748","752","756","760","158","762","834","764","626","768","772","776","780","788","792","795","796","798","800","804","784","826","840","581","858","860","548","862","704","850","876","732","887","894","716"];


/* var datos  = [];
var objeto = {};
for(let i = 0; i <=countriesnames.length; i++){
    const hola = {C_Countries_Country_Official_Name: countriesnames[i],C_Countries_Country_Code_3166_1_Alpha_2: alpha2[i], C_Countries_Country_Code_3166_1_Alpha_3: alpha3[i], C_Countries_Country_Code_3166_1_numeric: numberCode[i], C_Countries_Country_subdivision_links_3166: "", C_Countries_Main_Currency_Code_639_3: "", C_Countries_Country_Alternative_Currencies:"", C_Countries_Country_Names: {}, C_Countries_Country_Main_Lenguage: {}, C_Countries_Country_Alternative_lenguages:{}};
   datos.push(hola);
}
objeto.countries = datos;

var dictstring = JSON.stringify(objeto);
fs.writeFileSync("thing.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
}); 
 */




//console.log(iso3166.country('ANT').sub);
//console.log(countrie.find(ele => ele.nombre === "Poland" && ele.iso2 === "PL" && ele.iso3 === "POL" && ele.numbre === "616"));


//SUBDIVIONS *************************************************************
/* const aux =iso3166.country("MEX").sub;
var datos  = [];
var objeto = {};
//GENERAR SUBDIVIONES
for(let i = 0; i<=countriesnames.length; i++){
    

        if(alpha3[i] !== "ANT" && alpha3[i] !== undefined){
            const hola = {[countriesnames[i] + "-" +  alpha3[i]]:  { "Country_Subdivions" :iso3166.country(alpha3[i]).sub}};
            datos.push(hola);
            
        }
    }
    
     objeto.data = datos;
    console.log(objeto);

    var dictstring = JSON.stringify(objeto);
            fs.writeFileSync("thing.json", dictstring, function(err, result) {
                if(err) console.log('error', err);
            }); 
 */



//LENGUAJES**************************************************************************************
const nombreLenguajes = ["afrikaans", "amárico", "árabe", "aragonés", "assamés", "asturiano", "aymara", "azerí", "baskir", "bambara", "bielorruso", "bengalí", "Bislama", "bosnio", "bretón", "buginés", "búlgaro", "catalán", "cebuano", "checo", "chamorro", "chuvasio", "córnico", "corso", "cree", "casubio", "galés", "danés", "alemán", "dhivehi", "dzongkha", "griego", "inglés", "esperanto", "estonio", "euskera (vasco)", "feroés", "farsi (o persa)", "fijiano fidji", "filipino", "finés (o finlandés)", "francés", "frisón (o frisio)", "fula", "friulano", "gaélico escocés", "irlandés (o gaélico)", "gallego", "manés (gaélico manés o de Isla de Man)", "guaraní", "guaraní", "criollo haitiano", "Hausa", "Hawaiano", "hebreo", "hindi de Fiyi", "hindi (o hindú)", "croata", "húngaro", "armenio", "ido", "Interlingue", "ilocano", "Interlingua", "indonesio", "islandés", "italiano", "javanés", "lojban", "japonés", "kalaallisut (o groenlandés)", "georgiano", "kazajo (o kazajio)", "jemer", "ruandés", "kirguís", "komi", "kikongo", "coreano", "kurdo", "judeoespañol", "laosiano", "latín", "letón", "limburgués", "lingala", "lituano", "luxemburgués", "marshalés", "márata", "macedonio", "malgache (o malgasy)", "maltés", "moldavo", "mongol", "maorí", "malayo", "birmano", "chino min nan", "napolitano","nauruano","navajo","bajo alemán","nepalí","niuano","neerlandés","nynorsk","bokmål","noruego","chichewa","occitano","osetio","pampango","papiamento","palauano","alemán de Pensilvania","polaco","portugués","pashtu (o pashto)","quechua","rarotongano","retorrománico","rumano","rundí","arrumano","ruso","sango","siciliano","escocés","eslovaco","esloveno","sami septentrional","samoano","Shindi","somalí","seshoto","español castellano","albanés","sardo","serbio","swazi (swati o siSwati)","sudanés","suajili","comorense","sueco","tahitiano","tamil","tártaro","telugú","tetun","tayiko","tagalo","tailandés","tigriña","tongano","tok pisin","tswana","turcomano","tumbuka","turco","tuvaluano","twi","ucraniano","urdú","uzbeko","vietnamita","volapük","voro","samareño","valón","wolof","xhosa","yoruba","chino cantonés","chuang","chino","zulú"];
//console.log(nombreLenguajes.length);


const iso639_3 =  [ "afr", "amh", "ara", "arg", "asm", "ast", "aym", "aze", "bak", "bam", "bel", "ben", "bis", "bos", "bre", "bug", "bul", "cat", "ceb", "ces", "cha", "chv", "cor", "cos", "cre", "csb", "cym", "dan", "deu", "div", "dzo", "ell", "eng", "epo", "est", "eus", "fao", "fas", "fij", "fil", "fin", "fra", "fry", "ful", "fur", "gla", "gle", "glg", "glv", "grn", "gug", "hat", "hau", "haw", "heb", "hif", "hin", "hrv", "hun", "hye", "ido", "ile", "ilo", "ina", "ind", "isl", "ita", "jav", "jbo", "jpn", "kal", "kat", "kaz", "khm", "kin", "kir", "kom", "kon", "kor", "kur", "lad", "lao", "lat", "lav", "lim", "lin", "lit", "ltz", "mah", "mar", "mkd", "mlg", "mlt", "mol", "mon", "mri", "msa", "mya", "nan","nap","nau","nav","nds","nep","niu","nld","nno","nob","nor","nya","oci","oss","pam","pap","pau","pdc","pol","por","pus","que","rar","roh","ron","run","rup","rus","sag","scn","sco","slk","slv","sme","smo","snd","som","sot","spa","sqi","srd","srp","ssw","sun","swa","swb","swe","tah","tam","tat","tel","tet","tgk","tgl","tha","tir","ton","tpi","tsn","tuk","tum","tur","tvl","twi","ukr","urd","uzb","vie","vol","vor","war","wln","wol","xho","yor","yue","zha","zho","zul"];
//console.log(iso639_3.length);

/* nombreLenguajes.forEach(nombre => console.log(nombre))
iso639_3.forEach(nombre => console.log(nombre)) */

var datos  = [];
var objeto = {};
//arreglo de lenguajes con iso
for(let i = 0 ; i<=nombreLenguajes.length; i++){

    const dato = {iso639_3: iso639_3[i] , name: nombreLenguajes[i] };
    datos.push(dato);
 //arr.push({[nombreLenguajes[i] ] : { iso: iso639_3[i] }})

}
objeto.Languajes = datos;
var dictstring = JSON.stringify(objeto);
fs.writeFileSync("C_Languajes2.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
}); 

//console.dir(arr, {'maxArrayLength': null});


//CURRENCIES*********************************************************
//const monedas = iso4217;


const iso4217 = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XCD","XOF","XPF","YER","ZAR","ZMW"]

const iso4217_numeric = ["784", "971", "8", "51", "532", "973", "32", "36", "533", "944", "977", "52", "50", "975", "48", "108", "60", "96", "68", "986", "44", "64", "72", "974", "84", "124", "976", "756", "152", "156", "170", "188", "931", "192", "132", "203", "262", "208", "214", "12", "818", "232", "230", "978", "242", "238", "826", "981", "936", "292", "270", "324", "320", "328", "344", "340", "191", "332", "348", "360", "376", "356", "368", "364", "352", "388", "400", "392", "404", "417", "116", "174", "408", "410", "414", "136", "398", "418", "422", "144", "430", "426", "440", "434", "504", "498", "969", "807", "104", "496", "446", "478", "480", "462", "454", "484", "458", "943", "516","566","558","578","524","554","512","590","604","598","608","586","985","600","634","946","941","643","646","682","90","690","938","752","702","654","694","706","968","728","678","760","748","764","972","934","788","776","949","780","901","834","980","800","840","858","860","937","704","548","882","950","951","952","953","886","710","967"]
const name = ["dirham de los Emiratos Árabes Unidos","Afgani afgano","lek albanés","dram armenio","florín antillano neerlandés","kwanza angoleño","peso argentino","dólar australiano","florín arubeño","manat azerbaiyano","marco convertible de Bosnia-Herzegovina","dólar de Barbados","taka de Bangladesh","Lev búlgaro","dinar bahreiní","franco burundés","dólar bermudeño","dólar de Brunéi","Boliviano","Real brasileño","dólar bahameño","Ngultrum de Bután","pula de Botsuana","rublo bielorruso","dólar de Belice","dólar canadiense","franco congoleño","franco suizo","peso chileno","Yuan chino","peso colombiano","colón costarricense","peso cubano convertible","peso cubano","Escudo caboverdiano","koruna checa","franco yibutiano","corona danesa","peso dominicano","dinar algerino","libra egipcia","nakfa eritreo","birr etíope","Euro","dólar fiyiano","libra malvinense","libra esterlina","lari georgiano","cedi ghanés","libra de Gibraltar","dalasi gambiano","franco guineano","Quetzal guatemalteco","dólar guyanés","dólar de Hong Kong","lempira hondureño","kuna croata","Gourde haitiano","forint húngaro","rupiah indonesia","nuevo shéquel israelí","rupia india","dinar iraquí","rial iraní","Króna islandesa","dólar jamaicano","dinar jordano","Yen japonés","chelín keniata","Som kirguís","riel camboyano","franco comoriano","won norcoreano","won surcoreano","dinar kuwaití","dólar caimano","tenge kazajo","Kip lao","libra libanesa","rupia de Sri Lanka","dólar liberiano","loti lesotense","litas lituano","dinar libio","dirham marroquí","leu moldavo","ariary malgache","denar macedonio","Kyat birmano","tughrik mongol","pataca de Macao","ouguiya mauritana","rupia mauricia","rufiyaa maldiva","kwacha malauí","peso mexicano","ringgit malayo","metical mozambiqueño","dólar namibio","naira nigeriana","córdoba nicaragüense","corona noruega","rupia nepalesa","dólar neozelandés","rial omaní","Balboa panameña","nuevo sol peruano","Kina de Papúa Nueva Guinea","peso filipino","rupia pakistaní","zloty polaco","guaraní paraguayo","rial qatarí","Leu rumano","dinar serbio","rublo ruso","franco ruandés","riyal saudí","dólar de las Islas Salomón","rupia de Seychelles","dinar sudanés","corona sueca","dólar de Singapur","libra de Santa Helena","leone de Sierra Leona","chelín somalí","dólar surinamés","libra","dobra de Santo Tomé y Príncipe","libra siria","lilangeni suazi","baht tailandés","somoni tayik","manat turcomano","dinar tunecino","Pa'anga tongano","Lira turca","dólar de Trinidad y Tobago","dólar taiwanés","chelín tanzano","grivna ucraniana","chelín ugandés","dólar estadounidense","peso uruguayo","Som uzbeko","Bolívar fuerte venezolano","dong vietnamita","vatu vanuatense","tala samoana","franco CFA de África central","dólar del Caribe Oriental","franco CFA de África Occidental","franco CFP","rial yemení","rand sudafricano","kwacha zambiano"];
const symbols = ["د.إ","؋","L","դր.","ƒ","Kz","$","$","ƒ","m","КМ","$","৳","лв",".د.ب","Fr","$","$","Bs.","R$","$","Nu.","P","Br","$","$","Fr","Fr","$","¥","$","₡","$","$","Esc or $","Kč","Fr","kr","$","د.ج","ج.م","Nfk","Br","€","$","£","£","ლ","₵","£","D","Fr","Q","$","$","L","kn","G","Ft","Rp","₪","₹","ع.د","﷼","kr","$","د.ا","¥","Sh","лв","៛","Fr","₩","₩","د.ك","$","₸","₭","ل.ل","Rs","$","L","Lt","ل.د","د.م.","L","Ar","ден","Ks","₮","P","UM","₨",".ރ","MK","$","RM","MT","$","₦","C$","kr","₨","$","ر.ع.","B/.","S/.","K","₱","₨","zł","₲","ر.ق","L","дин.","руб.","Fr","ر.س","$","₨","£","kr","$","£","Le","Sh","$","£","Db","ل.س","L","฿","ЅМ","m","د.ت","T$","NULL","$","$","Sh","₴","Sh","$","$","лв","Bs F","₫","Vt","T","Fr","$","Fr","Fr","﷼","R","ZK"];
const fraccion = ["fils","pul","qindarkë","luma","cent","cêntimo","centavo","cent","cent","qəpik","fening","cent","paisa","stotinka","fils","centime","cent","sen","centavo","centavo","cent","chetrum","thebe","kapyeyka","cent","cent","centime","rappen","centavo","fen","centavo","cêntimo","centavo","centavo","centavo","haléř","centime","øre","centavo","Santeem","piaster","cent","santim","cent","cent","penny","penny","tetri","pesewa","penny","butut","centime","centavo","cent","cent","centavo","lipa","centime","fillér","sen","agora","paisa","fils","NULL","eyrir","cent","piastre","sen","cent","tyiyn","sen","centime","chon","jeon","fils","cent","tïın","att","piastre","cent","cent","sente","centas","dirham","centime","ban","iraimbilanja","deni","pya","möngö","avo","khoums","cent","laari","tambala","centavo","sen","centavo","cent","kobo","centavo","øre","paisa","cent","Baisa","centésimo","cêntimo","toea","centavo","paisa","grosz","cêntimo","dirham","ban","para","kopek","centime","halala","cent","cent","piastre","öre","cent","penny","cent","cent","cent","piastre","cêntimo","piastre","cent","satang","diram","tennesi","millime","seniti","kuruş","cent","cent","cent","kopiyka","cent","cent","centésimo","tiyin","cêntimo","hào","NULL","sene","centime","cent","centime","centime","fils","cent","ngwee"];
//Generar base monedas
/* for(let i = 0; i<=iso4217.length; i++){
    console.log(`{Curency_name: ${name[i]}, C_Curency_iso_4217:  ${iso4217[i]}, C_Curency_iso_4217_Number: ${iso4217_numeric[i]}, Curency_symbol: ${symbols[i]}, Curency_fraccion: ${fraccion[i]}},`);
} */




//AGREGANDO MONEDAS A LOS PAISES
//const info = fs.readFileSync('./thing.json',{encoding: 'utf-8'});

const monedas = isoCurrencies.list;

//const dataCountries = JSON.parse(info);
/* dataCountries.countries.forEach(contry => {

    monedas.forEach(moneda => {
          if(moneda.country === contry.C_Countries_Country_Official_Name){
            contry.C_Countries_Main_Currency_Code_639_3 = moneda.alpha3
        }        
    })
    
})

console.log(dataCountries); */

/* var dictstring = JSON.stringify(dataCountries);
fs.writeFileSync("thing2.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
}); 
 */




//Paises que hablan ingles
/* const paises_idioma_ingles = ["Bahamas","Barbados","Belize","Botswana","Cameroon","Canada","Dominica","Eritrea","Philippines","Fiji","Gambia","Ghana","grenade","Guyana","India","Ireland","Jamaica","Jordan","Kenya","Kiribati","Lesotho","Liberia","Malawi","Malt","Marshall Islands","Mauritius","Federated States of Micronesia","Namibia","Nauru","New Zealand","Nigeria","Pakistan","Palau","Papua New Guinea","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","Seychelles","Sierra Leone","Singapore","Solomon Islands","South Africa","Sudan","Swaziland","Tanzania","Tonga","Trinidad and Tobago","Tuvalu","Uganda","Vanuatu","Zambia","Zimbabwe","Australia","United Kingdom","United States of America"];
const info = fs.readFileSync('./Catalogos/Countries/C_Countries_With_Currencies.json',{encoding: 'utf-8'});
//const info = fs.readFileSync('./Catalogos/Countries/C_Countries_With_Currencies.json',{encoding: 'utf-8'});
const dataCountries = JSON.parse(info);
dataCountries.countries.forEach(contry => {

    paises_idioma_ingles.forEach((pi,i) => {
          if(pi === contry.C_Countries_Country_Official_Name){
            contry. C_Countries_Country_Main_Lenguage = "eng"
            
        }        
    })
    
})

console.log(dataCountries);

var dictstring = JSON.stringify(dataCountries);
fs.writeFileSync("C_Countries_With_Currencies&Main_Languaje_eng.json", dictstring, function(err, result) {
    if(err) console.log('error', err);
}); 
 */


//Unidades de medida SAT
const tipos = ["Acústica","Calor","Diversos","Electricidad y magnetismo","Fenomenos periodicos y relacionados","Fisica Atomica y nuclear","Fisica de estado sólido","Fisica, quimica y fisica molecular","Luz y radiaciones electromagneticas relacionadas","Mecánica","Multiplos/Fracciones/Decimales","Números caracteristicos (parametros adimensionales","Números enteros / Números /Ratios","Reaaciones nucleares y radiaciones ionizantes","Tiempo y espacio","Unidades base calificadas en los niveles 1 y 2","Unidades de Empaque","Unidades de envío y transporte","Unidades de tecnología de información","Unidades de venta","Unidades específicas de la Industria (varias)"];
const subtipos = [
    ["Decremento logarítmico","Densidad de energía sonora", "volumetríca","energía de sonido","Densidad superficial de la impedancia mecánica","Exposición al sonido","Impedancia acústica","Impedancia característica de un medio","Impedancia mecánica","Intensidad de sonido","Intervalo de frecuencia","Nivel de presión acústica","Nivel de potencia acústica","Nivel de volumen","Presión estática","presión de sonido(instántanea)","Volumen (Audio)"], //Acustica
    ["Aislamiento Térmico","Coeficiente de aislamiento térmico","Calor","Cantidad de calor","Energía","Energía termodinámica","Entalpía","Función Helmholtz","Energía libre de Helmholtz","Capacidad calorífica","Entropía","Capacidad de calor específica a: -presión constante,  -volumen constante, -saturación ","Coeficiente de expansión lineal","Coeficiente de expansión cúbica","Coeficiente de presión relativa","Coeficiente de presión","Coeficiente de superficie de transferencia de calor","Coeficiente de transferencia de calor","Conductancia térmica","Conductividad térmica","Densidad de energía","Densidad del flujo de calor","Difusividad térmica","Energía libre de Helmholtz","Energía libre específica de Helmholtz","Energía masiva","Energía específica","Energía termodinámica especifíca","Energía termodinámica masiva","Entalpia masica","Entalpía específica","Función de Gibbs","Energía libre de Gibbs","Función específica de Helmholtz","Energía libre de Gibbs masiva","Energía libre específica de Gibbs","Resistencia térmica","Tasa de flujo de calor","Temperatura","Temperatura de Fahrenheit","Termodinámico","Variación de temperatura a lo largo del tiempo"], //Calor
    ["Índice de pureza", "Índice de explosión", "Otros", "Porosidad"], //DIversos
    ["Auto inductancia, Inductancia mutua, Permeabilidad", "Capacidad", "Carga de resistencia por unidad de longitud", "Carga eléctrica, Cantidad de eléctricidad, Flujo eléctrico(flujo de desplazamiento)", "Carga líneal", "Coeficiente, Característica de rendimiento", "Conductancia (para corriente continua), Admitancia…dmitancia), Conductancia (para corriente alterna)", "Conductividad", "Corriente eléctrica, diferencia de potencial magnético, Fuerza magnetomotriz, Conexión actual", "Densidad actual", "Densidad de corriente eléctrica lineal, Corriente eléctrica lineal, Intensidad de campo magnético", "Densidad de energía electromagnética, Energía electromagnética volumetríca", "Densidad de flujo magnético, Inducción magnética, Polarización magnética", "Densidad superficial de carga, Densidad de flujo eléctrico, Polarización eléctrica de desplazamiento", "Densidad volumétrica de carga, Densidad de carga, Carga Volumétrica", "Flujo magnético", "Fuerza de campo eléctrico", "Momento dipolar eléctrico", "Momento electromagnético, Momento magnético, (momento de área magnética)", "Permeabilidad, Permeabilidad del vacío, Constante magnética", "Permitividad, Permitividad del vacío, (constante eléctrica)", "Poder aparente", "Poder reactivo", "Potencia (para corriente continua), Potencia activa", "Potencial del vector magnético", "Potencial eléctrico, Diferencia de potencial, Tensión, Voltaje,  Fuerza electromotriz", "Reluctancia", "Resistencia (a la corriente continua), Impedancia, (impedancias complejas), Módulo de impedancia, Resitencia (a la corriente alterna), Reactancia", "Resistencia lineal", "Resistividad", "Susceptancia"], // Electricidad y magnetismo
    ["Coeficiente de amortiguamiento", "Frecuencia", "Frecuencia rotacional", "Nivel de una cantidad de campo, Nivel de una cantidad de potencia"], //Fenomenos periodicos y relacionados
    ["Actividad", "Actividad específica en una muestra ", "Actividad volumétrica, Concentración de actividad", "Coeficiente giromagnético, (proporción giromagnética)", "Planck constante"], //Fisica Atomica y nuclear
    ["Coeficiente de Seebeck para las sustancias a y b", "Coeficiente de Thompson", "Coeficiente Hall", "Concentración espectral de modos vibratorios (en términos de frecuencia angular)", "Constante de Richardson", "Densidad de estados", "Quantum de flujo magnético", "Repetición angular de Fermi, Número de onda angular de Fermi"], //Fisica de estado solido
    ["Acidez y Alcalinidad", "Actividad catalítica", "Cantidad de sustancia", "Capacidad calorífica molar, Entropía molar, Constante de gas molar", "Conductividad molar", "Constante de Avogrado", "Constante de Faraday", "Dosificación volumétrica", "Energía termodinámica molar", "Flujo molar", "Fuerza iónica", "Masa de mólecula", "Masa molar", "Masa volumétrica, Densidad de masa, Densidad, conc…a de B, Cantidad de sustancia, Concentración de B", "Molalidad del soluto B", "Momento dipolar magnético", "Poder óptico rotatorio, rotatorio, Poder rotatorio óptico específico", "Polarizabilidad eléctrica de una molécula", "Potencia rotatoria óptica molar", "Volumen molar"],//Fisica, Quimica y Fisica molecular
    ["Cantidad de Luz", "Coeficiente de absorción molar", "Concentración espectral de densidad de energía rad…iante espectral (en términos de longitud de onda)", "Constante Stefan-Boltzmann", "Densidad de energía radiante", "Eficacia luminosa, Eficacia luminosa espectral, Ef… especificada, Máxima eficacia luminosa espectral", "Energía radiante, Tasa de fluencia, Salida de radiación, Irradiación, primera constante de radiación", "Exposición a la luz", "Exposición de fotones", "Fluencia de la energía radiante, Exposición a la radiancia", "Flujo luminoso", "Iluminancia", "Intensidad de fotones", "Intensidad luminosa", "Intensidad radiante", "Luminancia", "Luminancia de fotones, Resplandor de fotones", "Número de onda angular, Repetición angular", "Resplandor", "Salida de fotones, Irradiancia", "Salida luminosa", "Segunda radiación constante"], //Luz y radiaciones electromagneticas
    ["Cantidad de movimiento, momento lineal, ímpetu o moméntum", "Caudal de masa", "Caudal volumétrico", "Compresibilidad, Compresibilidad a granel", "Constante gravitacional", "Densidad lineal, Masa lineal", "Densidad superficial, Masa areica", "Densidad, Densidad de masa, Masa volumétrica", "Fuerza dividida por longitud", "Fuerza, Peso", "Impulso", "Impulso angular", "Masa", "Momento de fuerza, Momento puro o Torque", "Momento de impulso, Momento angular", "Momento de inercia (momento dinámico de inercia)", "Otros (mecánica)", "Poder", "Presión, Esfuerzo normal, Esfuerzo cortante, Módul… rigidez, Módulo de volumen, Módulo de compresión", "Proporción de presión", "Relación de masa", "Rigidez torsional, Momento de torsión relacionado con el área", "Segundo momento de área, Segundo momento axial de área", "Segundo momento polar del área", "Tasa de flujo de energía", "Tasa de fuga de gas", "Tensión superficial", "Trabajo, Energía, Energía potencial, Energía cinética", "Viscosidad (viscosidad dinámica)", "Viscosidad cinemática", "Volumen específico, Volumen masivo"], //Mecanica
    ["Múltiplos / Fracciones /Decimales"], // Múltiplos / Fracciones /Decimales
    ["Unidad"], // Numeros caracteristicos, (parametros adimensionales)
    ["Números enteros / Números / Ratios"],// Números enteros / Números / Ratios
    ["Coeficiente de atenuación masiva", "Densidad de fuente de neutrones", "Dosificación física D (Dosificación absorbida)", "Energía específica impartida, Energía masónica impartida", "Exposición", "Fluencia de partículas", "Kerma", "Movilidad", "Potencia de frenado lineal total", "Potencia total de detención de masa", "Potencia total de parada atómica", "Ralentizando la densidad", "Salida de dosis de equivalencia", "Sección transversal angular", "Sección transversal angular espectral", "Sección transversal espectral", "Sección transversal total", "Tasa de dosis absorbida", "Tasa de exposición", "Tasa de fluencia de la energía, (densidad de flujo de energía)", "Tasa de fluencia de partículas, (densidad de flujo partical), Tasa de fluencia de neutrones (densidad de flujo de neutrones)", "Tasa de Kerma"], //Reacciones nucleares y radiaciones ionizantes
    ["Aceleración angular", "Aceleración, Aceleración de caída libre, Aceleración debido a la gravedad", "Ángulo (plano)", "Ángulo sólido", "Área", "Curvatura", "Longitud, Anchura, Altura, Espesor, Radio, Radio d…esianas, Diámetro, longitud del camino, Distancia", "Relación de volumen", "Tiempo", "Velocidad angular", "Velocidad, velocidad de fase, Velocidad de grupo", "Volumen", "Volumen por temperatura"], // Tiempo y espacio
    ["Unidades base calificadas en los niveles 1 y 2"], //Unidades base calificadas en los niveles 1 y 2
    ["Diversos", "Empaques a granel", "Empaques flexibles, tipo bolsa.", "Empaques rígidos, otros.", "Empaques rígidos, tipo bulbo, (esférico)", "Empaques rígidos, tipo caja, (prismático)", "Empaques rígidos, tipo tambor (cilíndrico)", "Otros empaques o empaques especiales", "Sin empaque (incluye a granel)", "Unidades de empaque"],
    ["Unidades de envío y transporte"], // Unidades de envío y transporte
    ["Unidades de tecnología de información"], // Unidades de tecnología de información
    ["Unidades de venta"], // Unidades de venta
    ["Unidades específicas de la industria (varias)"] // Unidades específicas de la industria (varias)
]   


//claves & descripcions
const data = [
    [
    [{clabe: "P41", des: "Década(logarítmica)(Una escala logarítmica es una escala de medida que utiliza el logaritmo de una cantidad física en lugar de la propia cantidad.)"}],
     [{clabe: "A60", des: "Erg por centímetro cúbico"}],
     [{clabe: "A50", des: "Dina segundo por centímetro cúbico"}],
     [{clabe: "P42", des: "Pascal por segundo cuadrado (Unidad del conjunto c… SI con exponente 2 y la unidad base segunda SI.)"}],
     [{clabe: "A52", des: "Dina segundo por centímetro a la quinta potencia"}, {clabe: "C66", des: "Segundos pascal por metro cúbico"},{clabe: "M32", des: "Segundos pascal por litro"}],
     [{clabe: "C67", des: "Segundos pascal por metro"}],
     [{clabe: "A51", des: "Dina segundo por centímetro"},{clabe: "C58", des: "Segundos newton por metro"},{clabe: "H36", des: "MegaOhm por kilómetro"}],
     [{clabe: "A64", des: "Erg por segundo centímetro cuadrado"},{clabe: "C32", des: "Miliwatt por metro cuadrado (Es equivalente a una milésima de vatio.)"},{clabe: "C76", des: "Picowatt por metro cuadrado (Es igual a la trillonésima parte de un vatio (10-12).)"},{clabe: "D85", des: "Microwatt por metro cuadrado (Es equivalente a una millonésima parte de un vatio.)"}],
     [{clabe: "C59", des: "Octava (Una unidad utilizada en la música para des…ir la relación de la frecuencia entre las notas.)"}],
     [{clabe: "H51", des: "Decibel per kilometro"},{clabe: "H52", des: "Decibel per metro"},{clabe: "P43", des: "Bel por metro (Una unidad Bel dividida por la unidad básica del sistema internacional (metros).)"}],
     [{clabe: "C69", des: "Phon (Unidad de volumen del sonido subjetivo. Un sonido tiene p phons de sonoridad si se parece al oyente a ser iguales en intensidad, con el sonido de un tono puro de frecuencia 1 kilohertz y de la fuerza p decibelios.)"}],
     [{clabe: "D9", des: "Dina por centímetro cuadrado"}],
     [{clabe: "D15", des:"Sone (Una unidad de volumen del sonido subjetivo. Un sone es la intensidad de un tono puro de la frecuencia y la fuerza de un kilohertz 40 decibelios.)"}]
    ],
    [
        [{clabe: "P41", des: "Década(logarítmica)(Una escala logarítmica es una escala de medida que utiliza el logaritmo de una cantidad física en lugar de la propia cantidad.)"}],
         [{clabe: "A60", des: "Erg por centímetro cúbico"}],
         [{clabe: "A50", des: "Dina segundo por centímetro cúbico"}],
         [{clabe: "P42", des: "Pascal por segundo cuadrado (Unidad del conjunto c… SI con exponente 2 y la unidad base segunda SI.)"}],
         [{clabe: "A52", des: "Dina segundo por centímetro a la quinta potencia"}, {clabe: "C66", des: "Segundos pascal por metro cúbico"},{clabe: "M32", des: "Segundos pascal por litro"}],
         [{clabe: "C67", des: "Segundos pascal por metro"}],
         [{clabe: "A51", des: "Dina segundo por centímetro"},{clabe: "C58", des: "Segundos newton por metro"},{clabe: "H36", des: "MegaOhm por kilómetro"}],
         [{clabe: "A64", des: "Erg por segundo centímetro cuadrado"},{clabe: "C32", des: "Miliwatt por metro cuadrado (Es equivalente a una milésima de vatio.)"},{clabe: "C76", des: "Picowatt por metro cuadrado (Es igual a la trillonésima parte de un vatio (10-12).)"},{clabe: "D85", des: "Microwatt por metro cuadrado (Es equivalente a una millonésima parte de un vatio.)"}],
         [{clabe: "C59", des: "Octava (Una unidad utilizada en la música para des…ir la relación de la frecuencia entre las notas.)"}],
         [{clabe: "H51", des: "Decibel per kilometro"},{clabe: "H52", des: "Decibel per metro"},{clabe: "P43", des: "Bel por metro (Una unidad Bel dividida por la unidad básica del sistema internacional (metros))"}],
         [{clabe: "C69", des: "Phon (Unidad de volumen del sonido subjetivo. Un sonido tiene p phons de sonoridad si se parece al oyente a ser iguales en intensidad, con el sonido de un tono puro de frecuencia 1 kilohertz y de la fuerza p decibelios.)"}],
         [{clabe: "D9", des: "Dina por centímetro cuadrado"}],
         [{clabe: "D15", des:"Sone (Una unidad de volumen del sonido subjetivo. Un sone es la intensidad de un tono puro de la frecuencia y la fuerza de un kilohertz 40 decibelios.)"}],
        ]
    
]

tipos.forEach(tipo => {
    const hola = {tipo};
    let h ={};
     subtipos.forEach(sub => {
        const subAux = [];
        
                    sub.forEach((deepSub,i) => {
                    //console.log();
                    subAux.push({deepSub});
                    h.subtipos = [subAux];
                    
                        data.forEach((data,i) => {
                            data.forEach((subData, j) => {
                                    subData.forEach(deepData => {
                                        //console.log(deepData);
                                    })
                            })
                })

        })
        
        //h.push(subAux)
        //console.log(h);
        
    })
  hola.subtypo = h;
  console.log(hola); 
})





/* data.forEach((data,i) => {
        data.forEach((subData, j) => {
                subData.forEach(deepData => {
                    console.log(deepData);
                })
        })
})
 */

