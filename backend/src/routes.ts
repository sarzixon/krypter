import {Express} from "express";
import {handleLogIn} from "./api/LogIn/HandleLogIn";

export function setupRoutes(app: Express) {
    app.get('/', (req, res) => {
        res.send('Welcome to the Trading Platform API!');
    });

    app.post('/login', (req, res) => handleLogIn(req, res));
}