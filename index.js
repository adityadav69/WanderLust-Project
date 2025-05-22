const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const Listing=require('./models/listing.js');
const app=express();
const methodOverride = require('method-override')

const MONGO_URL="mongodb://localhost:27017/wanderlust";
const port=8080;

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

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

//index Route

app.get('/listings',async(req,res)=>{
    const allListings= await Listing.find({});
    res.render('listings/index.ejs',{allListings});
})

app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs');
})

app.get('/listings/:id/edit',async(req,res)=>{
    const {id}=req.params;
    let listings=await Listing.findById(id);
    res.render('listings/edit.ejs',{listings});
})

app.put("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listings});
    res.redirect(`/listings`);
})

app.delete('/listings/:id',async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id)
    .then((result)=>{
        res.redirect('/listings');
    })
    .catch((err)=>{
        res.send("Error while deleting list")
    })
})

app.post('/listings',(req,res)=>{
    let l1=new Listing(req.body.listings);
    l1.save()
    .then((result)=>{
        res.redirect('/listings');
    })
    .catch((err)=>{
        res.send("Error while inserting data");
        console.log(err);
        
    })
})

app.get('/listings/:id',async(req,res)=>{
    const {id}=req.params;
    let listings=await Listing.findById(id);
    res.render('listings/show.ejs',{listings})
})

// app.get('/listing/test',async(req,res)=>{
//     const list=new Listing({
//         title:"MY Villa",
//         description:"This is the description of villa",
//         price:80000,
//         location:"Rishikesh Uttarakhand",
//         country:"India"
//     })
//     await list.save()
//     .then((result)=>{
//         console.log("List is saved")
//         res.send("Successfully inserted")
//     })
//     .catch((err)=>{
//         console.log("List save failed")
//         res.send("List is not saved");
//     })

// })

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})