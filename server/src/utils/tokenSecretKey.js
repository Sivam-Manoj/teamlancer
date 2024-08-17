import crypto from "crypto";

const secretKey = crypto.randomBytes(128).toString("base64");
console.log(secretKey);
