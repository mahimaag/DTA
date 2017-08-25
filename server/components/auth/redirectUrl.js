import EmployeeSchema from "../../api/employee/employee.model";
import jwt_token from "jsonwebtoken";
import Network from "../network";
import config from "../../config/environment/"
const USER_DATA_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/user?access_token=";
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
          res.cookie(config.cookie.HrmsTokenCookie, hrmsToken);
          res.cookie(config.cookie.TsmsTokenCookie, tsmsToken);

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

