const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

const encrypt = (token: string): string => {
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(process.env.REACT_APP_KEY || ""),
    process.env.REACT_APP_IV
  );
  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
  console.log("encrypt");
  return encrypted.toString("hex");
};

const decrypt = (encryptedToken: string): string => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(process.env.REACT_APP_KEY || ""),
    Buffer.from(process.env.REACT_APP_IV)
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedToken, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
};

export const saveJwt = async (token: string) => {
  const encryptedToken = encrypt(token);
  await fs.writeFile(
    os.homedir() + "/" + process.env.REACT_APP_PATH + "/test.enc",
    encryptedToken,
    (err: any) => {
      if (err) console.log(err);
      else console.log("File saved!");
    }
  );
};

export const getJwt = () => {
  if (
    !fs.existsSync(
      os.homedir() + "/" + process.env.REACT_APP_PATH + "/test.enc"
    )
  )
    return "";
  else {
    const data = fs.readFileSync(
      os.homedir() + "/" + process.env.REACT_APP_PATH + "/test.enc",
      "utf8"
    );
    if (!data) {
      return "";
    }
    const token = decrypt(data);
    // fs.unlinkSync("./test.enc");
    return token;
  }
};
