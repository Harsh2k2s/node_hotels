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
const menuItem=require('./../models/person');//hame require hai person ko to isko yaha import kar lenge(person naam ke model ko)
//ye Person hamara model tha jisko hamne server me export kar rakha tha abb yaha export karenge iss Person(model) ko,for further use
//  [../models  =>means models folder iss folder ke 2 folder pichhe hai]


//POST route to add a menu   [yaha menu hai=> uska jo post method hai ,usko likha =>personRoute me likha]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta hai)
//POST method 
//POST method to add a menu Item
router.post('/',async(req,res)=>{
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


//GET method to get the menu [get => isliye ki iss baar hame data chahiye (bhejna nahi hai)]

//GET route to add a menu   [yaha person hai=> uska jo GET method hai ,usko likha =>personRoute me likha]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta hai)
//GET method to get the Menu Items
router.get('/',async(req,res)=>{//isbar hamlog sirf data de rahe hai [to post nahi hoga,sirf get hoga]
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



//YE hamara workType ho gaya [parametrized API call]
//get method isliye [bcoz hamlogo ko data chahiye=> (chahe wo waiter ka ho,ya chef ka)]
//abb yah app na hokar ho gaya hamara router(jo endpoints ko handle karta)





//abb ham router ko export kar dete hai(for further use at any place)
//comment added
module.exports=router;

//ek bar ham dekhte hai personRoutes ke through kaise kaam karta hai

//[router.post=>'/person' (defined hai)]
//[router.get=>'/person' (defined hai)]
//[router.get=>'/person/:workType' (defined hai)]
