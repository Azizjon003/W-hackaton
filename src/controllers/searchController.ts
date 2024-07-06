import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { connected, getChannel } from "../services/telegramService.service";

export const searchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.query, "query");
    const search = String(req.query?.query).trim().toLowerCase();
    let channel = await prisma.channel.findFirst({
      where: {
        username: search,
      },
    });
    if (!channel) {
      console.log(search);
      await connected(search);
      channel = await prisma.channel.findFirst({
        where: {
          username: search,
        },
      });
    }
    const domain = `${req.protocol}://${req.get("host")}`;

    const imageUrl = `${domain}/images/${channel?.username}`;

    const responseData = {
      ...channel,
      imageUrl,
    };
    let contentText;
    if (!channel) {
      contentText = `
      <div> <p> Not found</p></div>`;
    } else {
      contentText = ` <div class="max-w-lg mx-auto p-4 shadow-md mt-10">
    <!-- Profile Container -->
    <div class="flex items-center flex-col space-x-4">
        <!-- Profile Image -->
        <div class="flex-none">
            <img src="/images/${
              channel?.image
            }" alt="Magic Slides Logo" class="w-16 h-16 rounded-full shadow-md object-cover">
        </div>
        <!-- Profile Info -->
        <div class="flex-grow min-w-0 mt-10 text-center">
            <div class="flex items-center justify-center gap-4">
                <span class="text-xl font-bold text-gray-900">${
                  channel?.name
                }</span>
                <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-medium users_count">${formatNumber(
                  Number(channel?.members)
                )}</span>
                <span class="bg-green-500 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">User</span>
            </div>
            <p class="text-gray-600">@${channel?.username}</p>
            <p class="mt-1 text-sm text-gray-600">${highlightAtSymbols(
              String(channel?.about)
            )}</p>
        </div>
    </div>
</div>

`;
    }

    // res.status(200).json({
    //   message: "Successfuly data",
    //   data: responseData,
    // });
    res.render("index", {
      title: "Telegram ommaviy kanal qidiruvi",
      query: channel?.username || "",
      content: contentText,
    });
  } catch (error) {
    res.render("index", {
      title: "Telegram ommaviy kanal qidiruvi",
      query: "Full",
      content: "<p>Not Found</p>",
    });
  }
};

export const suggessionChannels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = String(req.query?.q).trim().toLowerCase();
    let data = await getChannel(q);
    res.status(200).json({
      data,
      message: "Successfuly data",
    });
  } catch (error) {
    console.log(error);
  }
};

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

function highlightAtSymbols(text: string) {
  return text
    .split(" ")
    .map((word) => {
      return word.startsWith("@") ? `<span class="blue">${word}</span>` : word;
    })
    .join(" ");
}
