require("dotenv").config();
declare global {
  var client: any; // YourClientType, client nesnenizin tipidir. Özel bir tipiniz yoksa, any kullanabilirsiniz.
}
import { Api } from "telegram";
import { userOnline } from "./telegramService.service";
import fs from "fs";
import { channel } from "diagnostics_channel";

export const getChannel = async (name: string) => {
  await userOnline();
  const result = await client.invoke(
    new Api.contacts.Search({
      q: name,
      limit: 10,
    })
  );

  const channels = result.chats
    .filter((item: any) => {
      return item.className === "Channel";
    })
    .map((items: any) => {
      return {
        title: items?.title,
        username: items.username,
      };
    });
  return channels;
};

getChannel("ronaldo");
