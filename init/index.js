const mongoose=require('mongoose')
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const MONGO_URL="mongodb://localhost:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("DB Connected Successfully");
})
.catch((err)=>{
    console.log("DB Connection Failed");
})

async function initDb(){
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    .then((result)=>{
        console.log(`Data initialized succssfully`)
    })
    .catch((err)=>{
        console.log(`Data initialized failed ${err}`);
    })
}

initDb();