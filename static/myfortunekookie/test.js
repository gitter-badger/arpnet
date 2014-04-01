var static = require('node-static');
var fileServer = new static.Server('static');


 createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}).listen(3000);