//server.js: is used for creating the web connection[server and handling requests]
//iske andar jo bhi code likha hai wo javascript ke andar likha hoga
//[iske(server.js) andar ab ham sara kaam karenge=>matlab iske andar file ko run karenge,server ko start karenge,request ko handle karenge,aur response bhejenge]


//console.log('server file is running');

//callback function: [is a function that is passed as an argument to another function and is executed after the completion of that function]
//function add(a,b){//ek function banaya add(ye a & b ko lega & return kar dega a+b)
  //  return a+b;
//}
var add=function(a,b){//add naam ka var banaya,& iske andar ek function declare kar diya
    return a+b;//ye function a & b ko legaas parameter & return kar dega (a+b)
}
//var add=(a,b)=>{return a+b;}   add naam ka ek function hai,iske andar paramer hai a& b,aur ye function a+b return karega
//var add=(a,b)=>a+b;
var result=add(2,8);//yaha result naam ka ek variable banaya,& call karo add function ko,aur usme 2 aur 3 pass karo,aur jo bhi result aayega usko result variable me store kar do
console.log(result);



//nodemon kya karega:[nodemon jab bhi dekhega ki server.js file me koi change 
//hua hai to wo automatically server ko restart kar dega,taaki hame baar baar 
// manually server ko restart na karna pade]
//to do this  Run in terminal: npm install -g nodemon
//nodemon kya karega  sever ke andar jo changes hua hai uss ko accept karega,
// save karega & file ko run kar dega manually







//HTTP response status codes indicate whether a specific HTTP request has been successfully completed. 

//Informational responses (100 – 199)
//Successful responses (200 – 299)
//Redirection messages (300 – 399)
//Client error responses (400 – 499)
//Server error responses (500 – 599)