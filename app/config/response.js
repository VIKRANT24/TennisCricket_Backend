class Response {

    constructor() {

    }

    sendResponse(req, res, data, message) {
        res.status(200).send({
            message: message,
            statusCode: "00",
            data:data      
        });
    }
    sendError(req, res, message) {
        res.status(200).send({
            message: message,
            statusCode: "01",
            data:[]        
        });
    }
    sendNoData(req, res, message) {
        res.status(200).send({
          message: message,
          statusCode: "01",
          data:[]         
        });
    }
}

module.exports = Response;