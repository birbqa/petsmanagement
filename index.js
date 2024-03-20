import * as http from 'http';
import {Controller} from "./controller.js";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const controller = new Controller();
    controller.processRequest(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

