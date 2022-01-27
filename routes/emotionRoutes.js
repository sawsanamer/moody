const express = require("express");
const router=express.Router();
const emotionController= require('../controllers/emotionController.js')

router.get('/detect',emotionController.detectEmotion )
router.get("/loading", emotionController.loadingEmotion)
router.get("/camera", emotionController.openCamera)
router.get("/undetected", emotionController.emotionUndetected)

module.exports=router;