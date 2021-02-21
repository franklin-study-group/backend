import { Router } from "express"

const router = Router()

interface AuthenticationBody {
  email: string
  password: string
}

router.post("/login", () => {})

router.post("/register", (req, res) => {
  const { email, password } = req.body as AuthenticationBody
})

export const userRouter = router
