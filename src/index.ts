import cors from "cors"
import ConnectRedis from "connect-redis"
import "dotenv/config"
import express, { json } from "express"
import session from "express-session"
import RedisClient from "ioredis"
import "module-alias/register"
import mongoose from "mongoose"
import { COOKIE_NAME, PRODUCTION } from "./constants"
import { masterRouter } from "./routes"
import { emailRouter } from "./routes"

const main = async () => {
  const RedisStore = ConnectRedis(session)
  const client = new RedisClient(process.env.REDIS_URL)

  const app = express()
  app.use(json())

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN
    }),
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client,
        disableTouch: true
      }),
      cookie: {
        maxAge: 157680000000,
        httpOnly: true,
        sameSite: "lax",
        secure: PRODUCTION,
        domain: undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  await mongoose.connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  app.use("/api", masterRouter)
  app.use("/api", emailRouter)

  app.listen(4000, () => console.log("API started on http://localhost:4000"))
}

main()
