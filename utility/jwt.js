import jwt from "jsonwebtoken";
require("dotenv").config();

const generateToken = (id) => {
  const payload = { sub: id };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY || "", options);
};

export default generateToken;

// module.exports = generateToken;

// import jwt from "jsonwebtoken";

// export const generateToken = (id: string | number): string => {
//   const payload = { sub: id };

//   const options: jwt.SignOptions = {
//     expiresIn: "7d",
//   };

//   const secret = process.env.JWT_SECRET_KEY;
//   if (!secret) {
//     throw new Error("JWT_SECRET_KEY is not defined in environment variables");
//   }

//   return jwt.sign(payload, secret, options);
// };
