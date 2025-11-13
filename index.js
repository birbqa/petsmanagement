import * as http from 'http';
import {Router} from "./router.js";
import {DogController} from "./controller/dogController.js";
import {CatController} from "./controller/catController.js";
import {CatRepository} from "./catRepository.js";
import {Validator} from "./validator.js";
const hostname = '127.0.0.1';
const port = 3000;
const dogController = new DogController();
const catController = new CatController(new CatRepository());
const validator = new Validator();
const router = new Router(catController, dogController, validator);

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