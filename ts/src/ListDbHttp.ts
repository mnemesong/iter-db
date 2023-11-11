import { createServer } from "http";
import { ListDb } from "./ListDb";

const server = createServer((req, res) => {
    const url = req.url
    const method = req.method
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e7)
                req.connection.destroy();
        });
        req.on('end', function () {
            console.log("Body: ", body)
            console.log("typeof body: ", typeof body)
        });
    }
})

server.listen(3000, () => {
    console.log("Server has been started")
})