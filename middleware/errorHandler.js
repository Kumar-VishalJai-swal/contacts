const {constants} = require("../constant");
const errorHandler = (err, req, res, next) => {
   const statusCode = res.statusCode ? res.statusCode:500;
   switch(statusCode){
    case constants.VALIDATION_ERROR:
        res.json({ title: "Validation Failed", massage: err.massage, stacktrace: err.stack });
        break;
    case constants.NOT_FOUND: 
        res.json({ title: "Not Found", massage: err.massage, stacktrace: err.stack });
        break;
    case constants.UNAUTHORIZED: 
        res.json({ title: "UNAUTHORIZED ERROR", massage: err.massage, stacktrace: err.stack });
        break;
    case constants.FORBIDDEN: 
        res.json({ title: "FORBIDEN ERROR", massage: err.massage, stacktrace: err.stack });
        break;
    case constants.SERVER_ERROR: 
        res.json({ title: "SERVER ERROR", massage: err.massage, stacktrace: err.stack });
        break;
    default: 
    res.json({ title: "NO ERROR", massage: err.massage, stacktrace: err.stack });
   }
  
}; 

module.exports = errorHandler;