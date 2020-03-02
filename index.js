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
                    path: "/backend/swaggerui"
                  })]
    };

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './api/bookaholic_api_spec.yaml'),
        options
    );

    //Used to redirect http requests to https - uncomment before deployment
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`);
      else
        next();
    });

    app.use(exegesisMiddleware);

    /*This endpoint is necessary if we want to make the clicked resource's id available to the page in the URL,
    * for an easy retrieval of the requested resource from the server through URL parsing.

    FIX: after talking with the tutors, we've been suggested to change the single page URL handling.
        It's kept here for instructional purposes

    */
    // app.get(/\/(?:books|authors|events)\/\d{8,10}$/, function(req, res) {
    //   res.sendFile(path.join(__dirname, "views", req.url.match(/(?:book|author|event)/)[0] + ".html"));
    // })

    app.use(serveStatic(path.join(__dirname, "public"), {extensions: ["html"]}));

    app.use(serveStatic(path.join(__dirname, "public/pages"), {extensions: ["html"]}));

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
