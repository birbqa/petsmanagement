export const endpoints = {
    "/": [
        {
            url: "/",
            method: "root",
            httpMethod: "GET",
        },
    ],
    "/cats": [
        {
            url: "/cats",
            method: "cats",
            httpMethod: "GET",
        },
        {
            url: "/cats",
            method: "createCat",
            httpMethod: "POST",
        },
    ],
};




