import Joi from "joi";
import { CustomError } from "../helpers/CustomError";
import prisma from "../../prisma/prisma";

export class Validations {
  static async createTabsValidations(data: any) {
    return await Joi.object({
      url: Joi.string().uri().required(),
    }).validateAsync(data);
  }

  static async createUserAndProductsValidations(data: any) {
    const products = (await prisma.products.findMany()).map((item) => {
      return item.name.toLowerCase();
    });
    return await Joi.object({
      user: Joi.object({
        emailOrId: Joi.string().required(),
        name: Joi.string().required(),
        source: Joi.array()
          .items(
            Joi.string()
              .required()
              .valid(...products)
          )
          .required(),
        addId: Joi.string().required(),
        isShowed: Joi.boolean(),
        isClicked: Joi.boolean(),
      }),
    }).validateAsync(data);
  }
}
