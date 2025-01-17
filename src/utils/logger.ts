import logger from "pino";
import config from "config";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level: config.get<string>("logLevel"),
  base: {
    pid: false,
  },
});

export default log;
