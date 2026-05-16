//server banayenge => Express.js ki help se 
const express=require('express')
const app=express();
//ab iss db object ko import karenge iss server.js par & isko run karenge [db object database connection baithane ke liye banaye hai]
const db=require('./db1');//jaise hi db1.js ko file ko read kiya database connection establish ho gaya

const bodyParser = require('body-parser'); //[jo bhi data aa raha hai,hame nahi pata hai ki kis format me aa raha hai]
app.use(bodyParser.json());//to ye body-parser json data ko uthayega,usko object me parse(convert) karega,or hamme 
//uss sara object ko store kar lega req.body me or hamme bas directly usko use karna hai
//[body-parser install karna parega,to server ko band karke likho => npm install body-parser](& then server ko chalu kar do => nodemon server.js)

//body-parser kya karta hai,(jaise abhi ham json data bhej rahe hai) [isliye apne code me bodyParser.json()
//use kar rahe hai],lekin agar different format me bhejte to different body-parser function use kar rahe hote

//ham yaha person naam ke model ko export kar lenge [jo  models folder(./) ke andar hai person naam ke file(/) me]
const Person=require('./models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)
//ham aisa chiz chah rahe hai ki,hame bas information laakar de do [for this we use :-> get method]

//abb issi person naam ke model se hamlogsara connectivitiy(sare database me jitne bhi operation perform karenge,)
//issike through karenge


app.get('/',function(req,res){    //get function ke pass 2 parameters hai->pahle parameter('/) ki wo kon se end point par hamko ye show karega
    res.send('Welcome to my hotel...How i can help you?')//matlab koi bhi iss address '/' par jaayega 
})  //to wo respond karega   ['Welcome to my hotel...How i can help you']

//abb hamara kaam kya hai (next step)
//abb data send ultimately client(user) kar raha hai server ko [abb ultimately hamne body-parser establish kar liya
//database connection establish kar liya,person ka jo document hai wo dikhega kaisa=>jo uska schema hai,wo 
//hamne bana liya,uss schema se hamne model banaya,or uss model(person) ko export kar diya server file pe(express file pe)
//abb wahi model hamara responsible hai person Database se deal karne ke liye]

//to abb ham ek endpoint banate hai,jaha par client jo hai,wo data send karega[client ko pata hai iss 
// endpoint('/) par send karne se,iss API par send karne par => iss particular format of data ko ham save kar sakenge,
//to wo kya karega iss database me save kar dega => ]
//[client kya karega wo data server ko bhejega(node.js ko),or wo server kya karega usko database me jaake 
//store kar dega] => so,we need a method called POST[bcoz POST ek aisa method hai,post method pe hi hamlogo
//ko pata chalega ki ultimately Data save karna hai => ye data save karne ke liye request bheja ja raha hai]

//so hamne POST method banaya
app.post('/person',(req,res)=>{ //  ( /person )par hame koi bhi data bhejta hai,jo format hamne define kar rakha hai uss format me
    //to hamlog usko save kar lenge(uss data ko)
    //[abb ham maan rahe hai ki hame data mil raha hai iss route par,kaise mil raha hai?]
    const data=req.body; //or ham maan ke chal rahe hai => req.body me data mil raha hoga [jo data hamara aa raha hai,wo aake req.body me store hota hai]
    //data me Data mil raha hai,[or Data kaha par store hokar aa raha tha => jo data client
    //bhej raha hai,wo ultimately aa raha hai,or wo data aane se pahle usko body-parser process karta hai
    //or body-parser usko process karke store karta req.body ke andar ]
    //[abb hame person ka data mil gaya,or wo Data store  hai iss data ke andar]

    //abb hamara kaam kya hai => ki hame ek naya document banana hai jo person tarah ka hoga
    //[create a new Person document using the Mongoose Model] (ham ek person tarah ka data banate hai)
    const newPerson=new Person(data);//to ye hamara newPerson(naya Person)tarah ka data blank hai,abhi iske andar koi bhi data nahi hai
    //or ham jo ye newPerson(naya person) bana rahe hai wo kis tarah ka hoga
    //wo iss Person tarah ka hoga(jo person hamne yaha define kar rakha hai)
    //or abb is newPerson(naya person) ko hi save karenge
    newPerson.name=data.name;//abb wo newPerson(naya person) ke andar wo sara field inherit(aa) ho gaya
    //iss new Person() models se [iss person ke andar name tha,work tha,age,email,salary tha]to abb wo
    //sari chize is (data)newPerson ke andar bhi hoga [matlab jo newPerson hai(jo ham document bana rahe hai
    //uske andar wo sara field pre-filled hoga ,iss data me se,jo data hame mila,hamne automatically isme assign kar diya)]
    
    //abb hamara kaam kya hai,jo newPerson hai,usko database me save karna
    newPerson.save(error,savedPerson=>{//save() function jo hai,wo callback return karta hai[callback me kya=>error & person ka data]
        if(error){//agar wo error return karta hai
            console.log('Error on saving person data:',error);//or wo error display kar denge,iss message ke sath
            res.status(500).json({error: 'Internal server error'});//or as a respond send karenge,[matlab client ko kaise pata
            //chalega ki fail hua ki nahi hua],(req se kya milta hai => jo data client bhej raha hai,or response
            //me ham bhejte hai) [res.json() => hamlog json data bhejna chahte hai response me]
            //jab bhi koi data transfer hota hsi(chahe wo server se client ke bich me ho,client se server ke
            //bich me ho),server ek singnal send karta hai(usko status singnal kahte hai)
            //(500) => sever ke taraf se kuchh issue ho gaya isliye data send nahi kar paya server
        }
        else{//else => data save ho gaya (matlab error nahi aaya)
            console.log('data saved successfully');//hamlog isko save kar denge
            res.status(200).json(savedPperson);//& json me pass kar diya person [ye jo savedPerson data aaya]
            //status 200=> means success
        }
    })  
})//ye hamara complete post() method taiyar ho gaya,jiske through hamlog data ko save karenge
//abb actually me iss data ko send karke dekhte hai,ki response kya aa raha hai(postman par)
//  ( /person ) => par POST method bhejna(send) hai in postman




//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

//abb issi person naam ke model se sara connectivity(sare database me jitne bhi operation perform karenge,)
//issike through karenge

//[abb ham jo data bhejte hai postman me,wo data body ke andar bhejte hai,with the help of raw & hamlog
//generally json(string) data bhejte hai postman me body ke andar => iss data ko bhejte hai through POST method]

//Note:=> [iss data ko hamlog bhejte hai ham postman par through POST method]
//to mai yaha ek dusra url banaya(postman par,plus icon ko click karke)
//abb ham chah rahe hai,iss(person data) data ko save karna(jo data postman par bhej rahe hai,body ke andar)

//abb ham chah rahe hai yaha save karna person [to url ke last me likh denge  /person]
//ham chah rahe hai iss url par koi banda data send kare,to uska data save ho jana chahiye
//mai isko(data) kar raha hu send,=> to isko aa gaya error [kyuonki hamne /person naam ka koi POST method 
//define hi nahi kar rakha hai,abtak]


//when we do Beautify on postman=> it arranges the data in proper way