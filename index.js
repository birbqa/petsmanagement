import * as http from 'http';
import {Router} from "./router.js";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const router = new Router();
    const body = router.chooseEndpointProcessor(req, res);
    res.end(body);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
