const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end("\"Cats live here!\"");
    } else if (req.url === "/cats") {
        if (req.method !== "GET") {
            res.statusCode = 405;
            res.end();
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const cats = [
            {
                "name": "Benya",
                "age": 12,
                "colour": "white-red",
                "fur": "fluffy",
            },
            {
                "name": "Monya",
                "age": 6,
                "colour": "white-black",
                "fur": "fluffy",
            },
        ];
        res.end(JSON.stringify(cats));
    }
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

