//db.js hamne seperate file kyon banaya [kyonki ham isme hamlog sirf database connection ka code 
//likhenge aur isse alag se manage karenge, jisse hamare main application code clean rahega aur agar
//  hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes 
// karenge, bina baaki code ko touch kiye.]

//db.js file=>responsible hai connectivity baithane ke liye Node.js ke sath(between mongoDB server
// & our node.js application ka server) and exporting the connection for use in other parts of the application.

//hame mongoose require hai to ham isse import karenge, jisse ham apne node.js application ko mongoDB ke sath connect kar sake.
const mongoose=require('mongoose');//hame mongoose library import karni hai jisse ham apne node.js application ko mongoDB ke sath connect kar sake.
//mongoose ko import karke usko store kar liye mongoose variable me, jisse ham is variable ke through mongoose ke functions aur features ka use kar sakte hai.
//[mongoose apne library me install kar liye hai, in terminal using-> npm install mongoose, jisse ham apne project me mongoose library ka use kar sake.]
//to ham isse require karke apne code me use kar sakte hai. Ye hame MongoDB ke sath interact karne ke liye tools aur methods provide karta hai.
//[or package.json me bhi mongoose dependency add ho jayegi jab ham npm install mongoose command run karenge, jisse ham future me easily manage kar sake ki hamne kaunse packages use kiye hai apne project me.]

//Define the mongoDB connection URL
const mongoURL='mongodb://localhost:27017/hotels';//ye hamara mongoDB connection URL hai, jisme ham specify karte hai ki hamara mongoDB server kaha chal raha hai (localhost) aur hamari database ka naam kya hai (mydatabase). Ye URL hamare node.js application ko batata hai ki wo kis database se connect hona hai.
//means ham hotels naam ke database ke andar sara data store karenge[hotels naam ke database se connect hona chahte hai jo hamare local mongoDB server me chal raha hai. Agar ye database exist nahi karta hai to mongoDB automatically isse create kar dega jab ham is URL se connect karenge.


//to sabse pahle ham terminal me mongoDB server ko start karenge=> using mongosh, jisse ham apne 
// node.js application ko mongoDB ke sath connect kar sake. MongoDB server start karne ke liye ham 
// terminal me mongosh command run karenge, jisse mongoDB server start ho jayega aur ham apne node.js application se isse connect kar sakte hai.

//ham port(27017->mongoDB ka default port) me define kar rahe hai hotels naam ka database chahiye
//jaise hi connection establish hoga                     [kiske sath? mongoDB server ke sath], agar hotels naam ka database exist nahi karta hai to mongoDB automatically isse create kar dega, aur ham apne node.js application se is database me data store kar sakte hai].
// to hamare pass hotels naam ka database create ho jaayega mongoDB compass me[mongoDB server me, aur ham apne node.js application se is database me data store kar sakte hai.]

//abb ham connection establish karte hai [mongoDB server ke sath using mongoose.connect() method, jisme ham apne mongoURL ko pass karenge, aur ek callback function bhi pass karenge jo connection successful hone par ya error hone par execute hoga.]
//set up the mongoDB connection =>mongoose.connect():=>[establish a connection to the mongoDB database using the URL] mongoose.connect() method ka use karke ham apne node.js application ko mongoDB server ke sath connect karenge, jisme ham apne mongoURL ko pass karenge, aur ek callback function bhi pass karenge jo connection successful hone par ya error hone par execute hoga. Ye method asynchronous hai, matlab ye background me run hota hai aur jab connection establish ho jata hai to callback function execute hota hai. Agar connection successful hota hai to ham console me ek message print karenge ki connection successful hai, aur agar error hota hai to ham console me error message print karenge.
mongoose.connect(mongoURL,{//isme hamlog pass karte hai URL,& fir pass karte hai parameters[kuch parameters hai,jo hamko pass karne hi hai, jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake. Ye parameters mongoose ke naye version me required hai, jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake.]
    useNewUrlParser:true,//ye option useNewUrlParser:true hamare connection string ko parse karne ke liye use hota hai, jisse hamare connection string me special characters (jaise @, :, /, etc.) ko properly handle kiya ja sake. Ye option mongoose ke naye version me default hai, lekin ham isse explicitly set kar rahe hai to ensure compatibility with older versions of mongoose.
    useUnifiedTopology:true
})//yaha tak kar dene se kya connection establish ho jayega mongoDB server ke sath>Nahi ,mongoose.connect() kar dene se [aur ham apne node.js application se is database me data store kar sakte hai. Agar connection successful hota hai to ham console me ek message print karenge ki connection successful hai, aur agar error hota hai to ham console me error message print karenge.]
//mongoose kya karta hai => mongoose ek default connection object create karta hai,define,mantain karta hai
//wo kya karta hai basically, wo object responsible hai always,kisi bhi database connection me perform
//karne ke liye,ya uske sath interaction karne ke liye

//Get the default connection
//mongoose maintain a default connection object representing the MongoDB connection, [jisse ham apne application ke kisi bhi part me access kar sakte hai. Ye default connection object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.]
const db=mongoose.connection;//ye hamare mongoose connection object ko db variable me store kar raha hai, jisse ham is variable ke through apne database connection ke events ko listen kar sakte hai, jaise ki connection successful hone par ya error hone par. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.
//mongoose is db object ko maintain karta hai,so that we always apne Database server ke sath interact(connect ho paye)
//or ham is db object ke through apne[node.js aur mongoDB ke bich jo bridge hai,usko connect kar sake] database connection ke events ko handle kar sakte hai, jaise ki connection successful hone par ya error hone par. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.

//Define event listeners for database connection
db.on('connected',()=>{//mai ek listener define kar raha hu 'connected' event ke liye, jisme jab bhi database connection successful hota hai to ye listener execute hota hai, aur ham console me ek message print karte hai ki connection successful hai. Ye listener hamare database connection ke status ko monitor karne me help karta hai, jisse ham apne application ke performance aur reliability ko improve kar sakte hai.
    console.log('Connected to MongoDB server');//jab bhi connection hua,to print kar do => Connected to MongoDB server
})//to jab bhi hamara database connection establish hoga Node.js ke sath,to wo automatically 'connected' event trigger karega, aur hamara listener execute hoga, jisme ham console me message print karenge ki connection successful hai. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.
//connected mongoDB ko pata hai[kyonki jaise hi connection establish hoga,event listener ko pata chal jaayega ki haa connected ho chuka hai]
//jaise hi connected hoga to wo connected listen ho jata hai,[aur hamara listener execute ho jata hai, jisme ham console me message print karte hai ki connection successful hai. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.]

//ye sare(connected,error,disconnected) event listener keywords hai->jisemongoDB samajhte hai-> hamare database connection ke status ko monitor karne me help karte hai, jisse ham apne application ke performance aur reliability ko improve kar sakte hai. Agar hamare database connection me koi problem hoti hai to ham isse easily identify kar sakte hai using these event listeners, aur uske accordingly action le sakte hai to fix the issue. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.
db.on('error',(err)=>{//mai ek listener define kar raha hu 'connected' event ke liye, jisme jab bhi database connection successful hota hai to ye listener execute hota hai, aur ham console me ek message print karte hai ki connection successful hai. Ye listener hamare database connection ke status ko monitor karne me help karta hai, jisse ham apne application ke performance aur reliability ko improve kar sakte hai.
    console.log('MongoDB connection error:',err);//jab bhi connection hua,to print kar do => Connected to MongoDB server
})
db.on('disconnected',()=>{//mai ek listener define kar raha hu 'connected' event ke liye, jisme jab bhi database connection successful hota hai to ye listener execute hota hai, aur ham console me ek message print karte hai ki connection successful hai. Ye listener hamare database connection ke status ko monitor karne me help karta hai, jisse ham apne application ke performance aur reliability ko improve kar sakte hai.
    console.log('MongoDB disConnected');//jab bhi connection hua,to print kar do => Connected to MongoDB server
})
//db object kya karta hai=> ye mongoose ko maintain karta hai,connection establish karne ke liye,aur
//db sabkuchh sun raha hota hai,(usse(db ko) error,connected,disconnected ka matlaab pata hai)
//aur jab bhi koi event perform ho raha hota hai, to wo us event ko sun raha hota hai,aur uske accordingly hamko message print karwa deta hai,jaise ki connection successful hone par ya error hone par. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.


//Export the database connection  [for use it at another places(part of the application)]
module.exports=db;//ye hamare database connection object ko export kar raha hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye module.exports statement hamare database connection object ko export karta hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai.
//or abb ye ye db yaha par mongoDB connection ko represent kar raha hai, [jisse ham apne application ke kisi bhi part me import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye module.exports statement hamare database connection object ko export karta hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai.]

//or abb isko(db) ko import karenge kahi par(server.js me),& isse run karenge waha=> jisse ham apne database connection ko use kar sake, aur apne application ke kisi bhi part me is connection ko import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye module.exports statement hamare database connection object ko export karta hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai.]


//event listener=>event listener ka matlab hai ki database me jab bhi koi event perform ho raha hai
//[jaise ki connection successful hone par ya error hone par, to ham is event ko listen kar sakte hai using db.on() method, jisme ham event ka naam specify karenge (jaise 'connected' ya 'error'), aur ek callback function pass karenge jo is event ke occur hone par execute hoga. Is callback function me ham console me ek message print karenge ki connection successful hai ya error hua hai, jisse ham apne database connection ke status ko monitor kar sakte hai.]
//to koi na koi baith kar event listener  usko sun raha hota hai,usko hamlog kahte hai event Listener
//jaise ki koi database connect hua,to usko pata chal gaya ki database connect ho gaya(event listener ko pata chal gaya ki database connect ho gaya),to uske baad wo event listener execute ho jayega,aur hamko console me message print kar dega ki connection successful hai. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.
//abb hamari marzi ham uss event listener ko sunke,kuchh hamlog prints kara de,ya user ko message de de
//ki aapka database ka connection establish ho chuka hai


//mongoose ek ODM (Object Data Modeling) library hai jo MongoDB ke sath kaam karne ke liye use hoti
//hai. Ye hame schema define karne, data validation, aur query building jaise features provide karti hai.




//The db.js file is responsible for connecting to the MongoDB database and exporting the connection 
// for use in other parts of the application.

//The db.js file you have created is responsible for establishing a connection between your Node.js
//appication and your MongoDB database using Mongoose.

//[It(db.js) imports the Mongoose library, defines the connection URI, and attempts to connect to 
// the database.













//package.json => kya karta hai,jitne bhi dependencies ham use karne wale hai apne project me unko 
// list karta hai, jisse ham future me easily manage kar sake ki hamne kaunse packages use kiye hai apne 
// project me. Ye file automatically create ho jati hai jab ham npm init command run karte hai 
// terminal me, aur jab ham npm install command run karte hai to ye file update ho jati hai with 
// the new dependencies. Is file me ham apne project ke baare me information bhi de sakte hai jaise name, version, description, author, etc.









