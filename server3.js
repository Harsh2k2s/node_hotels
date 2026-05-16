//[server3.js=>ek single file hai(jab bhi server me koi file run hota hai,to 
//sirf ek single file run hota hai)]

//notes.js me hamne diff. type ki functionality likhi hai usko import karna hai
const notes=require('./notes.js');//hame require hai notes ki(uss notes file ko import karana hai[jaise os & fs module(library) ko import karte the])
//    ./  =>jo issi current folder(NODEJS) ke andar hai

//Aur agar abb server3.js ko run karwayenge[by  node server3.js]=> to print 
//hokar aayega  [notes page loaded]=>jo ki notes.js file me likha hai
//lekin server3.js me aisa kuchh to likha hi nahi hai[kyonki uss file(notes.js)  
//ko notes ke andar import kar liya hai yaha(server3.js me)]

console.log('server file is availiable');

//var age=24; //yaha(notes.js me) maine age variable declare kiya[abb mujhe ye
//age server3.js me chhahiye]

var age=notes.age; //to pahle age(jo notes.js me hai) ko import kar liye age me
console.log(age);//to yaha print ho jaayega age=24 [jo ki hame declare kiye hai 
//notes.js me, & yaha usko import kar liye age me(server3.js ke andar)]

//addNumber function me do argument pass kar diya (a,b) ke jagah
var result=notes.addNumber(age+18,10);//addNumber function(jo hai notes.js) me usko yaha import kar diya resulte me(server3.js ke andar)
console.log('result is now: '+result);


//means run hamesha ek hi file hoga(server3.js) ,aur sare file usse link rahenge


//module.exports → data/function ko export karta hai
//require() → import karta hai
//Ek hi file run hoti hai (main file=>server.js)
//Baaki sab helper files hoti hain



//server3.js =  Brain (main file)
//notes.js =  Tools (functions, data)

//Node.js me sirf ek hi main file run hoti hai