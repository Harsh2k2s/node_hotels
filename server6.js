//How to create a server        [server is like a waiter(jisko order(request) mila,or wo response karega)]

//server banayenge => Express.js ki help se   [ecpress.js ko install karenge => npm install express]
const express=require('express') //hame require hai express ki[so import kar liye express.js ko express me jo server5.js file me hai]

//express ko import kar liya, express ka jo blueprint hai,usko hamne store kar liya app me[ki hamare pass naksha 
// hai->ki kaise-kaise ham apne server ko banayenge]   =>(wo sara ka sara data store hai app(naksha/blueprint) me)
const app=express();//express function jo hai,ek tarike se usko hamlog app me store kar lete hai[app jo ham banane jaa rahe hai]
//ye ek tarah ka Naksha hai:[app jo ham banane jaa rahe hai]

//ki abb ham app ki helpp se sara ka sara kaam karenge    [app me express lka blueprint store hai->app ke pass
// sari wo functionality hai,jisse ek server ban sakta hai]

//hamne sever to bana diya, but wo kuchh samjhega->Nahi, bcoz hamne to menu card to banya hi nahi[menu card me 
//jo likha hoga wahi wo bat karega(menu card me bologe menu page show karne ke liye bolega,menu page show kar 
//dega,menu ke iss page par ye jo item hai ye laakar do,wo laakar de dega) ]=>usse(server se) communicate karne 
//ke liye menu card to chahiye hoga naa     //to pahle menu card de sakta hai, app.get() method

//ham aisa chiz chah rahe hai ki,hame bas information laakar de do [for this we use :-> get method]
app.get('/',function(req,res){    //get function ke pass 2 parameters hai->pahle parameter('/) ki wo kon se end point par hamko ye show karega
    res.send('Welcome to my hotel...How i can help you?')//matlab koi bhi iss address '/' par jaayega 
})  //to wo respond karega   ['Welcome to my hotel...How i can help you']
//means waitor(server) ko / bolega to wo respond dega ['Welcome to my hotel...How i can help you']
//res=>matlab usko(server ko) response kya send karna hai

//server ke pass menu list me ek hi chiz hai '/' (server ko sirf ye pata hai iss address par bas ye
//  '/' add kiya hai) to server ko bas ye pata hai '/'  (matlab server ko  / puchhoge to ye greeting message de dega)

//abb ham browser per likhte hai(matlab waiter se puchhte hai) ->localhost:3000/      [/ matlab waiter se puchh rahe hai]
//output:Welcome to my hotel...How i can help you?    ['/' => matlab waiter se puchh rahe hai]
//localhost:3000  [localhost=>Ghar ka naam , 3000=>means building number(Adress)   ]

//GET => get method bas order laakar de sakta hai,matlab ki wo sirf response de saktahai[koi database
//se interaction nahi,kuch modify nahi kar sakta],ham bas chahte hai ki information laakar de de

//maine ek dusra menu banaya   [get function ke pass 2 parameters hote hai ek adress & ek function]
app.get('/chicken',(req,res)=>{//ek arrow function banaya jisme parametrs hai(req,res)
 res.send('sure sir,i would love to serve chicken')//matlab koi bhi iss address '/chicken' par jaayega
})   //to wo(server) respond karega :=> [sure sir,i would love to serve chicken]
//server me jab bhi koi changes hota hai,to server ko fir se restart karna hota hai[to iss baar baar
//server ka restart hone se bachne ke liye ham use karte hai :=> nodemon]

//server ko band karte hai :=? ctr+c
//to enter karenge :-> nodemon server.js   => to jo bhi changes hoga iss file me to uss according change karte jaayega
//agar hamne enter kiya =>  localhost:3000/chicken   ->output= [sure sir,i would love to serve chicken]
//server ko bas pata hai  =>  [/chicken] =>kyonki hamne iske(server) menu me bas yahi dala hai

//maine ek dusra menu banaya
app.get('/idli',(req,res)=>{//server ko bas pata hai => [ /idli ]      [means server par ye data(menu card list) bhejte hai]
    var customized_idli={//ek (object banaya)
        name:'rava idli',                     //[means server par ye data(list of items) bhejte hai]
        size:'10 cm diameter',     //ki ye sari chize ham serve karenge=>server bas wahi chize samajhta hai
        is_sambhar:'true',  //if you want sambar->then return true  [true->means i want]
        is_chutney:'false'  //do you want chutney->false [false->means i don't want]
    } //get hai isliye server data laakar de raha hai
    res.send(customized_idli)//matlab koi bhi iss address '/idli' par jaayega
})//to wo(server) respond karega :=> {"name":"rava idli","size":"10 cm diameter","is_sambhar":"true","is_chutney":"false"}
//Agar is Adress localhost:3000 par '/idli' ye daalenge to response aayega=>bcoz server ko bas ye '/idli' pata hai
//[welcome to south india and love to serve Idli]

//[app.listen() -> kya kar raha hai, check kar raha hai ki port:3000 par server active hai]
//app.listen(3000);// [3000->port(adress) hai]->iska(server ka) maine room number decide kiya hai
//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
//to jaise hi server run karega ye message show hoga terminal par=>[listening on port 3000]
//matlab hame pata chal gaya server hamara live hai

//server reun karte hai through=> node server.js    or     nodemon server.js

//server band(dead) karte hai through=> ctr+c   =>server hamara dead ho gaya hai[this site can't be reached] print hokar aayega screen par aayega,kyoni server(waiter) mar gaya(dead)

//localhost:300  => iss adress par hame menu card laakar deta hai

//server kya hota hai=>waiter, jo hame chize laakar deta hai[hamari baate sunta hai,or hame chize laakar deta hai]

//server ko menu card dena parta hai[means server ko list of items dena parta hai->or server bas
//wahi chize samajhta hai,jo uss menu card me likha hai]

//server rah hai iss ghar me:localhost  par   iss room no. par:3000
