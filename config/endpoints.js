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
            validation: {
                id: ["number", "required"],
                name: ["string","required"],
                fur: ["string","required"],
                age: ["number", "required"],
            },
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