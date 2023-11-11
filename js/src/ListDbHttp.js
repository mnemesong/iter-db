"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var server = (0, http_1.createServer)(function (req, res) {
    var url = req.url;
    var method = req.method;
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e7)
                req.connection.destroy();
        });
        req.on('end', function () {
            console.log("Body: ", body);
            console.log("typeof body: ", typeof body);
        });
    }
});
server.listen(3000, function () {
    console.log("Server has been started");
});
