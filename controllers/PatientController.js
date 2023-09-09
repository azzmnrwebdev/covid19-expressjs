// TODO 4: SETUP CONTROLLER

// import models dan response
const models = require("../models");
const Response = require("./res/Response");

// create class
class PatientController {
  /**
   * method index untuk menampilkan keseluruhan data
   * yang ada di models dan db dengan table patients
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   * @param {findAll} model = untuk mengakses semua data
   * @returns mengembalikan response json status code 200
   */
  async index(req, res) {
    try {
      // memanggil data yang ada di models, lalu disimpan ke variable patients
      const patients = await models.Patient.findAll({
        order: [["id", "DESC"]],
      });

      // menghitung jumlah total data patients
      const total = patients.length;

      // mengembalikan response json jika data nya ada, status code 200 OK
      // else, mengembalikan response json jika data nya tidak ada, status code 200 OK
      total
        ? Response.adaTotal(res, true, "Get All Resource", total, patients)
        : Response.noDataAndTotal(res, 200, false, "Data is empty");
    } catch (err) {
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method store untuk membuat data
   * @param {create} method = pakai method create untuk membuat data
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   * @returns mengembalikan response json jika data nya berhasil dibuat, status code 200 OK
   */
  async store(req, res) {
    try {
      // request colum yang ada di table patients, jika berhasil dibuat simpan ke variable patients
      const patients = await models.Patient.create(req.body);

      // jika berhasil, mengembalikan response json, status code 200 OK
      return Response.noDataAndTotal(
        res,
        201,
        true,
        "Resource is added successfully",
        patients
      );
    } catch (err) {
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method show untuk menampilkan 1 data saja
   * @param {id} req = mencari id jika id nya ada dan jika tidak ada, disimpan ke variable id
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   * @param {findOne} model = untuk menangkap id yang ada di database
   */
  async show(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // mengambil 1 data dari model dengan method findOne sesuai id nya
      // dan disimpan ke variabel patients
      const patients = await models.Patient.findOne({ where: { id } });

      // mengembalikan response json jika data nya sesuai id, status code 200 OK
      // else, mengembalikan response json jika id tidak sesuai di database, status code 404 NOT FOUND
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
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method update untuk mengupdate data
   * @param {findOne} model = untuk menangkap id yang ada di database
   * @param {update} method = jika ingin mengupdate data, pakai method update, update dari data lama menjadi data baru
   * @param {id} req = mencari id jika id nya ada dan jika tidak ada, disimpan ke variable id
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   */
  async update(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // cari id patients yang ingin di update
      const patients = await models.Patient.findOne({ where: { id } });

      // buat kondisi
      // melakukan update data
      // mengembalikan response json jika data berhasil diupdate sesuai id di database, status code 200 OK
      // else, mengembalikan response json jika id tidak sesuai di database, status code 404 NOT FOUND
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
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method destroy untuk menghapus data
   * @param {findOne} model = untuk menangkap id yang ada di database
   * @param {destroy} method = untuk menghapus data pakai method destroy
   * @param {id} req = mencari id jika id nya ada dan jika tidak ada, disimpan ke variable id
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   */
  async destroy(req, res) {
    try {
      // user request id
      const { id } = req.params;

      // cari id patients yang ingin di delete
      const patients = await models.Patient.findOne({ where: { id } });

      // buat kondisi
      // melakukan delete data
      // mengembalikan response json jika data berhasil dihapus sesuai id di db, status code 200 OK
      // else, mengembalikan response json jika id tidak sesuai di database, status code 404 NOT FOUND
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
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method search, untuk mencari data patient berdasarkan nama nya
   * @param {name} req = request name patients di route parameter
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   * @param {Sequelize, Op} package = import package sequelize dan menggunakan Op untuk where like
   */
  async search(req, res) {
    // import package sequelize
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;

    try {
      const { name } = req.params; // request name patient di route parameter

      const patients = await models.Patient.findAll({
        where: { name: { [Op.like]: "%" + name + "%" } },
      }); // mencari data patient berdasarkan nama yang di cari

      // menghitung jumlah total data patients
      const total = patients.length;

      // jika data nya ada, maka tampilkan response adaTotal
      // else, jika data nya tidak ada, maka tampilkan response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get searched resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method positive, untuk menampilkan data pasien dengan status positive
   * @param {findAll} model = untuk mengakses semua data
   * @param {positive} status = mengambil data berdasarkan status 'positive'
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   */
  async positive(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "positive" },
        order: [["id", "DESC"]],
      });

      // menghitung jumlah total data patients
      const total = patients.length;

      // jika data nya ada, maka tampilkan response adaTotal
      // else, jika data nya tidak ada, maka tampilkan response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get positive resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method recovered, untuk menampilkan data pasien dengan status recovered
   * @param {findAll} model = untuk mengakses semua data
   * @param {recovered} status = mengambil data berdasarkan status 'recovered'
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   */
  async recovered(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "recovered" },
        order: [["id", "DESC"]],
      });

      // menghitung jumlah total data patients
      const total = patients.length;

      // jika data nya ada, maka tampilkan response adaTotal
      // else, jika data nya tidak ada, maka tampilkan response noDataAndTotal
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
      // handling jika server error
      return Response.errors(res, err);
    }
  }

  /**
   * method dead, untuk menampilkan data pasien dengan status dead
   * @param {findAll} model = untuk mengakses semua data
   * @param {dead} status = mengambil data berdasarkan status 'dead'
   * @param {err} res = untuk menghandle jika server nya error, status code 500
   */
  async dead(req, res) {
    try {
      const patients = await models.Patient.findAll({
        where: { status: "dead" },
        order: [["id", "DESC"]],
      });

      // menghitung jumlah total data patients
      const total = patients.length;

      // jika data nya ada, maka tampilkan response adaTotal
      // else, jika data nya tidak ada, maka tampilkan response noDataAndTotal
      total
        ? Response.adaTotal(res, true, "Get dead resource", total, patients)
        : Response.noDataAndTotal(res, 404, false, "Resource not found");
    } catch (err) {
      // handling jika server error
      return Response.errors(res, err);
    }
  }
}

// membuat object PatientController
const Patient = new PatientController();

// export object PatientController
module.exports = Patient;
