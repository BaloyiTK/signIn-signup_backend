import express from "express";
import userRouter from "./routes/userRouter.js";
import connectDB from "./database/db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

app.use("/", userRouter)

const PORT = process.env.PORT

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    });
  })
  .catch((error) => {
    console.error(error);
    console.log(error.message);
  });
