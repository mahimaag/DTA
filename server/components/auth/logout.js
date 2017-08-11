import config from "../../config/environment"
const INVALIDATE_TOKEN_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/invalidateToken?access_token=";
import Network from "../network";
import logger from "../logger"

/**
 *this function clears the TSMS Auth  cookie as soon as employee clicks on the logout button
 * @params req ,res
 */

const logout = (req, res) => {
  const hrmstoken = req.cookies[config.cookie.HrmsTokenCookie];

  res.clearCookie(config.cookie.TsmsTokenCookie).send("logout successful");
  //
  // res.clearCookie(config.cookie.HrmsTokenCookie).send("logout successful");
  // Network({url: INVALIDATE_TOKEN_URL + hrmstoken})
  //   .then(res => {
  //     logger.silly(res)
  //   })
  //   .catch(error => {
  //     logger.silly(error)
  //   })

};

module.exports = logout;
