(function () {
  "use strict";
  var e = require("crypto"),
    n = require("base64url"),
    i = require("fs"),
    r = Date.now(),
    t = n(e.randomBytes(64));
  i.appendFile(
    "./config/app.js",
    "\n//UNIX=" + r + "\n//APP_KEY=" + t,
    function (e) {
      if (e) throw e;
    }
  ),
    i.appendFile(".env", "\n#UNIX=" + r + "\n#APP_KEY=" + t, function (e) {
      if (e) throw e;
      process.exit(0);
    });
}.call(this));

//UNIX=1694174725177
//APP_KEY=nT2m03_QqKT5CPrFMPpGsnts1ITOmtW8I3-cn48je7zUKr5Lm0NuNOQ1SABM1pSmKugjWoYno6jWZxt8FNnegQ