const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.file);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-"+ file.originalname);
  //   if (file.originalname.length > 6)
  //     cb(
  //       null,
  //       file.fieldname +
  //         "-" +
  //         Date.now() +
  //         file.originalname.substr(
  //           file.originalname.length - 6,
  //           file.originalname.length
  //         )
  //     );
  //   else cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/PNG" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = { upload };
