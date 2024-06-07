import * as http from 'http';
import {Router} from "./router.js";

const hostname = '127.0.0.1';
const port = 3000;
const router = new Router;

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let requestBody = [];
    request
        .on('error', err => {
            console.error(err);
        })
        .on('data', chunk => {
            requestBody.push(chunk);
        })
        .on('end', () => {
            requestBody = Buffer.concat(requestBody).toString();
            if (method !== "GET" && requestBody) {
                request.body = JSON.parse(requestBody);
            }
            response.on('error', err => {
                console.error(err);
            });

            const responseBody = router.chooseEndpointProcessor(request, response);
            response.end(responseBody);
        });
    })
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });