import { User, UserModel } from "@app/models/User"
import argon from "argon2"
import { Router } from "express"
import { AuthenticationBody, AuthenticationRespose, Field } from "./types"
import { sendAuthError } from "./utils"

const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body as AuthenticationBody

  const result = await UserModel.findOne({
    email
  })

  if (!result) {
    return sendAuthError(res, {
      field: Field.EMAIL,
      message: "Email not found."
    })
  }

  const successfulLogin = await argon.verify(result.password!, password)

  if (successfulLogin) {
    req.session.userId = result.id

    console.log(req.session.userId)

    return res.send({ user: result })
  }

  res.send({ user: null })
})

router.get("/me", async (req, res) => {
  const id = req.session.userId

  const result = await UserModel.findOne({
    _id: id
  })

  return result
})

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

  const createdUser = await UserModel.create({
    email,
    password: hashedPassword
  })

  req.session.userId = createdUser.id

  res.send({ successful: true } as AuthenticationRespose)
})

export const userRouter = router
