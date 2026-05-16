//db.js file me [db.js hamne seperate file kyon banaya [kyonki ham isme hamlog sirf database connection ka code likhenge]
//[db.js file hai wo responsible hai,database connection baithane ke liye node.js ke sath],(aur ham is file me apne database connection se related saare code ko likhenge, jisse ham apne application ke kisi bhi part me is connection ko import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye modular approach hamare code ko organized aur maintainable banata hai, jisse ham apne application ke development aur maintenance process ko efficient bana sakte hai.]

const mongoose=require('mongoose');//hame mongoose library import karni hai jisse ham apne node.js application ko mongoDB ke sath connect kar sake.
//Define the mongoDB connection URL  [mongoDB connection ke liye URL likhne wale hai]
const mongoURL='mongodb://localhost:27017/hotels';//ye hamara mongoDB connection URL hai, jisme ham specify karte hai ki hamara mongoDB server kaha chal raha hai (localhost) aur hamari database ka naam kya hai (hotels). Ye URL hamare node.js application ko batata hai ki wo kis database se connect hona hai.
//means ham hotels naam ke database ke andar sara data store karenge  [hamare db ka naam hai => hotels]
//Ye URL hamare node.js application ko batata hai ki wo kis database(mongoDB) se connect hona hai.

//Connect to the mongoDB database using mongoose[abb ham connection establish karte hai](mongoDB ke sath using mongoose with this node.js]
//set up the mongoDB connection =>mongoose.connect():=>[establish a connection to the mongoDB database using the URL] mongoose.connect() method ka use karke ham apne node.js application ko mongoDB server ke sath connect karenge, jisme ham apne mongoURL ko pass karenge, aur ek callback function bhi pass karenge jo connection successful hone par ya error hone par execute hoga. Ye method asynchronous hai, matlab ye background me run hota hai aur jab connection establish ho jata hai to callback function execute hota hai. Agar connection successful hota hai to ham console me ek message print karenge ki connection successful hai, aur agar error hota hai to ham console me error message print karenge.
mongoose.connect(mongoURL)//isme hamlog pass karte hai URL,& fir pass karte hai parameters[kuch parameters hai,jo hamko pass karne hi hai, jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake. Ye parameters mongoose ke naye version me required hai, jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake.]
     //[mongoose.connect() => kya karta hai,establish karta hai connection ko] mongoDB server ke sath, aur ham isme kuch options bhi pass karte hai jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake. Ye options mongoose ke naye version me required hai, jisse hamare connection me koi problem na aaye, aur hamare connection ko properly establish kiya ja sake.]
.then(()=>console.log("MongoDB connected"))
.catch(err => console.log(err));
//yaha tak kar dene se kya connection establish ho jayega mongoDB server ke sath>Nahi ,mongoose.connect() kar dene se [aur ham apne node.js application se is database me data store kar sakte hai. Agar connection successful hota hai to ham console me ek message print karenge ki connection successful hai, aur agar error hota hai to ham console me error message print karenge.]
//mongoose kya karta hai => mongoose ek default connection object create karta hai,define,mantain karta hai
//wo kya karta hai basically, wo object responsible hai always,kisi bhi database connection me perform
//karne ke liye,ya uske sath interaction karne ke liye [connection establish kar rahe hai iss url ke sath,aur mongoose ek default connection object create karta hai,define,mantain karta hai,jo hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.]
//[db object kya karta hai => ye mongoose khud maintain karta hai,connection establish karne ke liye,or db sabkuchh sun raha hota hai,jo event listener usko batata hai]

//Get the default connection  [hamne ek db object maintain kar liya]
//mongoose maintain a default connection object representing the MongoDB connection, [jisse ham apne application ke kisi bhi part me access kar sakte hai. Ye default connection object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.]
const db=mongoose.connection;//ye hamare mongoose connection object ko db variable me store kar raha hai, jisse ham is variable ke through apne database connection ke events ko listen kar sakte hai, jaise ki connection successful hone par ya error hone par. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.
//mongoose is db object ko maintain karta hai,so that we always apne Database server ke sath interact(connect ho paye)
//or ham is db object ke through apne[node.js aur mongoDB ke bich jo bridge hai,usko connect kar sake] database connection ke events ko handle kar sakte hai, jaise ki connection successful hone par ya error hone par. Ye object hamare database connection ke state ko represent karta hai, aur ham iske through apne database connection ke events ko handle kar sakte hai.

//Define event listeners for database connection [event listener=> database me jab bhi koi event perform ho raha hai,to koi na koi event litener uss event ko sun raha hota hai],(aur jab bhi wo event perform hota hai,to wo event listener execute ho jata hai,aur ham usme apne code ko likh sakte hai,jaise ki connection successful hone par ya error hone par. Ye event listeners hamare database connection ke status ko monitor karne me help karte hai, jisse ham apne application ke performance aur reliability ko improve kar sakte hai. Agar hamare database connection me koi problem hoti hai to ham isse easily identify kar sakte hai using these event listeners, aur uske accordingly action le sakte hai to fix the issue. Is tarah se ham apne database connection ke status ko monitor kar sakte hai using event listeners.]
//jaise ki koi database connect hua to usko pata chal gaya ki connect ho gaya
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

//hamne db connection file me ye sari chize establish(likh diya) kar diya,to kya hamara database(mongoaDB) 
//connect ho gaya -> Nahi   (ultimately isko export karkr run karana parega server file par)

//Export the database connection  [for use it at another places(part of the application)]
//ham iss db object ko export karenge
module.exports=db;//ye hamare database connection object ko export kar raha hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye module.exports statement hamare database connection object ko export karta hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai.
//or abb ye ye db yaha par mongoDB connection ko represent kar raha hai, [jisse ham apne application ke kisi bhi part me import karke use kar sakte hai.

//or abb iss(db) ko import karenge(server.js me),& isse run karenge waha=> jisse ham apne database connection ko use kar sake, aur apne application ke kisi bhi part me is connection ko import karke use kar sakte hai. Isse ham apne database connection ko easily manage kar sakte hai, aur agar hume future me database connection me koi changes karne ho to ham sirf db.js file me hi changes karenge, bina baaki code ko touch kiye. Ye module.exports statement hamare database connection object ko export karta hai, jisse ham is connection ko apne application ke kisi bhi part me import karke use kar sakte hai.]

//ab isko(server7.js) ko run karenge => [nodemon server7.js] => to hamara server active ho jayega port => localhost:3000
//kaise pata chalega active ho gaya,=> to postman par jaate hai,uspar likhta hu localhost:3000  [enter(send)] (localhost:3000)=> node.js ka server hai
//hame data mil gaya:=> ['Welcome to my hotel...How i can help you?'] => jo ki node.js me likha hai
//or yahi data ham get.request par send kar rahe hai isko(in node.js)

//abb hamara next target hai ki => database se connection establish hua ki nahi hua







//db.js file => mongoDB server or node.js server ko connect karta hai (iss file me)

// [ http://localhost:3000 ] => is your Node.js server

//[Node.js server port: 3000] => is your backend application built using Express.js

//This is your database(mongoDB) server: localhost:27017   [which runs on port:27017]

//postman => customer
//Node.js => waiter
//MongoDB => kitchen

// [ mongodb://localhost:27017/mydatabase ] => refers to your mongoDB server

//mongodb => protocol
//localhost => running on your own computer
//27017 => default mongodb port
//mydatabase => database name inside mongodb