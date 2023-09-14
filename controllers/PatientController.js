// import models and response
const models = require("../models");
const Response = require("./res/Response");

// create class
class PatientController {
  /**
   * index method to display all the data
   * which is in the models and db with the patients table
   * @param {err} res = to handle if the server has an error, status code 500
   * @param {findAll} model = to access all data
   * @returns returns a json response status code 200
   */
  async index(req, res) {
    try {
      // calls the data in the model, then saves it to the patient variable
      const patients = await models.Patient.findAll({
        order: [["id", "DESC"]],
      });

      // calculate the total number of patient data
      const total = patients.length;

      // returns a json response if the data exists, status code 200 OK
      // else, returns a json response if the data does not exist, status code 200 OK
      total
        ? Response.adaTotal(res, true, "Get All Resource", total, patients)
        : Response.noDataAndTotal(res, 200, false, "Data is empty");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * store method to create data
   * @param {create} method = use the create method to create data
   * @param {err} res = to handle if the server has an error, status code 500
   * @returns returns a json response if the data is successfully created, status code 200 OK
   */
  async store(req, res) {
    try {
      // request a column in the patients table, if created successfully, save it to the patients variable
      const patients = await models.Patient.create(req.body);

      // if successful, returns a json response, status code 200 OK
      return Response.noDataAndTotal(
        res,
        201,
        true,
        "Resource is added successfully",
        patients
      );
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * show method to display only 1 data
   * @param {id} req = looks for the ID if the ID exists and if it doesn't exist, it is saved to the id variable
   * @param {err} res = to handle if the server has an error, status code 500
   * @param {findOne} model = to capture the id in the database
   */
  async show(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // take 1 data from the model with the findOne method according to its ID
      // and saved to the patient variable
      const patients = await models.Patient.findOne({ where: { id } });

      // returns a json response if the data matches the ID, status code 200 OK
      // else, returns a json response if the ID does not match in the database, status code 404 NOT FOUND
      patients
        ? Response.noDataAndTotal(
            res,
            200,
            true,
            "Get Detail Resource",
            patients
          )
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * update method to update data
   * @param {findOne} model = to capture the id in the database
   * @param {update} method = if you want to update the data, in the update method, update the old data to new data
   * @param {id} req = looks for the ID if the ID exists and if it doesn't exist, it is saved to the id variable
   * @param {err} res = to handle if the server has an error, status code 500
   */
  async update(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // look for the patient ID you want to update
      const patients = await models.Patient.findOne({ where: { id } });

      // create conditions
      // update the data
      // returns a json response if the data is successfully updated according to the ID in the database, status code 200 OK
      // else, returns a json response if the ID does not match in the database, status code 404 NOT FOUND
      patients
        ? (await patients.update(req.body)) &
          Response.noDataAndTotal(
            res,
            200,
            true,
            "Resource is update successfully",
            patients
          )
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * destroy method to delete data
   * @param {findOne} model = to capture the id in the database
   * @param {destroy} method = to delete data, use the destroy method
   * @param {id} req = looks for the ID if the ID exists and if it doesn't exist, it is saved to the id variable
   * @param {err} res = to handle if the server has an error, status code 500
   */
  async destroy(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // cari id patients yang ingin di delete
      const patients = await models.Patient.findOne({ where: { id } });

      // create conditions
      // delete data
      // returns a json response if the data is successfully deleted according to the ID in the db, status code 200 OK
      // else, returns a json response if the ID does not match in the database, status code 404 NOT FOUND
      patients
        ? (await patients.destroy()) &
          Response.noDataAndTotal(
            res,
            200,
            true,
            "Resource is delete successfully"
          )
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * search method, to search for patient data by name
   * @param {name} req = request patient name in route parameters
   * @param {err} res = to handle if the server has an error, status code 500
   * @param {Sequelize, Op} package = import package sequelize and use Op for where like
   */
  async search(req, res) {
    // import package sequelize
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;

    try {
      const { name } = req.params; // request patient name in route parameters

      const patients = await models.Patient.findAll({
        where: { name: { [Op.like]: "%" + name + "%" } },
      }); // search for patient data based on the name you are looking for

      // calculate the total number of patient data
      const total = patients.length;

      // if the data exists, then display the response adaTotal
      // else, if the data does not exist, then display the response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get searched resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * positive method, to display patient data with positive status
   * @param {findAll} model = to access all data
   * @param {positive} status = retrieve data based on 'positive' status
   * @param {err} res = to handle if the server has an error, status code 500
   */
  async positive(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "positive" },
        order: [["id", "DESC"]],
      });

      // calculate the total number of patient data
      const total = patients.length;

      // if the data exists, then display the response adaTotal
      // else, if the data does not exist, then display the response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get positive resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * recovered method, to display patient data with recovered status
   * @param {findAll} model = to access all data
   * @param {recovered} status = retrieve data based on 'recovered' status
   * @param {err} res = to handle if the server has an error, status code 500
   */
  async recovered(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "recovered" },
        order: [["id", "DESC"]],
      });

      // calculate the total number of patient data
      const total = patients.length;

      // if the data exists, then display the response adaTotal
      // else, if the data does not exist, then display the response noDataAndTotal
      total
        ? Response.adaTotal(
            res,
            true,
            "Get recovered resource",
            total,
            patients
          )
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }

  /**
   * dead method, to display patient data with dead status
   * @param {findAll} model = to access all data
   * @param {dead} status = retrieve data based on 'dead' status
   * @param {err} res = to handle if the server has an error, status code 500
   */
  async dead(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "dead" },
        order: [["id", "DESC"]],
      });

      // calculate the total number of patient data
      const total = patients.length;

      // if the data exists, then display the response adaTotal
      // else, if the data does not exist, then display the response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get dead resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling if the server errors
      return Response.errors(res, err);
    }
  }
}

// create a PatientController object
const Patient = new PatientController();

// export object PatientController
module.exports = Patient;
