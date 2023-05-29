class Response {

    constructor() {

    }

    sendResponse(req, res, data) {
        this.request = req;
        res.status(200).send({
            message: "",
            statusCode: "00",
            data:data      
        });
    }
    sendError(req, res) {
        this.request = req;
        res.status(500).send({
            message: "Error In Retrieving Data",
            statusCode: "01",
            data:[]        
        });
    }
    sendNoData(req, res) {
        this.request = req;
        res.status(404).send({
          message: "No Record Found",
          statusCode: "01",
          data:[]         
        });
    }
}

module.exports = Response;