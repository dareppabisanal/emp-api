import dotenv from "dotenv"
import connectDb from "./db/index.js";
import { server } from "./app.js";

dotenv.config({
    path: "./env"
})

connectDb()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is listening at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Error");
    console.log(error)
})