import config from "config";
const { verify, sign } = require("jsonwebtoken");

const JWT_SECRET = config.get("jwt_secret");

export function genereteToken(data: any) {
  return sign(data, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function genereateRefreshToken(data: any) {
  return sign(data, JWT_SECRET, {
    expiresIn: "2d",
  });
}

export function checkToken(data: any) {
  try {
    return verify(data, JWT_SECRET);
  } catch (e) {
    return false;
  }
}

export function checkPassword(password: string, hash: string) {
  return password === hash;
}
