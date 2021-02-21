import express from "express"
import { masterRouter } from "./routes"

const main = () => {
  const app = express()

  app.use("/api", masterRouter)

  app.listen(4000, () => console.log("API started on http://localhost:4000"))
}

main()
