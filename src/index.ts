import express,{Application, urlencoded} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import ProductRoutes from "./Routes/product.route"
import AdminRoutes from "./Routes/admin.route"
import  path  from "path"
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

app.use('/image', express.static(path.join(__dirname, 'uploads')));

// Endpoint to get the image by file name
app.get('/image/:fileName', (req, res) => {
    console.log("hit image");
    
    const fileName = req.params.fileName;
    console.log("fileName: " + fileName);
    
    const filePath = path.join(__dirname, '..', 'uploads', fileName);
    console.log("filepath: " + filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.listen(parseInt(process.env.PORT as string),()=>console.log(`Connected to port ${process.env.PORT}`))
require('./eureka.client')

