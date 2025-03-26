const express = require('express')
const env = require('dotenv')
const clientsRoutes = require('./routes/clientRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const connectDB = require('./DB/connect')
const jwt = require("jsonwebtoken");


// const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const cors = require('cors')

env.config();
const app = express();
const PORT =   process.env.PORT || 6002 

app.use(cors());
// app.use(ClerkExpressRequireAuth())
app.use(express.json());


// root route 
app.get("/" , (req,res)=> {
    res.send("Hello, World!");
})

// to set Router 

app.use("/api/clients" , clientsRoutes )
app.use("/api/invoices",invoiceRoutes );


// login route

app.post("/api/login", (req,res) => {
    if(req.body.email === process.env.LOGIN_EMAIL && req.body.password === process.env.LOGIN_PASSWORD){
        const token = jwt.sign({ email: req.body.email }, process.env.SECRET, { expiresIn: "1h" });
        res.json({ success: true, token  , message: "Logged in successfully"});
    } else {
        res.status(401).json({success: false, message: "Invalid credentials"})
    }
})

















































const start =async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(PORT)
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
}
start();