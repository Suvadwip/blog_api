const categoriesRouter= require("express").Router()
const controller= require('../controller/categories.controller')
categoriesRouter.post('/',controller.categoryCreate)
categoriesRouter.get('/',controller.categoryGet)
module.exports= categoriesRouter;