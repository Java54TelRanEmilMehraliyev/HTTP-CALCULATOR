export default class RequestHandler {
    constructor(server,operations,view){
     this.server = server;
     this.operations = operations;
     this.view = view;
    }

    handleRequest(req,res){
        res.setHeader('content-type','text/html');
        const urlTokens = this.getUrlTokens(req.url);

        if(!this.isSupportedOperation(urlTokens[1])) {
            this.sendResponse(res, this.view.getHtml(`Unsuported operation: ${urlTokens[1]}`,true));
            return;
        }
        const operands = this.getOperands(urlTokens);
        if(!operands) {
            this.sendResponse(res, this.view.getHtml('Invalid operands',true));
            return;
        }
        this.server.emit(urlTokens[1],operands,res);
    }
    getUrlTokens(url){
        return url.split('/');
    }
    isSupportedOperation(operation){
        return this.operations.has(operation);
    }
    getOperands(urlTokens){
        const op1 = parseFloat(urlTokens[2]);
        const op2 = parseFloat(urlTokens[3]);
        return !isNaN(op1) && !isNaN(op2) ? [op1,op2] : null;
    }

    sendResponse(res,html){
        res.end(html);
    }
}