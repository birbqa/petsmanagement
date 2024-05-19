import {Controller} from "./controller.js";
import {endpoints} from "./config/endpoints.js";
import {CatRepository} from "./catRepository.js";

export class Router {
    controller;

    constructor() {
        this.controller = new Controller(new CatRepository());
    }

    chooseEndpointProcessor(req, res) {
        let endpointsByPath;
        let pathVariables;
        let endpointsKeys = Object.keys(endpoints)
        for(let key of endpointsKeys) {
            let pattern = `^${key}$`;
            const regex = new RegExp(pattern);
            const found = req.url.match(regex);
            if (found != null) {
                pathVariables = Array.from(found);
                pathVariables.shift();
                endpointsByPath = endpoints[key];
                break;
            }
        }
        if (endpointsByPath === undefined) {
             res.statusCode = 404;
             return;
        }
        let endpoint = endpointsByPath[req.method];
        if (endpoint === undefined) {
                res.statusCode = 405;
            return;
        }
        return this.controller[endpoint.method](req, res, ...pathVariables);
    }
}