// import express-validator
const { check, validationResult } = require("express-validator");

// buat validasi
const validations = [
  // untuk kolom name
  check("name").notEmpty().withMessage("Name is required").trim().escape(),

  // untuk kolom phone
  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isNumeric()
    .withMessage("Phone must be a number")
    .trim()
    .escape(),

  // untuk kolom address
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .trim()
    .escape(),

  // untuk kolom status
  check("status").notEmpty().withMessage("Status is required").trim().escape(),

  // untuk kolom tanggal masuk
  check("in_date_at")
    .notEmpty()
    .withMessage("In Date At is required")
    .trim()
    .escape(),
];

const validate = [
  // tangkap variable validations
  validations,
  // responses
  (req, res, next) => {
    const results = validationResult(req);
    const hasErrors = !results.isEmpty();

    if (hasErrors) {
      return res.status(422).json({
        status: 422,
        success: false,
        message: "All fields must be filled correctly",
        error: results.array(),
      });
    }
    next();
  },
];

// export validate
module.exports = validate;
