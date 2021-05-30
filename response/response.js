class Response{
    constructor(message, code, data){
        this.message = message;
        this.code = code;
        this.data = data;
    }
}

class PageResponse{
    constructor(message, code, data, pageNumber, pageSize){
        this.message = message;
        this.code = code;
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}

module.exports = {
    Response,
    PageResponse
}