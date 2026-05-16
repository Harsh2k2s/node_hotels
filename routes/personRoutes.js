//Express Router manage karta hai(help karta hai endpoints ko manage karne ke liye)
//jaise bahut sare endpoints( /person  /menu) likhte hai ham->server.js me =>(te ek bahut bekar tarika hai
// (itne sare endpoints ko server.js me likhna har ek kaam ke liye) =>isko manage karne ke liye we use 
// Express Router =>iske liye ham ek seperate folder banate hai routes=>or isme ek file banate hai
//personRoute.js


//Express Router ek tarike ka traffic cop hai[usko pata hai ki,server par jo traffic aa raha hai(server par
//jo endpoind par('/') log hit kar rahe hai)=>usko kaha bhejna hai =>ye Express Router ko pata hai]

//isko(Express Router) use kaise karte hai => to iske liye sabse pahle express chahiye
const express=require('express');//express ki require hai,to express ko import kar lenge(& isko ek variable express me store kar lenge for further use)
const router=express.Router();//or express Router jo function hai usko store kar liya router naam ke variable me
//personRoutes me hamne ek router naam ka variable define kiya => jo function hai express ka hi[express.Router();
//jo(router) manage karta hai routes ko(yani different different endpoints ko)]

//issme(iss router me) bas person ke related endpoints hai ('/person')

//ham yaha person naam ke model ko export kar lenge [jo  models folder(./) ke andar hai person naam ke file(/) me]
const Person=require('./../models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)
//ye Person hamara model tha jisko hamne server me export kar rakha tha abb yaha export karenge iss Person(model) ko,for further use
//  [../models  =>means models folder iss folder ke 2 folder pichhe hai]


//POST route to add a person   [yaha person hai=> uska jo post method hai ,usko likha =>personRoute me likha]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta)
router.post('/',async(req,res)=>{//async=>returns a promise,allows await inside[async → gives permission,await → uses that permission to wait]
    try{//iss try block ke andar hamara successful chiz run karne wale hai [try ke andar data lene wale hai
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

//GET method to get the person [get => isliye ki iss baar hame data chahiye (bhejna nahi hai)]

//GET route to add a person   [yaha person hai=> uska jo GET method hai ,usko likha =>personRoute me likha]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta hai)
router.get('/',async(req,res)=>{
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

//YE hamara workType ho gaya [parametrized API call]
//get method isliye [bcoz hamlogo ko data chahiye=> (chahe wo waiter ka ho,ya chef ka)]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta)
router.get('/:workType',async(req,res)=>{
    try{
        //abb ye data kaise laakar denge, sabse pahle hamlogo ko workType fetch karna hoga
        const workType=req.params.workType //ye ek tarike ka parameter hai,isliye =>params & iss varible ka naam kya hai=>workType
    //matlab hamne workType me fetch kar liye hai(jo client/user bhej raha hai=>kon se URL par bhej raha hai)
    //yaha hamne url me parameter daal diya(:workType),to jaise hi parameter change hote jaayega,to url
    //bhi change hote jaayega  [& jo bhi parameter(variable) hai uska naam diya => workType]

    //abb hamlog yaha validation laga sakte hai kya(matlab chhota sa check)
    //[matlab agar kisi ne workType me pass kar diya dog, to dog to workType nahi hota hai=>to kuchh bhi nahi pass kar sakte hai iss parameter(workType) me]
        if(workType=='chef' || workType=='manager' || workType=='waiter')//workType yahi teeno me se hona chahiye,iske alawa kuchh nahi chaiye tabhi hamlog aage badhenge,nahi to nahi badhenge
        {//abb ham db operation perform karenge =>ho sakta hai db operation karne me time lag jjaye to async laga denge function me
            const response=await Person.find({work: workType})  //hamlog person chah rahe hai
            //yaha parameter pass kar rahe hai work [hamne yaha kya field define kar rakha hai Person me=>work & work me pass kar rahe hai workType]
            //agar ye(work me workType) isko mil gaya,to ye response return kar dega
            console.log('response fetched');
            res.status(200).json(response);//response de dega
        }
        else{//agar workType inn teeno ke alawa hoga,to ham simply respond kar denge :error
             res.status(404).json({error: 'Invalid workType'});//error send kardenge=> 'Invalid workType'
             //not found
        }
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }

})

//Update(change) method: => [or update ke liye ham PUT method use karte hai]

//update method thora sa typical lagta hai bcoz usme do criteria(GET wala bhi criteria hai,POST wala bhi 
// criteria hai) => [get wala criteria hai ki hamlogo ko pahle wo document find karna parega(wo bhi 
// unique _id ke through => ki kon sa usme unique chize hai)]=>(sare ke sare documents me hamara unique kya
//hai _id => wo _id se ham uss document ko find karenge or fir uss _id me update karenge =>jo data client 
//bhej raha hoga hamlogo ko(through postman))

//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta)
router.put('/:id',async(req,res)=>{  //   /:id =>variable parameter(id) => [aap isko(id) kuchh bhi naam de sakte hai]
//client aapko unique _id bhejega na url me,jo _id kya represent kar raha hoga ki ye hamara uss document ka
//particular _id hai, usko ham iss variable (/:id) ke through le rahe hai => means ye (/:id) jo mongodb _id provide karwa raha hai usko le raha hai is variable (/:id) me
    try{//abb hamlog iske andar sara kaam karenge
        const personId=req.params.id;//Extract the id from the URL parameter [client jo _id bhejega=>postman se]
        //[hamlog id(uss document ke _id) ko bhejte hai =>parameters(params) ke through from postman]
        //id to mil gaya person ka [personId]
        //abb hamlog chate hai data bhi mile(person ka)
        const updatedPersonData=req.body();//update data for the person [jo data update karna rahta hai=>
        // usko ham bhejte hai body ke through]
        const updatedPerson=await Person.findByIdAndUpdate(personId,updatedPersonData,{//update hone ke baad jo 
        // naya document aayega usko ham as a response(updatedPerson) send karenge
   //abb hamlog yaha parameters pass kar sakte hai[p] 
            new: true,//Return the updated document [jaise kis tarah se hame save hone par as a response 
            //person ka data mil jata hai], ussi tarah se update hone ke baad=> data milega hamlogo ko response me uss person ka(document ka)
            runValidators: true,//Run mongoose validation person model me jo validation pass kiye hai,usko ye check kar lega
        });
        //abb hamare pass mongodb me already predefined function hota hai => findByIdAndUpdate()
        //findByIdAndUpdate() =[pahle hamlog id ke through find karege(ki kon sa record update karna hai),
        //& then update karenge(data pass karenge => ki kya update karna hai(kya value add karenge)]
        if(!updatedPerson)  //updatedPerson =>response(on updation)
        {
            res.status(404).json({error: 'Person not found'});// [ho sakta hai ki wo banda id bhejraha hai,
            //wo id hi dusra hai(means id mismatch ho jaayega)] =>ho sakta hai iss personId se koi document present 
            //hi naa ho=>iss case me wo kuchh bhi return nahi kar paayega[pahle wo objectId(personId) se find karega ki wo kon sa document hai]
        }  //[404 => not found]
        console.log("data updated"); //(aapko success me naya person ka data mil jaayega(new document))
        res.status(200).json(response);//json data bhejega resonse me  [success ho gaya => update ho gaya]
    }
    catch(err)//dusra case kya ho sakta hai ki fail ho gaya(update nahi hua) =>fail hua to wo catch 
    {//block me chal jaayega (or catch block me aapko sara error mil jaayega => or uske according response bhi mil jaayega)
        console.log('err'),
        res.status(500).json({error: 'Internal Server Error'});
    }
})//update method [using PUT method]
//id="69f116a542d43a869b4238e2" =>hamlog is id ki data ko change karna chate hai (jo get met5hod me hai =>
// to yaha object_id pass kar diya as a parameter in url(/69f116a542d43a869b4238e2)  postman par
//& data bhi bhejna parega ki actually me kya kya update karna chah rahe hai[postman par=>in body]





//abb ham router ko export kar dete hai(for further use at any place)
module.exports=router;

//ek bar ham dekhte hai personRoutes ke through kaise kaam karta hai

//[router.post=>'/person' (defined hai)]
//[router.get=>'/person' (defined hai)]
//[router.get=>'/person/:workType' (defined hai)]
