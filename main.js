const myUsers=require('./data.js');
console.log("Users loaded from data.js:");
myUsers.forEach(user => console.log("-" +user));