const Doctor = require("../../model/admin/doctor");


const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

// register
exports.registerDoctor = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        message: "An error occurred while uploading the image."
      });
    } else if (err) {
      return res.status(500).json({
        message: "An unknown error occurred."
      });
    }

    const {   name, email, specialist, workExperience, education, price, time } = req.body;
    image = req.file.path;
  console.log(image);

    if (!image || !name || !email || !specialist || !workExperience || !education || !price || !time) {
      return res.status(400).json({
        message: "Please provide all the details"
      });
    }

    try {
      // Check if doctor exists
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({
          message: "Doctor with that email already exists."
        });
      }

      // Create a new doctor
      await Doctor.create({
        image,
        name,
        email,
        specialist,
        workExperience,
        education,
        price,
        time
      });
      res.status(201).json({
        message: "Doctor registered successfully."
      });
    } catch (error) {
      console.error("Error registering doctor:", error);
      res.status(500).json({
        message: "An error occurred while registering the doctor."
      });
    }
  });
};





// Fetch doctor details
exports.getDoctorDetails = async (req, res) => {
  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({
      message: "An error occurred while fetching doctor details."
    });
  }
};
//doctorDetailbyId
exports.getDoctorDetailbyId = async (req, res) => {
  try {
      const { _id} = req.body; // Assuming the email is passed as a route parameter
console.log(_id)
      // Fetch doctorid details from the database based on the id
      const doctor = await Doctor.findOne({ _id });

      if (!doctor) {
          return res.status(404).json({ message: 'doctorid not found' });
      }

      res.json(doctor);
  } catch (error) {
      console.error("Error fetching doctorid details:", error);
      res.status(500).json({
          message: "An error occurred while fetching doctorid details."
      });
  }
};