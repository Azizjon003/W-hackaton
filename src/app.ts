require("dotenv").config();
declare global {
  var client: any; // YourClientType, client nesnenizin tipidir. Özel bir tipiniz yoksa, any kullanabilirsiniz.
}
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "node:http";

import { json, urlencoded } from "body-parser";
import Routes from "./routes/routes";
import config from "config";
import log from "./utils/logger";
import cors from "cors";
import path from "path";
const PORT = config.get("port");
const app = express();
const server = createServer(app);

try {
  app.set("view engine", "ejs");
  console.log(path.join(__dirname));
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //     credentials: true,
  //   })
  // );

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip + " " + req.method + " " + req.url);
    console.log(
      req.headers["x-forwarded-for"] +
        " " +
        req.socket.remoteAddress +
        " " +
        req.method +
        " " +
        req.url
    );
    next();
  });

  server.listen(PORT, () => {
    log.info(`=================================`);
    log.info(`SERVER IS LISTENING ON PORT ${PORT} Time ${new Date()}`);
    log.info(`=================================`);
  });
} catch (error) {
  console.log(error);
} finally {
  Routes(app);

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Ushlanmagan rad etilgan va'da:", promise, "Sabab:", reason);
    // Kerakli choralarni ko'ring...
  });

  process.on("uncaughtException", (error) => {
    console.error("Ushlanmagan istisno:", error);
    // Kerakli choralarni ko'ring...
  });

  // initAddContent();
}
