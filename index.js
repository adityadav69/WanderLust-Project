const express=require('express');
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const app=express();

const MONGO_URL="mongodb://localhost:27017/wanderlust";
const port=8080;

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



app.get('/',(req,res)=>{
    res.send("Root working..");
})

app.get('/listing/test',async(req,res)=>{
    const list=new Listing({
        title:"MY Villa",
        description:"This is the description of villa",
        price:80000,
        location:"Rishikesh Uttarakhand",
        country:"India"
    })
    await list.save()
    .then((result)=>{
        console.log("List is saved")
        res.send("Successfully inserted")
    })
    .catch((err)=>{
        console.log("List save failed")
        res.send("List is not saved");
    })

})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})