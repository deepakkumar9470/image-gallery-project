const express = require("express");
const router =  express.Router();
const Images =  require("../models/imageDetails")
const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/src/images/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
// @ api/upload-image
// POST

router.post("/upload-image", upload.single("myfile"), async (req, res) => {
    const imageName = req.file.filename;
    if (!imageName) {
      res.status(204).json('Please upload file')
     }
    try {
      const image = await Images.create({ image: imageName });
      res.json({ status: "ok" ,image});
    } catch (error) {
      res.json({ status: error });
    }
  });
  
 // @ api/get-image
// GET 
  router.get("/get-image", async (req, res) => {
    try {
         const img =  await Images.find({}).sort({createdAt:-1})
          res.status(200).json({img})
    } catch (error) {
      res.json({ status: error });
    }
  });
  
// @ api/delete/1234
// DELETE 
  router.delete('/delete/:id',async (req, res) => {
    const imageId = req.params.id;
  
  
    try {
      await Images.findByIdAndDelete(imageId)
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting image', details: error.message });
    }
  });


module.exports = router;