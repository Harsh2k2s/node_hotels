//menu ka schema bana liya [menu card]
const mongoose=require('mongoose');//ham import kar liye mongoose ko[bcoz mongoose ki help se hi ham schema banate hai]
//hamlog iss schema ka naam dete hai menuItemSchema
const menuItemSchema=new mongoose.Schema({
    name:{//menu kaa naam kya hoga
        type: String,   //[ham menu card ka data store kar rahe hai]
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],  //means taste ka type kya kya hoga
        required: true,
    },
    is_drink:{//kya yeh pine ke layak hai (ye menu)
        type: Boolean,
        default: false, //maine yaha type define kiya false [false means => agar koi client data nahi bhejega to uss drink ki value false ho jaayegi,agar kuchh data(true) bheja hai to true ho jaayega]
    },
    ingredients:{ //ingredients ek tarah ka array hai
        type: [String], //iska type string hoga,bcoz hamlog ingredients me arr of strings store kar rahe hai ["chicken wings", "spices", "sauce"]
        default: [],   //& default hai empty [agar kisi ne kuchh (ingredients) nahi bheja => to ham ye empty maan ke chal rahe hai]
    },
    num_sales:{
        type: Number,
        default: 0, //pahli pahli bar jab koi menu me record enter kar raha hai[to mai agar koi naya dish add kiya
        //to jab mai iss naye dish ka data enter karta hu menu ke andar,to uska no. of sale to 0 hoga]
        //[pahli bar jab koi dish enter hoga,to entry ke time uska no. of sales 0 hoga]
    }
})

//abb isko export kar dete hai [taki dusre jagah use kar sake]
const menuItem=mongoose.model('menuItem',menuItemSchema);//this creates a model named menuItem,using a
module.exports=menuItem;//this exports the model                 //previously defined schema(menuItemSchema)