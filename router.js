import  {endpoints} from "./config/endpoints.js";

export class Router {
    catController;
    dogController;
    validator;

    constructor(catController,dogController, validator) {
        this.catController = catController;
        this.dogController = dogController;
        this.validator = validator;
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
        if (
            endpoint.validation !== undefined
            && !this.validator.validate(req.body, endpoint.validation)
        ) {
            res.statusCode = 400;
            return "Incorrect body";
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let controllerMethodResult = this[endpoint.controller][endpoint.method](req, res, ...pathVariables);
        return JSON.stringify(controllerMethodResult);
    }
}