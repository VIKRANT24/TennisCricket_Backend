class Response {

    constructor() {
        // this.bindResponse(req, res);
    }

    sendResponse(req, res, data) {
        this.request = req;
        res.status(200).send({
            message: "",
            statusCode: 1,
            data:data      
        });
    }
    sendError(req, res) {
        this.request = req;
        res.status(500).send({
            message: "Error In Retrieving Data",
            statusCode: 0,
            data:[]        
        });
    }
    sendNoData(req, res) {
        this.request = req;
        res.status(404).send({
          message: "No Record Found",
          statusCode: 0,
          data:[]         
        });
    }
}

module.exports = Response;