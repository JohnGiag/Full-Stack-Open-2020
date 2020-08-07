var morgan = require("morgan");

module.exports =  morgan((tokens, req, res) => {
    morgan.token("body", (req, res) => {
      if (req.method == "POST" || req.method== "PUT") {
        return JSON.stringify(req.body);
      }
    });
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })