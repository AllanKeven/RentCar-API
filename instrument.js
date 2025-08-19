
const Sentry = require("@sentry/node");

Sentry.init({
    dsn: "https://03ba3257f12e92c2ed75664dd71c6af6@o4509867952701440.ingest.us.sentry.io/4509867975507968",

    sendDefaultPii: true,
});