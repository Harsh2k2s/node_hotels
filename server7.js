 //ye mongodb connection baithane ke liye -> [ye node.js ka file hai]
//How to create a server        [server is like a waiter(jisko order(request) mila,or wo response karega)]
//server banayenge => Express.js ki help se   [ecpress.js ko install karenge => npm install express]
const express=require('express') //hame require hai express ki[so import kar liye express.js ko express me jo server5.js file me hai]
//express ko import kar liya, express ka jo blueprint hai,usko hamne store kar liya app me[ki hamare pass naksha 
// hai->ki kaise-kaise ham apne server ko banayenge]   =>(wo sara ka sara data store hai app(naksha/blueprint) me)
const app=express();//express function jo hai,ek tarike se usko hamlog app me store kar lete hai[app jo ham banane jaa rahe hai]
//ye ek tarah ka Naksha hai:[app jo ham banane jaa rahe hai] [node.js ka server bana liye express.js ki help se]

//ab iss db object ko import karenge iss server.js par & isko run karenge [db object database connection baithane ke liye banaye hai]
const db=require('./db1');//jaise hi db1.js ko file ko read kiya database connection establish ho gaya

//ham aisa chiz chah rahe hai ki,hame bas information laakar de do [for this we use :-> get method]
app.get('/',function(req,res){    //get function ke pass 2 parameters hai->pahle parameter('/) ki wo kon se end point par hamko ye show karega
    res.send('Welcome to my hotel...How i can help you?')//matlab koi bhi iss address '/' par jaayega 
})  //to wo respond karega   ['Welcome to my hotel...How i can help you']
//means waitor(server) ko / bolega to wo respond dega ['Welcome to my hotel...How i can help you']
//res=>matlab usko(server ko) response kya send karna hai

//[app.listen() -> kya kar raha hai, check kar raha hai ki port:3000 par server active hai]
//app.listen(3000);// [3000->port(adress) hai]->iska(server ka) maine room number decide kiya hai
//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
//to jaise hi server run karega ye message show hoga terminal par=>[listening on port 3000]
//matlab hame pata chal gaya server hamara live hai

//to abb ham jo database connection establish kiya tha( in db1.js file me),usko hamne sever7.js me export kar liya
//ab iss db object ko import karenge iss server.js par & isko run karenge [db object database connection baithane ke liye banaye hai]
//const db=require('./db1');//jo issi folder(node.js=> /) ke andar db1 file me hai
//abb hamara next target hai ki => database se connection establish hua ki nahi hua

//server reun karte hai through=> node server.js    or     nodemon server.js
//to message print hoga :=> [db wala file jo export kiya hai,wo bhi run karega ]
//listening on port 3000
//Connected to MongoDB server
//MongoDB connected

//jaise hi hamne iss file(server7.js) ko run kiya,db object hamara create hua,or wo kis chiz ke liye responsible
//hai, database connection banane ke liye[to jaise hi hamara database connection bana => to waise event listener
//ne sun liya connected,to jaise usne connect suna,usne message print kar diya=> connected to MongoDB server]
//matlab hamara mongoDB ke sath connection establish ho gaya

//abb ham kya karte hai => jo database connection establish hai,jo database server hai,ussi server ko down kar
//deta hu [jaise hi server down ho jaayega,to connection jo bridge hai wo tut jaayega]
//to yaha par jo db hai(database object hai),usko disconnected sunai dega => to wo listen karega,to kuchh na kuchh message print karega i.e. disconnected
//printed here: => MongoDB disconnected

