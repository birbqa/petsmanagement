import {Controller} from "./controller.js";
import {endpoints} from "./config/endpoints.js";

export class Router {
    controller;
    constructor() {
        this.controller = new Controller();
    }
    chooseEndpointProcessor(req, res) {
        let endpointFound = false;
        for (let endpoint of endpoints) {
            if (req.url === endpoint.url) {
                if (req.method === endpoint.httpMethod) {
                    return this.controller[endpoint.method](req, res);
                }
                 endpointFound = true;
            }
        }
        if (endpointFound) {
            res.statusCode = 405;
        } else {
            res.statusCode = 404;
        }
    }
}

