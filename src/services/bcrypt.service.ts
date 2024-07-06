import bcrypt from "bcrypt";

export function generateHash(password: string) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
