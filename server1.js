//[iske(server1.js) andar ab ham sara kaam karenge=>matlab iske andar file ko run karenge,
//fs module   &     os module
//[jab bhi hame koi package use karna hota hai,to uss package ko apne file me import karte hai]

//mujhe use karna hai fs ko,pahle fs ko declare karte hai
var fs=require('fs'); //require('fs')=>means usko requirement hai fs library ka
var os=require('os');//require hai os library ka
//or ye dono(fs & os already hamare system me installed hai=>jab ham node.js install kiye the ussi time ye dono bhi install ho gaya system me)

//abb ham 'os' library(module) ko use karte hai thora
var user=os.userInfo();//agar mai iss function[userInfo()] ko use karu
console.log(user);//to isne mere or system ke baare me kuchh detail de diya
//let's say mujhe username print karwana hoga
console.log(user.username);//to username de dega=>Harsh kumar jha

//ki user jiske uppar currently ye jo banda kaam kar raha hai,ki uska username kya hai,kon sa shell use kar raha,kon sa directory use kar raha hai
//os.userInfo();  =>os ek library(package) hai,hamne usko usko apne system me 
// import kar liya os ke naam se [abb iss os ibrary ke bahut saare inbuilt fun
//  bane pare hai->e.g. os.userInfo()]
// os.userInfo() kya karega=>

//Abb ham chahte hai iss username ko greeting message bheja jaye
//[to greeting message ke liye ek file chahiye hoga=>jisme ham usko greet 
// message bhejenge kuchh na kuchh =>or file kon banayega 'fs']
//'fs' module=>It create a file & write the message inside
fs.appendFile('greeting.txt','Hi '+ user.username+'!\n',()=>{//yaha par ek inline callback() function bana diya in form of arrow function[()=>{...}]
    console.log('file is created'); //& function ko declare kar diya [ki->file is created]
});//appendFile()->ek function hota hai
//fs.appendFile('path','data'+callback) =>path->matlab kon sa file me aap greeting ka message dena chahte hai
//data=>matlab kya data dena chahte ho [message hona chahiye "Hi"] [greeting.txt=>file hona chahiye]
//greeting.txt file me data add karta rahega
//abb ye file yaha create ho gaya=>greeting.txt  [or yaha likha aa gaya ]

//greeting.txt file me har bar data(Hi username) add karte rahega
//ye username kaha se aayega =>os ne hame username nikal ke diya[using userInfo() function]


//appendFile() ->add karta rahega    (HiHiHi)   [repeat hote rahta hai]
//writeFile()  ->file ko overwrite karega(sirf ek bar likhega) =>(Hi Harsh kumar jha)

//console.log(os);//ye karne par pata chal jaayega os ke pass kon kon sa functionality hai[means os kon kon sa kaam kar sakta hai]
//console.log(fs);//ye karne par pata chal jaayega fs module(library) ke pass kon kon sa functionality hai[means fs kon kon sa kaam kar sakta hai]