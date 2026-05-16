//next hamara import topic hai,files ko import karna [file ko import kaise karenge]
//[here file name is notes.js]
console.log('notes page loaded');
//notes.js me hamne diff. type ki functionality likhi hai usko import karna hai

//ye(this function addNumber) do number le raha a & b
const addNumber=function(a,b){//(addNumber naam ka ek function banaya[define kar diya])
    return a+b;//& ye return kar raha hai(a+b)[addNumber do number ko add kar raha hai]
}
//function ek keyword hai JavaScript me[Iska use hota hai function banane ke liye.(a, b) → parameters (inputs jo function lega)]

var age=24;//yaha maine age variable declare kiya[abb mujhe ye age server3.js me chhahiye]
module.exports={
    age,  //to iss age variable ko export karna parega,tabhi ham isko use kar sakte hai dusre jagah(dusre file me)
    addNumber//addNumber do number ko add kar raha hai[yaha addNumber ko export kar diya taki usko kahi aur(kisi dusre file me) use kar sake]
}
//ye function aur ye age ham export kar rahe hai

//object banakar=>module.export  karoge aur pass kar doge uss object ko to pass(export) ho jaayega


//[server3.js=>ek single file hai(jab bhi server me koi file run hota hai,to 
// sirf ek single file run hota hai),uske related ham diff. diff. supportive 
// file banate hai,jaise database ka alag file(notes.js) banate hai=>lekin wo 
// sare file server3.js se link rahte hai]
//means run hamesha ek hi file hoga(server.js) ,aur sare file usse link rahenge