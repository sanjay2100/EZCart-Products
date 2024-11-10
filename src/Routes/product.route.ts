import express, { Request, Router } from "express"
import { GetAllMyProducts, createProduct } from "../Controllers/product.router"
import path from "path"
import { CreateCategory, GetAllCategory } from "../Controllers/category.router"
const multer=require("multer")

const app:Router=express.Router()

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

app.post("/create",upload.array('files',10),createProduct)
app.post("/category/create",CreateCategory)
app.post("/get_all_products",GetAllMyProducts)
app.get("/categories",GetAllCategory)


export default app