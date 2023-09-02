import * as crypto from "crypto";

export function generateRandomString(length: number) {
  const buffer = crypto.randomBytes(Math.ceil(length / 2));
  const randomString = buffer.toString("hex").slice(0, length);

  return randomString;
}
