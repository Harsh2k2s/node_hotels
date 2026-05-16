
const notes=require('./notes.js');//hame require hai notes ki(uss notes file ko import karana hai[jaise os & fs module(library) ko import karte the])
//    ./  =>jo issi current folder(NODEJS) ke andar hai

//ek famous sa library hai => lodash [lodash hamare development ko bahut easy bana dete hai]
//to pahle ham lodash ko install karenge [terminal me]  [lodash ko import karte hai(_) underscore se]
var _=require('lodash');//hame require hai lodash library ka to use import kar lenge
//var prince=require('lodash');//hame require hai lodash library ka to use import kar lenge


//lodash aisa kya kaam kar deta hai,jo hame jarurat par gaya
var data=["person","person",1,2,1,2,'name','age','2'];//ye array hai
//abb koi bolega isme(array me) jo unique hai wo nikalo   [to ye array tarah ka data hai,to aap usme se unique
// nikal sakte ho]  => but ye unique nikalne me bahut sare calculation karne parenge
//abb hame ye calculation nahi karna,bcoz jab ham development karte hai server side par to there are a lot of 
//complexity is there(jo ham har chiz ke liye code nahi kar sakte)

//lodash:=>ek aisa lobrary(tool) hai,jo aapko data se deal karne me bahut benificial hai [lodash me bahut sare 
//inbuilt function hai jo,jisko aap use kar sakte ho,data ko deal karne ke liye]

//hamko unique data chahiye uss arr me se[to iss lodash ke andar ek uniq() naam ka ek function hai jo hame unique data laa ke de dega]
var filter=_.uniq(data); //is unique data ko ham filter naam ke variable me store kar liye
console.log(filter);

//var filter=prince.uniq(data);   //ye bhi kar sakte hai kuchh bhi naam rakh sakte hai

console.log(_.isString('prince'));//kya ye data jo hai wo string hai->agar string hai to true return kar do
//yes ye data('prince') ek string hai=> to true return kar dega

console.log(_.isString(3));//No ye data(3) ek string nahi hai,int hai=> to false return kar dega
console.log(_.isString(false));//No ye data(false) ek string nahi hai,boolean hai=> to false return kar dega
console.log(_.isString(true));//No ye data(true) ek string nahi hai,boolean hai=> to false return kar dega
//isString()=>iss function kaam hai ki ye data agar string hai to true return kar do,nahi hai to false return kar do