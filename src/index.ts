import express,{Application, urlencoded} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import ProductRoutes from "./Routes/product.route"
import AdminRoutes from "./Routes/admin.route"

dotenv.config()

const app:Application=express()
mongoose.connect(process.env.MONGODB_URL as string).then(()=>console.log("Connected to Mongo"))

// middlewares


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/product",ProductRoutes)
app.use("/admin",AdminRoutes)

app.get("/health",async(req,res)=>{
    res.status(200).send("ok working")
})

app.get('/info', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.get("/",async(req, res)=>{
    res.json({ status: 'OK' });
})

app.listen(parseInt(process.env.PORT as string),()=>console.log(`Connected to port ${process.env.PORT}`))
require('./eureka.client')

