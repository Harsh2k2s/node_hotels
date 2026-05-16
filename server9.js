//server banayenge => Express.js ki help se 
const express=require('express');
const app=express();
//ab iss db object ko import karenge iss server.js par & isko run karenge [db object database connection baithane ke liye banaye hai]
const db=require('./db1');//jaise hi db1.js ko file ko read kiya database connection establish ho gaya

const bodyParser = require('body-parser'); //[jo bhi data aa raha hai,hame nahi pata hai ki kis format me aa raha hai]
app.use(bodyParser.json());//to ye body-parser json data ko uthayega,usko object me parse(convert) karega,or hamme 
//uss sara object ko store kar lega req.body me or hamme bas directly usko use karna hai

//ham yaha person naam ke model ko export kar lenge [jo  models folder(./) ke andar hai person naam ke file(/) me]
const Person=require('./models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)


//POST method[This is an Express route handlers that handles a POST request to create & store a new person
//in your database]         (app.post => i will handle to incomming data(POST=>here is some data post it))
//jab bhi koi data iss endpoint(/person) par mil raha hai(hit kar raha hai),[issi endpoint par function hai]
app.post('/person',async(req,res)=>{//async=>returns a promise,allows await inside[async → gives permission,await → uses that permission to wait]
    try{//iss try block ke andar hamara successful chiz run karne wale hai [try ke andar data lene wale hai
    //  =>naya person banane wale hai,orr iss naye person ko save karne wale hai]
    //Assume the request body contains the person data
        const newPersonData=req.body;//req.body=>gives the inncomimg data[exact data sent by you from postman or frontend]
        //it simply stores the request data in a variable(newPersonData),to use the data(person) easily later
        const newPerson=new Person(newPersonData);//creates new document(person),using your Mongoose model(Person)
        //this creates a new person(newPerson) using the data you sent

        //save the new person to the database using await [or yaha database operation me laga rahe hai await]
        const savedPerson=await newPerson.save();//saves the data to mongoDB,await=>waits untill save completes
        console.log('saved person to database');//res(status)=201 =>successfil response
        res.status(201).json({savedPerson});//resources saved sucessfully,sends the saved data as json
    }//jaise hi ye database operation kuchh error throw karega to wo catck ke andar chal jaayega
    catch(error){//agar kuchh fail ho gaya=>to wo fail categorry me jaayega=>or fail category means catch =>catch kya karega error
        console.log('Error saving person:', error);//if something fails(DB issues etc.) returns(500)->error
        res.status(500).json({error:'Internal server error'});
    }//mongoose error throw karega(to wo error catch me aa jayega)
})//POST method      
//[when a client sends a post request to /person => then this function runs]
//  [ /person => it decides when this code should execute(Address of your API)]
//your server is running at => http://localhost:3000
//then this route becomes: => http://localhost:3000/person
//route=a url path+HTTP method that decides which code runs
//mongoDB jab bhi koi document apne collection me store karta hai,to wo automatically har document ko
//ek _unique id de deta hai

//abb jab ham compass par jaakar refresh karte hai => to hame ek hotels naam ka database mil gaya,uss hotels
//me ek person naam ka document mil gaya(or iss people ke andar data mil gaya)

//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
