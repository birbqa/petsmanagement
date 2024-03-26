import {Controller} from "./controller.js";
import {endpoints} from "./config/endpoints.js";

export class Router {
    controller;
    constructor() {
        this.controller = new Controller();
    }
    chooseEndpointProcessor(req, res) {
        for(let endpoint of endpoints) {
            if (req.url === endpoint.url) {
                return this.controller[endpoint.method](req, res);
            }
        }
        res.statusCode = 404;
    }
}
