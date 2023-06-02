const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(
    path.join(path.dirname(__filename), "data.json")
);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = new Date().toUTCString();
        req.body.updatedAt = new Date().toUTCString();
    }

    if (req.method === "PUT") {
        req.body.updatedAt = new Date().toUTCString();
    }

    // Continue to JSON Server router
    next();
});

// Use default router
server.use("/api", router);

const PORT = process.env.PORT || 3000;
const PRODUCTION = process.env.NODE_ENV == "production";

server.listen(PORT, () => {
    console.log(
        PRODUCTION
            ? "Server is running"
            : `Server is running on http://localhost:${PORT}`
    );
});
