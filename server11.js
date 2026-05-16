const express=require('express');
const app=express();
//app.use(express.json());////without this req.body will be undefined
//ab iss db object ko import karenge iss server.js par & isko run karenge [db object database connection baithane ke liye banaye hai]
const db=require('./db1');//jaise hi db1.js ko file ko read kiya database connection establish ho gaya

const bodyParser = require('body-parser'); //[jo bhi data aa raha hai,hame nahi pata hai ki kis format me aa raha hai]
app.use(bodyParser.json());//to ye body-parser json data ko uthayega,usko object me parse(convert) karega,or hamme 
//uss sara object ko store kar lega req.body me or hamme bas directly usko use karna hai

//ham yaha person naam ke model ko export kar lenge [jo  models folder(./) ke andar hai person naam ke file(/) me]
const Person=require('./models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)
const menuItem=require('./models/menu');//ham menu card(menuItem) ko import kar lete hai(jo menu file me hai,models folder ke andar)
// & abb isko use kar sakte hai [abb iss menuItem par hamlog operation perform kar sakte hai]=>abb aap API 
//bana sakte ho GET ka bhi or POST ka bhi [abb apko '/menu' or '/person' par hit karna hai data or aapko database me save karna hai]

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

//ek aisa request banao ki jisme ki hame person ka sara data mil jaaye [to ek get method banate hai]
//GET method to get the person [get => isliye ki iss baar hame data chahiye (bhejna nahi hai)]
app.get('/person',async(req,res)=>{
    try{//abb hamme data nikalna hai,Database se
        const data=await Person.find();//kya ye database se data fetch karne me time lag sakta hai to=>await
        //abb ye data mil gaya (abb iss data ko kuchh nahi karna hai-> copy karo & save karo)
        console.log('data fetched');//res(status)=201 =>successfil response
        res.status(201).json({data});
    }
    catch(err){
        console.log('Error saving person:', err);//if something fails(DB issues etc.) returns(500)->error
        res.status(500).json({error:'Internal server error'});
    }
})

//POST method to add a menu Item
app.post('/menu',async(req,res)=>{
    try{
        const data=req.body;//the same data sent by you from postman(or frontend)
        const newMenue=new menuItem(data);//ham ek naya document(record) bana rahe menu ka menuItem ka help se(menuItem=the schema we made for menucard)
        const response=await newMenue.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
//GET method to get the Menu Items
app.get('/menu',async(req,res)=>{//isbar hamlog sirf data de rahe hai [to post nahi hoga,sirf get hoga]
    try{
        const data=await menuItem.find();//hamko menucard(menuItem) ka data chahiye,jo ham postman par send karte hai through get method
        console.log('data.fetched');//data fetch kiya,or data send kar diya
        res.status(200).json(data);//hamko response me menuItem ka data chahiye
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})







//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
