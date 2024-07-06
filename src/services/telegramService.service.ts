import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
const input = require("input");
import { Api } from "telegram/tl";
import axios from "axios";
import path from "path";
import fs from "fs";
import prisma from "../../prisma/prisma";
global.client = null;
export const connected = async (channelUsername: string) => {
  try {
    const channel: any = await client.getEntity(channelUsername);
    // fs.writeFileSync("result2.json", JSON.stringify(channel));

    const fullChannel: any = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: channelUsername,
      })
    );

    fs.writeFileSync("result.json", JSON.stringify(fullChannel));
    const isChannel = fullChannel.fullChat.className;

    if (isChannel !== "ChannelFull") {
      throw new Error("Bunday kanal mavjud emas");
    }
    const photo: any = fullChannel.fullChat.chatPhoto;

    console.log(photo.className, "nimadir");
    const members = fullChannel?.fullChat?.participantsCount;
    const about = fullChannel?.fullChat?.about;
    const name = fullChannel?.chats[0]?.title;
    let publicPhoto = null;
    if (photo?.className !== "PhotoEmpty") {
      const fileLocation = new Api.InputPeerPhotoFileLocation({
        big: true,
        peer: new Api.InputPeerChannel({
          channelId: channel.id,
          accessHash: channel.accessHash,
        }),
        photoId: photo.id,
      });

      const result: any = await client.downloadFile(fileLocation, {
        dcId: photo.dcId,
      });

      fs.writeFileSync(
        path.join(
          __dirname,
          `../public/images/${channelUsername}_profile_photo.jpg`
        ),
        result
      );

      console.log(
        `Profil rasmi saqlandi: ${channelUsername}_profile_photo.jpg`
      );
      publicPhoto = `${channelUsername}_profile_photo.jpg`;
    } else {
      console.log("Kanalda profil rasmi mavjud emas");
    }
    const channelDataCreate = await prisma.channel.upsert({
      where: {
        telegram_id: channel.id,
      },
      update: {
        members: members,
        about,
        name,
        image: publicPhoto || "no_photo.jpg",
        username: channelUsername,
      },
      create: {
        members: members,
        about,
        name,
        image: publicPhoto || "no_photo.jpg",
        username: channelUsername,
        telegram_id: channel?.id,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    // Tozalash

    if ((global as any).gc) {
      (global as any).gc(); // Garbage collectorni majburlash
    } else {
      console.warn(
        "Garbage collectionni majburlash imkoniyati yo'q. Node.js-ni --expose-gc bilan ishga tushiring."
      );
    }
  }
};
export const getChannel = async (name: string) => {
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
      console.log(items);
      if (!items.username) {
        return {
          title: items?.title,
          username: items.usernames[0].username,
        };
      }
      return {
        title: items?.title,
        username: items.username,
      };
    });
  return channels;
};

export const userOnline = async () => {
  const apiId = Number(String(process.env.API_ID));
  const apiHash = String(process.env.API_HASH);
  let stringSession = new StringSession(String(process.env.API_SESSION));
  let client: any;
  client = new TelegramClient(stringSession, apiId, apiHash, {
    timeout: 3000,
  });
  await client.connect();
  console.log("Loading interactive example...");

  global.client = client;

  // await client.sendMessage("me", { message: "Azizjon!" });
};
