import Joi from "joi";
import { CustomError } from "../helpers/CustomError";
import prisma from "../../prisma/prisma";

export class Validations {
  static async addManageValidate(data: any) {
    const products = (await prisma.products.findMany()).map((item) => {
      return item.name.toLowerCase();
    });
    return await Joi.object({
      product: Joi.string()
        .required()
        .valid(...products),
    }).validateAsync(data);
  }
}
