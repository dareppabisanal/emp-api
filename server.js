import express from "express"
import cors from "cors"

const app = express();

app.get("/", (req, res) => {
    res.send("Hello employee management api");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});
