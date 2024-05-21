import {CatController} from "./controller/catController.js";
import {endpoints} from "./config/endpoints.js";
import {CatRepository} from "./catRepository.js";
import {DogController} from "./controller/dogController.js";

export class Router {
    catController;
    dogController;

    constructor() {
        this.catController = new CatController(new CatRepository());
        this.dogController = new DogController();
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
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return this[endpoint.controller][endpoint.method](req, res, ...pathVariables);
    }
}