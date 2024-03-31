import {Controller} from "./controller.js";
import {endpoints} from "./config/endpoints.js";

export class Router {
    controller;

    constructor() {
        this.controller = new Controller();
    }

    chooseEndpointProcessor(req, res) {
        let endpointsByPath = endpoints[req.url];
        if (endpointsByPath === undefined) {
             res.statusCode = 404;
             return;
        }
        for (let endpointByPath of endpointsByPath) {
            if (req.method === endpointByPath.httpMethod) {
                return this.controller[endpointByPath.method](req, res);
            }
        }
         res.statusCode = 405;
    }
}