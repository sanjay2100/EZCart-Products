import express, { Router } from "express"
import { CreateCategory } from "../Controllers/category.router"
import path from "path"

const multer=require("multer")


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req:Request, file:any, cb:any) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 20000000 } 
  })

const app:Router=express.Router()


app.post("/category/create",upload.single('file'),CreateCategory)



export default app