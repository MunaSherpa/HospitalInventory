const multer = require("multer");
// const fs = require("fs-extra")
// const crypto = require('crypto');
// const path = require('path');
// const nodemailer = require("nodemailer");

/**
 * Send 200 Response to the client
 * @param {import("express").Response} res 
 * @param {*} data
 * @param {number} [statusCode=200]  - Default value is 200
 */
function sendGoodResponse(res, data, statusCode = 200) {
  return res.status(statusCode).send(data);
}

/**
 * send 400 response to the client
 * @param {import("express").Response} res 
 * @param {*} data 
 * @param {number} [status=400] - Default value is 400
 */
function sendBadResponse(res, data, status = 400) {
  return res.status(status).send(data);
}




module.exports = {
  sendGoodResponse,
  sendBadResponse
  
}
