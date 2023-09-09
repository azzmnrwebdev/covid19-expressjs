const express = require("express"); // import express
const router = express.Router(); // menggunakan method Router dari express
const Patient = require("../controllers/PatientController"); // import patient controller
const validatePatients = require("../controllers/validations/validatePatients"); // import validasi untuk patient
const auth = require("../controllers/auth/tokenValidation"); // import untuk cek token user

router.get("/patients", Patient.index); // untuk menampilkan data
router.post("/patients", auth, validatePatients, Patient.store); // untuk menambahkan data
router.get("/patients/:id", Patient.show); // untuk melihat detail data sesuai id
router.put("/patients/:id", auth, Patient.update); // untuk mengedit data sesuai id
router.delete("/patients/:id", auth, Patient.destroy); // untuk menghapus data sesuai id
router.get("/patients/search/:name", Patient.search); // untuk mencari data [nama patient]
router.get("/patients/status/positive", Patient.positive); // untuk mencari data pasien dengan status positive
router.get("/patients/status/recovered", Patient.recovered); // untuk mencari data pasien dengan status recovered
router.get("/patients/status/dead", Patient.dead); // untuk mencari data pasien dengan status dead

// export router
module.exports = router;
