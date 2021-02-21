import { prop, Typegoose } from "@hasezoey/typegoose"

export class User extends Typegoose {
  @prop()
  email?: string

  @prop()
  password?: string
}

export const UserModel = new User().setModelForClass(User, {
  schemaOptions: { collection: "users" }
})
