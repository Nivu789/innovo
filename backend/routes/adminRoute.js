const express = require('express')
const adminRoute = express.Router()
const adminFunctions = require('../controllers/adminController')
const adminMiddleWare = require('../middlewares/adminAuth')
const UiUpload = require('../middlewares/multer')


adminRoute.post('/admin-login',adminFunctions.adminLogin)

adminRoute.get('/get-contacts',adminFunctions.getContacts)

adminRoute.get('/auth',adminMiddleWare.adminAuth)

adminRoute.post('/get-ui-components',adminFunctions.getUiComponents)

adminRoute.post('/edit-ui', UiUpload.upload.single('image'),adminFunctions.uploadUiImage,adminFunctions.editUiComponent);

adminRoute.post('/get-ui-section-components',adminFunctions.getUiSections)


module.exports = adminRoute
