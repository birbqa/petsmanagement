import {Controller} from "./controller.js";

export class Router {
    controller;
    constructor() {
        this.controller = new Controller();
    }
    chooseEndpointProcessor(req, res) {
        if  (req.url === "/") {
            return this.controller.root(req, res);
        } else if (req.url === "/cats") {
            return this.controller.cats(req,res);
        } else {
            res.statusCode = 404;
        }
    }
}

//   THIS FALLBACK LOGIC FOR AN INCORRECT METHOD OF A CORRECT ENDPOINT
//     else if (req.url === "/cats") {
//     if (req.method !== "GET") {
//     res.statusCode = 405;
//     res.end();
//     return;
//