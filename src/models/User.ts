import { getModelForClass, prop } from "@typegoose/typegoose"

export class UserModel {
  @prop()
  public name?: string
}

export const User = getModelForClass(UserModel)
