const { Router } = require("express");

const mogoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const education = require("../models/education");
const experiance = require("../models/experiance");
const work = require("../models/work");
const router = Router();

/*******************Connection process ***************** */

const options = {
  //  useNewUrlParser: true,
  //useUnifiedTopology: true,
  //serverSelectionTimeoutMS: 5000,
  //autoIndex: false, // Don't build indexes
  //maxPoolSize: 10, // Maintain up to 10 socket connections
  //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
mogoose
  .connect("mongodb://localhost:27017/profile", options)
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    // console.log(error);
  });

/********** the storage ********* */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    )
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
/***/ //////////storage end ////////////// */

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

/**********Listing education********* */
router.get("/education", (req, res) => {
  education.find().then((reslut) => {
    res.render("education", {
      education: reslut
    });
  });
});

/*******************/

router.post("/edite_education", async (req, res) => {
  const { s_name } = req.body;
 const { model_id } = req.body.model_id;
 console.log(model_id);
  let result = education.updateOne(
    {model_id:s_name} ,
    {
      description: req.body.description,
      degree: req.body.degree,
      date: req.body.date,
      s_name: req.body.s_name
   
    }, (err, data) => {
      console.log(err, data)
    }
  );
  education.find({ s_name }).then(i => console.log(i));
  console.log(req.body);
  // console.log(result);
  res.redirect("/education");
});

/*************** ADD education ******************* */

router.get("/add/education", auth, (req, res) => {
  res.render("education");
});

router.post("/add_education", (req, res) => {
  // console.log(req.file.filename);


  const edu = new education({
    s_name: req.body.s_name,
    degree: req.body.degree,
    date: req.body.date,
    description: req.body.description,
  });
  edu.save((error, result) => {
    // if (error)
    //   // console.log(error.message);
    // else {
    //   // console.log(result);
    // }
  });

  console.log("data inserted successful");
  res.render("education");
  res.end();
});

/* GET index page. */
router.get("/", (req, res) => {
  res.render("index");
});

/************* Adding experiance ****************** */

router.get("/add_experiance", auth, (req, res) => {
  res.render("experiance");
});

router.post("/add_experiance", (req, res) => {
  // console.log(req.file.filename);
  
  const eperian = new experiance({

    company: req.body.company,
    postion: req.body.postion,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    description: req.body.description,
  });
  eperian.save((error, result) => {
     if (error)
       console.log(error.message);
     else {
      console.log(result);
   }
  });

  console.log("data inserted successful");
  res.render("experiance");
  res.end();
});

/********  ADD work ********  */

router.get("/add_work", auth, (req, res) => {
  res.render("work");
});

router.post("/add_work", upload.single("img"), (req, res) => {
  console.log(req.file);

  const work_add = new work({
    project_title: req.body.project_title,
    project_name: req.body.project_name,
    img: req.file.filename,
  });
  work_add.save((error, result) => {
    // if (error)
    //   console.log(error.message);
    // else
    //   console.log(result);
  });

  console.log("data inserted successful");
  res.end();
});

/*************************** */

/* GET index page. */
router.get("/", (req, res) => {
  res.render("index");
});

/********************************* */

router.get("/cv", (req, res) => {
  res.render("cv");
  res.end();
});

router.get("/experiance", (req, res) => {
  res.render("experiance");
  res.end();
});

router.get("/work", (req, res) => {
  res.render("work");
  res.end();
});

router.get("/skills", (req, res) => {
  res.render("skills");
  res.end();
});

router.get("/education", (req, res) => {
  res.render("education");
  res.end();
});

router.get("/dash", (req, res) => {
  res.render("dash");
  res.end();
});

function auth(req, res, next) {
  next();
}

module.exports = router;
