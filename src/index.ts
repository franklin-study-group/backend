import "dotenv/config"
import express, { json } from "express"
import mongoose from "mongoose"
import { masterRouter } from "./routes"

const main = async () => {
  const app = express()
  app.use(json())

  await mongoose.connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  app.use("/api", masterRouter)

  app.listen(4000, () => console.log("API started on http://localhost:4000"))
}

main()
