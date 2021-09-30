const recordsController = require("./records.controller");
const controller = new recordsController();
const express = require('express');

const router = express.Router();

router.post('/count', controller.count);


module.exports = router;