const { Router } = require('express');

const mogoose = require("mongoose");

const multer = require("multer");
const education = require('../models/education');

const router = Router();




/********** the storage ********* */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif")
      cb(null, "public/images/");
    else if (file.mimetype == "application/pdf") cb(null, "public/pdf/");
   
  },
  filename: (req, file, cb) => {
    var extension = file.originalname.split(".");
    var ext = extension[extension.length - 1];

    //var uploaded_file_name =Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;
    var uploaded_file_name =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      ext;

    cb(null, uploaded_file_name);
  },
});
/***///////////storage end ////////////// */

/****************  uploading process ***************** */

const upload = multer({
  storage: storage,

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else callback(null, false);
  },
  limits: 1024 * 1024 * 5,
});

/****************  uploading process ***************** */




/*******************Connection process ***************** */

mogoose
  .connect("mongodb://localhost:27017/profile")
  .then((result) => {
     console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


/*************** ADD education ******************* */
router.post("/add_education", (req, res) => {
  const edu = new education({
    s_name: req.body.s_name,
    degree: req.body.degree,
    date: req.body.date,
    description: req.body.description,
  });

  edu.save();

  res.end();

  res.render("/education", { info: req.body });
});






/* GET index page. */
router.get('/', (req, res) => {
  res.render('index');
});


router.get("/cv",(req,res)=>{
  res.render("cv");
  res.end();
  });

  router.get("/experiance",(req,res)=>{
    res.render("experiance");
    res.end();
    });


    router.get("/work",(req,res)=>{
      res.render("work");
      res.end();
      });

      router.get("/skills",(req,res)=>{
        res.render("skills");
        res.end();
        });
        
        router.get("/education",(req,res)=>{
          res.render("education");
          res.end();
          });
  
  router.get("/dash",(req,res)=>{
    res.render("dash");
    res.end();
    });
module.exports = router;
