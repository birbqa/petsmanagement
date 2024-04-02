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
};

