const express = require('express');
const exegesisExpress = require('exegesis-express');
const http = require('http');
const path = require('path');
const jwtAuthenticator = require("./authenticators/JWTAuth.js");
const serveStatic = require("serve-static");
const exegesisSwaggerUIPlugin = require("exegesis-plugin-swagger-ui-express");
const serverPort = process.env.PORT || 8080;

async function createServer() {



    const app = express();

    const options = {
        controllers: path.resolve(__dirname, './controllers'),
        allowMissingControllers: false,
        customFormats: {
                        book_id: /^\d{10}$/,
                        author_id: /^\d{8}$/,
                        event_id: /^\d{9}$/
                      },
        authenticators: { jwtAuth: jwtAuthenticator },
        plugins: [
                  exegesisSwaggerUIPlugin({
                    app: app,
                    path: "/docs"
                  })]
    };

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './api/bookaholic_api_spec.yaml'),
        options
    );

    app.use(exegesisMiddleware);

    app.use(serveStatic(path.join(__dirname, "views")));

    app.use((req, res) => {
        res.status(404).json({message: `Not found`});
    });

    app.use((err, req, res, next) => {
        res.status(500).json({message: `Internal error: ${err.message}`});
    });

    const server = http.createServer(app);

    return server;
}

createServer()
.then(server => {
    server.listen(serverPort);
    console.log("Listening on port " + serverPort);
})
.catch(err => {
    console.error(err.stack);
    process.exit(1);
});
