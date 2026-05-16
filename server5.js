//Inter conversion JSON to an object (in Node.js)      [JSON ek string type jki data hai]

//JSON ko ko object me convert kaise karna hai
//convert JSON string to object        [JSON ek data hai,JSON ek string type ki data hai]
const jsonString='{"name":"John","age":30,"city":"New York"}';//JSON data as a string pass hota hai
const jsonObject=JSON.parse(jsonString);//convert JSON string to object
console.log(jsonObject.name);
//output=John      [jo ki ek object hai]


//pura ka pura JSON data jo hota hai wo as a string pass hota hai[Agar ek server se dusre jagah agar wo(JSON Data) 
//jata hai to wo as a string pass hota hai] => or fir ham usko(JSON data ko) parse kar lete hai apne according
//ki hame object chahiye to uss hisab se hamne uss JSON(data) ko parse kar liya  object me(as here in jsonObject)
//or fir usse deal karte hai


//convert object to string  
const objectToConvert={    //object  [isko(iss object ko) convert karna hai string me]
    name:"Alice",
    age:25
};   //abb is object ko JSON me convert karna hai
const json=JSON.stringify(objectToConvert);//convert object to JSON string
console.log(json);
//output:{"name":"Alice","age":25}  [JSON banke aa jayega]   [JSON as a output milega-> or JSON ek string type ki data hai]

console.log(typeof json);

//Note:=> or JSON data ko ham easily server to server transfer kar sakte hai

//server:=>server ek tarah ka program hai[ek waiter ki tarah hai,jo client ki baat sunta hai,or client ko data
//  laakar deta hai,as per the need]

//Darabase:=>database ek tarah ka chef hota hai,jo backend me data rakha hua hota hai ya jo data prepare karta hai
//server ko kuchh bhi chahiye hota hai as related to data wo(server) chef(database) ke paas jata hai,but kuchh
//bhi present karna ho,calculate karna hai,plate lagana hai,wo(sari chize) directly server khud se bhikar sakta hai






