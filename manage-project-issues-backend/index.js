import express from "express";
import * as routers from "./routes.js"
import cors from "cors";

const app = express();
 
app.use(express.json());

app.use(cors());

app.use(routers.app)

app.use((error, request, response) => {
    if (error) {
        response.status(500).json({
            message: "page not found",
        })
    }
})
 
// Server setup
app.listen(4000, () => {
    console.log("Server is Running");
})