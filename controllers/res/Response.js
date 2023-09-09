class Response {
  // error server dan isi pesan error nya
  errors = (res, err) => {
    res.status(500).json({
      status: 500,
      success: false,
      message: `server error => ${err.message}`,
    });
  };

  // response untuk yang di req tidak ada data atau not found dan tidak ada total
  noDataAndTotal = (res, code, boolean, pesan, data) => {
    res.status(code).json({
      // code => '200, 201, 404, dll'
      success: boolean, // bisa true or false
      message: pesan, // isi pesan nya apa
      data: data, // menampilkan data nya
    });
  };

  // response untuk yang ada total
  adaTotal = (res, boolean, pesan, total, data) => {
    res.status(200).json({
      success: boolean, // bisa true or false
      message: pesan, // isi pesan nya apa
      total: total, // menampilkan jumlah keseluruhan data
      data: data, // menampilkan data nya
    });
  };
}

// membuat object Response
const obj = new Response();

// export object Response
module.exports = obj;
