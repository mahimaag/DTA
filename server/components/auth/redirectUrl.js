import EmployeeSchema from "../../api/employee/employee.model";
import jwt_token from "jsonwebtoken";
import Network from "../network";
import config from "../../config/environment/"
import path from 'path';
const USER_DATA_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/user?access_token=";
const AUTH_HRMS_TOKEN_COOKIE = 'nw_dev_oauthToken';
const AUTH_TSMS_TOKEN_COOKIE = 'Tsms';
const redirectUrl = (req, res, next) => {

  const hrmsToken = req.query.access_token;
  Network({url: USER_DATA_URL + hrmsToken, method: 'GET'})
    .then(employeeData => {
      if (employeeData.statusCode === 200) {
          const employee = JSON.parse(employeeData.body);
          const employeeDetails = {
            employeeEmail: employee.email,
            employeeId: employee.employeeCode,
          };
          const tsmsToken = jwt_token.sign(employeeDetails, config.token.SecretKey, {
            expiresIn: config.token.ExpireTime,
          });
          res.cookie(AUTH_HRMS_TOKEN_COOKIE, hrmsToken, {
            maxAge: config.cookie.MaximumAge,
          });
          res.cookie(AUTH_TSMS_TOKEN_COOKIE, tsmsToken, {
            maxAge: config.cookie.MaximumAge,
          });

          EmployeeSchema.update({
            employeeId: employee.employeeCode,
            employeeEmail: employee.email
          }, {
            $set: {
              tsmsToken,
              hrmsToken,
            }
          }, {upsert: true}).exec()
            .then(employee => {
                return next()
            })
            .catch(error => {
               res.send(error)
            });
      }
    })
    .catch(error => {
        res.statusCode=error.statusCode;
        next(error);
    })
};
module.exports = redirectUrl;

