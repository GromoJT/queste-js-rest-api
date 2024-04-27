import express,{Express} from "express";
import helmet from "helmet";
import cors from 'cors';
import router from "./index"
const serverless = require("serverless-http")

const app:Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json({limit:"100mb"}));


app.use('/',router)

app.listen(port,()=>{
    console.log(`Server has started on port: ${port}`)
})

module.exports.handler = serverless(app)
