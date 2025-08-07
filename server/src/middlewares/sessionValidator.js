import { sessionSchema } from "../schemaValidation.js";

export const sessionValidator = (req, res, next) => {
  const session = parseInt(req.headers.session);
  const { error } = sessionSchema.validate({ session });
  if (error) throw { statusCode: 404, message: `session is expired: ${error}` };
  req.session = session;
  return next();
};
