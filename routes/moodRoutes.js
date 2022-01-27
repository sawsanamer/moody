const express = require("express");
const router=express.Router();

const moodController= require("../controllers/moodController.js")


router.get("/loading", moodController.moodLoading)
router.get('/:requestedMood', moodController.moodDetails)


module.exports=router;