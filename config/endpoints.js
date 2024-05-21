export const endpoints = {
    "/": {
        "GET": {
            method: "root",
            controller: "catController",
        },
    },
    "/cats": {
        "GET": {
            method: "getCats",
            controller: "catController",
        },
        "POST": {
            method: "createCat",
            controller: "catController",
        },
    },
    "/cats/([0-9]+)": {
        "DELETE": {
            method: "deleteCat",
            controller: "catController",
        },
    },
    "/dogs": {
        "GET": {
            method: "getDogs",
            controller: "dogController",
        }
    }
};