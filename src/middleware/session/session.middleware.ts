import sessionModel from "../../models/session.model";

export const createSession = async (userId: string) => {
  const session = await sessionModel.create({ user: userId });

  return session.toJSON();
};
