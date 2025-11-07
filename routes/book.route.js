import express from 'express'
import { addBook } from '../controller/book.controller.js'
import { upload } from '../middleware/upload.middleware.js';

const bookRoutes = express.Router()

bookRoutes.post('/addBook',upload.single("image"),addBook)

export default bookRoutes;