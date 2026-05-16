//ye sara data ham ek person ka store karne wale hai(name,email,age,address etc),to iska blueprint banana parega
//or blueprint hamlog kiska banayenge => with the help of mongoose
//[bcoz mongoose hi hai ek aisa bridge,jo database aur node.js ke bich me connection establish karne wala hai]
//to iske liye hamlog ek folder structure maintain karte hai (models) => & iss models ke andar ham person ka
//model banane wale hai
const mongoose=require('mongoose');//hame mongoose chahiye,to isko import kar lenge

//abb hamlog schema banane wale hai [schema:=> models or schema(in terms of mongoose)]
//to hamne person.js naam ka file bana liya(models ke andar),or usme ham kya define karne wale hai,schema 
//define karne wale hai (ki hamara person ka data hai,jo document hai,wo ultimately dikhega kaise)

//Define the person schema
const personSchema=new mongoose.Schema({//or abb iske andar hamlog pass karenge parameters
    //person schema ke andar ek ek karke field define karenge => or uss field ka type define karenge & lots of parameters define kar sakte hai
    name:{//sabse pahle hamlogo ko name chahiye,(ham isko(name ko) object bana rahe hai) & iska type likhenge
        type: String,
        required: true,//is it required =>[mongoose hame bahut sara parameters define karne ka option deta hai ]
    },//name hame chahiye(name ek tarah ka field hai,jo ham isme store karne wale hai),uska type hai string
    //required: true, [hamne ek extra parameters pass kiya => ki hame name chahiye hi chahiye]
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'], //hamne yaha define kar diya enum [enum me kya define kar diya => arr[] i.e. ya to wo chef hoga ya fir waiter hoga ya fir manager hoga]
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true   //ki jab bhi koi email enter karega,(email unique hona chahie),unique nahi hoga email to wo aapko error throw kar dega[matlab jab db me save kar rahe hote hai,to automatically mongoose iss chiz ko handle kar leta hai,database level par ki ye unique hai ki nahi]
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }//ye hamara person schema taiyar ho gaya
})//abb jo database me iss schema ko follow karte hue,jab kisi person ka record save ho raha hoga,to iss
//work me agar yahi teeno values['chef', 'waiter', 'manager'] present honge,to wo save karega
//let's suppose jo person enter kar raha hoga usne work me apna jo value filled kar diya owner,to isko wo
//accept nahi karega [kyon hamne enum me define kar rakha hai ko wo yaho 3 value['chef','waiter','manager']
//me se koi ek value hona chahiye,or ye mendatory hai, maine required me true mark kiya hai,->ki work hona 
// hi hona chahiye,otherwise hamlog isko accept nahi karenge]

//to isse fayada kya hota hai => ki jab user database me data entery kar raha hota hai to mongoose,apne end
//par hi sabkuchh handle kar leta hai[means ye chize required hai ki nahi,chize unique hai ki nahi,salary me
//koi alphabetical value to nahi hai->wo numeric value hi daal raha hai] => to ye sari chize apne end par hi
//hi handle kar leta hai [i.e. benifit of mongoose]  (mongoose ke sath database ko deal karna bahut asan ho jata hai)

//ye hamara person schema taiyar ho gaya

//to abb hamne schema to bana diya, kya ye schema bana dene se hamara kam ho gaya => Nahi, (hamlog iss 
// schema se model banate hai => or ussi model ko use karke ham jitne bhi database operation hai,usko perform
//karte hai => chahe wo create karna ho,usko read karna ho person ke sara data ko,ya usme update karna ho,
//ya hamlog ko delete karna ho)

//create person model
const person=mongoose.model('person',personSchema);//hamne person naam ka ek model bana diya,or uss person ko export kar rahe hai as a name of => person
module.exports=person; //person ko export ka rahe hai,taki dusre jagah isko use kar sake
//abb iss person ko import kar lenge sever par ,& run kar denge server ko
