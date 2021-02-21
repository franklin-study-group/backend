import { UserModel } from "@app/models/User"
import argon from "argon2"
import { Router } from "express"
import { AuthenticationBody, AuthenticationRespose, Field } from "./types"
import { sendAuthError } from "./utils"

const router = Router()

router.post("/login", () => {})

router.post("/", async (req, res) => {
  const { email, password } = req.body as AuthenticationBody

  const result = await UserModel.findOne({
    email
  })

  if (result) {
    return sendAuthError(res, {
      field: Field.EMAIL,
      message: "Email is already registered."
    })
  }

  const hashedPassword = await argon.hash(password)

  UserModel.create({
    email,
    password: hashedPassword
  })

  res.send({ successful: true } as AuthenticationRespose)
})

export const userRouter = router
