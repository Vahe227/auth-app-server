import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import insertData from './DataBase/Inserts/insertReagisterValues.js';
import checkLoginData from './DataBase/Actions/checkLoginData.js';
import insertToken from './DataBase/Inserts/insertToken.js';
import isUserLogined from './DataBase/Actions/checkIsUserLogined.js';
import checkTokenTime from './CheckersJS/checkTokenTime.js';

dotenv.config();

const port = process.env.PORT;
const ip = process.env.IP;
const server = express();
const secret = process.env.JWT_SECRET;

server.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

server.get('/', (req,res) => {
    res.status(200).send('<h1>Server Code is working!</h1>');
});

server.post('/isLogined', async (req,res) => {
    const { result } = req.body;
    const resultOfTokenTime = await checkTokenTime(jwt, secret, result, pool);
    if(resultOfTokenTime === 'notExictedTime') {
        const resultOfFunc = await isUserLogined(pool, result);
        if(resultOfFunc === 'DontExists') {
            return res.json({ state: 'UserDidntExists' });
        } else if (resultOfFunc === 'Exists') {
            return res.json({ state: 'UserAlredyExists' });
        };    
    } else if(resultOfTokenTime === 'ExictedTime') {
        return res.json({ state: 'UserDidntExists' });
    } else if(resultOfTokenTime === 'InvalidToken') {
        return res.json({ state: 'TokenIsInvalid'});
    };
});

server.post('/registerData', async (req,res) => {
    const objData = req.body;
    await insertData(pool, objData.usernameArg, objData.EmailArg, objData.PasswordArg);
});

server.post('/loginData', async (req,res) => {
    const dataForLogin = req.body;
    const username = dataForLogin.loginUsernameArg;
    const password = dataForLogin.loginPasswordArg;
    const result = await checkLoginData(pool, username, password);
    if(result === 'successfullyLogin') {
        const token = jwt.sign({ username }, secret, { expiresIn: '20' });
        await insertToken(pool, username, password, token);
        return res.json({ token: token, pageName: 'mainPage' });
    } else if(result === 'wrongLogin') {
        return res.json({ token: 'wrongLoginForToken', pageName: 'Login'});
    };
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server Running on http://${ip}:${port}`);
});