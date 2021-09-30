// const auth = require("./_helpers/auth");
const errorHandler = require("./_helpers/errorHandler");
// const jwt = require("./_helpers/jwt");


module.exports = function (app) {

    // app.use("/", auth);

    // app.use("/", [jwt()]);

    app.use("/records", require("./modules/records"));


    app.use(errorHandler); // this line will be in last
};
