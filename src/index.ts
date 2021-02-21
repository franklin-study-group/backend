import RedisClient from "ioredis"
import "dotenv/config"
import express, { json } from "express"
import mongoose from "mongoose"
import ConnectRedis from "connect-redis"
import session from "express-session"
import { masterRouter } from "./routes"
import { COOKIE_NAME, PRODUCTION } from "./constants"

const main = async () => {
  const RedisStore = ConnectRedis(session)
  const client = new RedisClient()

  const app = express()
  app.use(json())

  app.use(
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

  app.listen(4000, () => console.log("API started on http://localhost:4000"))
}

main()
