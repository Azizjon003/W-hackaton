import Cheerio from "cheerio";

import fs from "fs";

const data = fs.readFileSync("index.html", "utf-8");

const $ = Cheerio.load(data);

let dataJSon: any = [];
$("a").each((index, element) => {
  const href = $(element).text().trim();
  let img = $(element).find("img").attr("src");
  let name = $(element).find("h3").text().trim();

  const obj = {
    name,
    image: img,
  };
  dataJSon.push(obj);
});

console.log(dataJSon);
fs.writeFileSync("data.json", JSON.stringify(dataJSon));
