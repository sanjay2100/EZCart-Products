import express, { Router } from "express"
import { CreateCategory } from "../Controllers/category.router"


const app:Router=express.Router()


app.post("/category/create",CreateCategory)



export default app