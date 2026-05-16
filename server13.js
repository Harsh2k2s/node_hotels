const express=require('express');
const app=express();

const db=require('./db1');//jaise hi db1.js ko file ko read kiya database connection establish ho gaya

const bodyParser = require('body-parser'); //[jo bhi data aa raha hai,hame nahi pata hai ki kis format me aa raha hai]
app.use(bodyParser.json());//to ye body-parser json data ko uthayega,usko object me parse(convert) karega,or hamme 

//ham yaha person naam ke model ko export kar lenge [jo  models folder(./) ke andar hai person naam ke file(/) me]
const Person=require('./models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)
const menuItem=require('./models/menu');//ham menu card(menuItem) ko import kar lete hai(jo menu file me hai,models folder ke andar)

//jab bhi koi data iss endpoint(/person) par mil raha hai(hit kar raha hai),[issi endpoint par function hai]
app.post('/person',async(req,res)=>{//async=>returns a promise,allows await inside[async → gives permission,await → uses that permission to wait]
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

//parametrized API calls (API ke andar dusra API) [Instead of asking “give me data”, you ask “give me this specific data”.]
 //get method isliye [bcoz hamlogo ko data chahiye=> (chahe wo waiter ka ho,ya chef ka)]
app.get('/person/:workType',async(req,res)=>{
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

})  //aage database operation perform hoga na [jaise db operation me search kar rahe honge ki wo sare person
//  ka record laakar do jiska workTpe :waiter hai]    

//parametrized API calls
//iss url('/person/:workType') par koi hit karega to hamlog data isko laakar denge       

// [ :workType =>isliye ki work me kuchh bhi ho sakta hai(variable) => (workType=chef,waiter,manager)]        

//abb ye jo router export kiye hai(personRoute.js) me
//isko yaha import kar lete hai server13.js me
const personRoutes=require('./routes/personRoutes');//hame server file me router chahiye to import kar lenge
//ye router jo define kiye hai wo hai=> routes folder ke andar(personRoutes file me)
//iss router ko import kar liye hai,& isko store kar liye hai(personRoutes variable me use karne ke liye)
app.use('/person',personRoutes);//abb ham iss router ko is use chahte hai (app me)
//yaha server me endpoint par parson common kar denge [or router me person ke har method me endponts se person hata denge]
//abb log endpoint(/person) par hit karega to =>ye personRoutes par jaayega =>fir wo dekhega ki get method 
//hai ya post method hai(in personRoutes)

//for menu(menuItems)
const menuItemRoutes=require('./routes/menuItemRoutes');//menu cart ko import kar lenge(jiska naam hai menuItemRoutes)
app.use('/menu',menuItemRoutes);//abb ham iss router ko is use chahte hai (app me)

//personRoutes me hamne ek router naam ka variable define kiya => jo function hai express ka hi[express.Router();
//jo(router) manage karta hai routes ko(yani different different endpoints ko)]

//issme(iss router me) bas person ke related endpoints hai ('/person')



//ki ye jo server banega wo iss room no. pae aapko milega
app.listen(3000,()=>{
    console.log('listening on port 3000')
})
