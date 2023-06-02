const express = require("express");
const router= new express.Router();
const Products = require("../models/productSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get productsdata api
router.get("/getproducts",async(req,res)=>{
    try {
        const productsdata = await Products.find();
       // console.log("console the data"+productsdata);
       res.status(201).json(productsdata);
    } catch (error) {
        console.log("error: " + error.message);
    }
})

// get individual data

router.get("/getProductsone/:id",async(req,res)=>{
    try{
        const {id} =req.params;
        
        const individualdata = await Products.findOne({id:id});

        res.status(201).json(individualdata);
    }catch(error){
        res.status(400).json(individualdata);
        console.log("error: " + error.message);
    }
});

//register data

router.post("/register",async(req,res)=>{
   // console.log(req.body);

   const {fname,email,mobile,password,cpassword} =req.body;
   
   if(!fname || !email || !mobile || !password || !cpassword){
    res.status(422).json({error:"fill the all data"});
    console.log("no data available");
   };

   try{
     const preuser = await USER.findOne({email:email});
     
     if(preuser){
        res.status(422).json({error:"this user is already present "});
     }else if( password !== cpassword){
        res.status(422).json({error:"Password and cpassword not matching "});
     }else{
        const finalUser = new USER({
            fname,email,mobile,password,cpassword
        });



        const storedata = await finalUser.save();
        console.log(storedata);

        res.status(201).json(storedata);
     }

   }catch(error){

   }


});

//login user api
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);



            if (!isMatch) {
                res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
                const token = await userlogin.generatAuthtoken();
                console.log(token);

                res.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 2589000),
                    httpOnly: true
                });
                res.status(201).json(userlogin);
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

// addind data to cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try{
     const {id} =req.params;
     const cart =await Products.findOne({id:id});
     console.log(cart+ " cart value") ;

     const userContact = await USER.findOne({_id:req.userID});
     console.log(userContact);

     if(userContact){
        const cartData = await userContact.addcartdata(cart);
        await userContact.save();
        console.log(cartData);
        res.status(201).json(userContact);
     }else{
        res.status(401).json({error:"invalid User"});
     }

    }catch(error){
        res.status(401).json({error:"invalid User"});
    }
});


//get cart details

router.get("/cartdetails",authenticate, async(req,res)=>{
    try{
       const buyuser = await USER.findOne({_id:req.userID});
       res.status(201).json(buyuser);
    }catch(error){
       console.log("error" + error);
    }
})




module.exports = router;