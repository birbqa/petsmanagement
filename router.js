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

    async chooseEndpointProcessor(req, res) {
        let endpointsByPath;
        let pathVariables;
        let endpointResult;
        let endpointsKeys = Object.keys(endpoints)
        for(let key of endpointsKeys) {
            let pattern = `^${key}$`;
            const regex = new RegExp(pattern);
            const found = req.url.match(regex);
            console.log(found)
            if (found != null) {
                pathVariables = Array.from(found);
                console.log(pathVariables, " HEYLLL");
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
            endpointResult = "Incorrect body";
        } else {
            res.statusCode = 200;
            console.log(`calling ${req.url}`);
            //this.castController.getCats(req,res,pathVariables)
            endpointResult = await this[endpoint.controller][endpoint.method](req, res, ...pathVariables)
        }
        res.setHeader('Content-Type', 'application/json');
        return JSON.stringify(endpointResult);
    }
}