import { Router } from "express"
import { userRouter } from "./users"
import { mailerRouter } from "./mailer"

const router = Router()

router.use("/users", userRouter)
router.use("/mailer", mailerRouter)

export const masterRouter = router
export const emailRouter = router;
