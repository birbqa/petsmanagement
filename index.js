import * as http from 'http';
import {Router} from "./router.js";
import {DogController} from "./controller/dogController.js";
import {CatController} from "./controller/catController.js";
import {CatRepository} from "./catRepository.js";
import {Validator} from "./validator.js";
import mysql from "mysql2/promise";
const creds = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pets'}
const hostname = '127.0.0.1';
const port = 3000;
const dogController = new DogController();
let createdConnection = await mysql.createConnection(creds);
const catController = new CatController(new CatRepository(createdConnection));
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
        .on('end', async () => {
            requestBody = Buffer.concat(requestBody).toString();
            if (method !== "GET" && requestBody) {
                request.body = JSON.parse(requestBody);
            }
            response.on('error', err => {
                console.error(err);
            });

            const responseBody = await router.chooseEndpointProcessor(request, response);
            response.end(responseBody);
        });
    })
    .listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });