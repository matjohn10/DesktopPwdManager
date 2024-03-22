const fs = require("fs");
const os = require("os");

export const saveJwt = async (token: string) => {
  await fs.writeFile("./test.txt", token, (err: any) => {
    if (err) console.log(err);
    else console.log("File saved!");
  });
};

export const getJwt = () => {
  const data = fs.readFileSync("./test.txt", "utf8");
  return data;
};
