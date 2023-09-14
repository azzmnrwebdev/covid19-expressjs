class Response {
  // server and message error
  errors = (res, err) => {
    res.status(500).json({
      status: 500,
      success: false,
      message: `server error => ${err.message}`,
    });
  };

  // The response for the request is that there is no data or not found and there is no total
  noDataAndTotal = (res, code, boolean, pesan, data) => {
    res.status(code).json({
      success: boolean, // true or false
      message: pesan, // message
      data: data, // show data
    });
  };

  // response to existing total
  adaTotal = (res, boolean, pesan, total, data) => {
    res.status(200).json({
      success: boolean, // true or false
      message: pesan, // message
      total: total, // total amount of data
      data: data, // show data
    });
  };
}

// create response objects
const obj = new Response();

// export object response
module.exports = obj;
