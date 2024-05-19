export const endpoints = {
    "/": {
        "GET": {
            method: "root",
        },
    },
    "/cats": {
        "GET": {
            method: "cats",
        },
        "POST": {
            method: "createCat",
        },
    },
    "/cats/([0-9]+)": {
        "DELETE": {
            method: "deleteCat",
        },
    },
};