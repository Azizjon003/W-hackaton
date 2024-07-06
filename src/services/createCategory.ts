import fs from "fs";
import prisma from "../../prisma/prisma";
const testFunction = async () => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

  for (let i = 0; i < data.length; i++) {
    const category = await prisma.category.create({
      data: {
        name: data[i].name.trim(),
        icon: data[i].icons,
      },
    });
  }
};

// testFunction();

const createProducts = async () => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  const category: any[] = await prisma.category.findMany();

  for (let i = 0; i < data.length; i++) {
    const product = await prisma.product.create({
      data: {
        name: data[i].name.trim(),
        image: data[i].image,
        price: 0,
        description: "description",
        link: "link",
      },
    });
    const rundNum = Math.floor(Math.random() * category?.length);
    const cetegoryId = category[rundNum]?.id;

    await prisma.product_category.create({
      data: {
        category_id: cetegoryId,
        product_id: product.id,
      },
    });
  }
};

createProducts();
