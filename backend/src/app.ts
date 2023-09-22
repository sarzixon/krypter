import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {AuthRouter} from "./routers/AuthRouter";
import {UserRouter} from "./routers/UserRouter";
import express, {Express} from "express";

const app: Express = express();

app.use(cors({
    credentials: true,
    origin: true, //'http://localhost:5137',
    exposedHeaders: ["set-cookie"]
}));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET || '03259f2125d922b4724075d7eab22253'));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => res.send('basic stuff bro'))
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);

export default app;