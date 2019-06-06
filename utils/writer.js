
module.exports = function (context, code, payload) {
    context.res.statusCode = code;
    context.res.setHeader("Access-Control-Allow-Origin", "*");
    context.res.setBody(JSON.stringify(payload, null, 2));
}
