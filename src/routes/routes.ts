import { Express } from "express";
import errorMiddleware from "../middleware/customErrorMidleware";
import { telegramUserUpdateAndCreate } from "../controllers/telegramController";
import {
  searchController,
  suggessionChannels,
} from "../controllers/searchController";

export default function Routes(app: Express) {
  try {
    app.get("/", (req, res) => {
      const query = req.query.query || "";
      console.log(query);
      res.render("index", {
        title: "Telegram ommaviy kanal qidiruvi",
        query: query,
        content: null,
      });
    });
    app.post("/telegram-data", telegramUserUpdateAndCreate);
    app.get("/search-channel", searchController);
    app.get("/suggession", suggessionChannels);
  } finally {
    app.use(errorMiddleware);
  }
}
