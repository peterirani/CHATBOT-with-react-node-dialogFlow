const proxy = require("http-proxy-middleware");

module.export = function (app) {
    app.use(proxy("/api", { target: 'http://localhost:5000' }));
};