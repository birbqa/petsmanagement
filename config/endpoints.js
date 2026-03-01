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
                name: ["string","required"],
                gender: ["string", "required"],
                colour: ["string","required"],
                character: ["string","required"],
                age: ["number", "required"],
            },
        },
    },
    "/cats/([0-9]+)": {
        "GET": {
            method: "getCat",
            controller: "catController",
        },
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