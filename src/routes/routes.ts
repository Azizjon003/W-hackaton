import { Express } from "express";
import errorMiddleware from "../middleware/customErrorMidleware";

import prisma from "../../prisma/prisma";
import { title } from "node:process";

export default function Routes(app: Express) {
  try {
    app.get("/", async (req, res) => {
      const query = req.query.query || "";
      console.log(query);
      const products = await prisma.product.findMany();
      const category = await prisma.category.findMany();
      res.render("index", {
        title: "1000.tools",
        query: query,
        products: products,
        links: category,
      });
    });

    app.get("/signup", async (req, res) => {
      res.render("signUp", {
        title: "Next match",
      });
    });

    app.post("/create-tool", async (req, res) => {
      const { url, email } = req.body;

      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          toolLink: url,
        },
        create: {
          email: email,
          toolLink: url,
        },
      });

      const product = await prisma.product.create({
        data: {
          user_id: user.id,
          link: url,
        },
      });

      res.render("addDetail", {
        link: {
          link: url,
        },
        title: "Add Detail",
      });
    });

    app.post("create-detail", async (req, res) => {
      console.log(req.body);
    });
  } finally {
    app.use(errorMiddleware);
  }
}
