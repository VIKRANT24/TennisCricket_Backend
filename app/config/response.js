class Response {

    constructor() {

    }

    sendResponse(req, res, data, message) {
        this.request = req;
        res.status(200).send({
            message: message,
            statusCode: "00",
            data:data      
        });
    }
    sendError(req, res, message) {
        this.request = req;
        res.status(500).send({
            message: message,
            statusCode: "01",
            data:[]        
        });
    }
    sendNoData(req, res, message) {
        this.request = req;
        res.status(404).send({
          message: message,
          statusCode: "01",
          data:[]         
        });
    }
}

module.exports = Response;