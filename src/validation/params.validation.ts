import Joi from "joi";
import { CustomError } from "../helpers/CustomError";
import prisma from "../../prisma/prisma";

export class ValidationsParam {
  static async ParamCuidValidation(data: any) {
    return await Joi.string()
      .regex(/^c[^\s-]{8,}$/)
      .required()
      .error(new CustomError("Cuid is invalid", 400))
      .validateAsync(data);
  }

  static async ParamsStringValidation(data: any) {
    return await Joi.string().required().validateAsync(data);
  }

  static async ParamUuidValidationOptional(string: any) {
    return await Joi.string().uuid().required().validateAsync(string);
  }

  static async paginationFilter(data: any) {
    return Joi.object({
      limit: Joi.number().min(5).max(100).default(10),
      page: Joi.number().min(1).default(1),
    }).validateAsync(data);
  }

  static async filter(data: any) {
    return await Joi.object({
      limit: Joi.number().min(5).max(100).default(10),
      page: Joi.number().min(1).default(1),
      order: Joi.array()
        .items(
          Joi.object({
            column: Joi.string().required(),
            value: Joi.string().valid("asc", "desc").required(),
          })
        )
        .default([
          {
            column: "createdAt",
            value: "desc",
          },
        ]),
      filter: Joi.array().items(
        Joi.object({
          column: Joi.string().required(),
          value: Joi.string().required(),
        })
      ),
      // .default([{ column: "phoneNumber", value: null }]),
      type: Joi.string().valid("postBooking"),
    }).validateAsync(data);
  }

  static async ParamUsdotValidation(string: any) {
    return await Joi.string()
      .regex(/^\d{3,8}$/)
      .required()
      .error(new CustomError("USDOT is invalid", 400))
      .validateAsync(string);
  }

  static async ParamUsDotValidationOptional(string: any) {
    return await Joi.string()
      .regex(/^\d{3,8}$/)
      .required()
      .validateAsync(string);
  }
  static async CookieValidation(data: any) {
    return await Joi.object({
      value: Joi.string(),
      valueJson: Joi.array(),
      source: Joi.string().required(),
    }).validateAsync(data);
  }

  static async ContentValidation(data: any) {
    const products = (await prisma.products.findMany()).map((item) => {
      return item.name.toLowerCase();
    });

    return await Joi.object({
      product: Joi.string()
        .required()
        .valid(...products),
      content: Joi.string().required(),
    }).validateAsync(data);
  }
}
