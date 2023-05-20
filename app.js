require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes");
const cors = require("cors");
const Sentry = require("@sentry/node");
const port = 8000;
const fs = require("fs");
const { HTTP_PORT = 8000 } = process.env;

const { SENTRY_DSN, ENVIRONMENT } = process.env;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(router);
app.use(express.json());
app.use(morgan("dev"));

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

const file = fs.readFileSync("./docs.yaml", "utf8");

// 404
app.use((req, res, next) => {
  return res.status(404).json({
    message: "404 Not Found!",
  });
});

// 500
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});

app.listen(port, () => console.log("listening on port ", port));
