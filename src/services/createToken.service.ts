import crypto from "crypto";

export function sha256(data: string) {
  console.log(data);
  return crypto.createHash("sha256").update(data).digest("hex");
}

// const datas = sha256(
//   "data-to-hash-here-swiftrelay-flashrelay-locktheload-relayok"
// );
// console.log(datas);
