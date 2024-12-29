import express, { Request, Router } from "express"
import { EditStocks, GetAllItems, GetAllMyProducts, GetItemById, GetNewArivals, GetTopSellingProducts, createProduct, getProductById } from "../Controllers/product.router"
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

app.post("/create",upload.array('images',10),createProduct)
app.post("/category/create",upload.single('file'),CreateCategory)
app.post("/get_all_products",GetAllMyProducts)
app.get("/get_product_by_category",getProductById)
app.post("/get_product",GetItemById)
app.get("/categories",GetAllCategory)
app.post("/get_all_products_list",GetAllItems)
app.post("/deduct_stock",EditStocks )
app.get("/get_max_selling_products",GetTopSellingProducts)

app.get("/get_new_arrival",GetNewArivals)


export default app