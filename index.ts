import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';
import session from 'express-session';
import { UserResponse } from './src/models/User';
import { loginUserJson } from './src/usecases/loginUserJson';
import { UserJsonRepo } from './src/repos/UserJsonRepo';
import cookieParser from 'cookie-parser';

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(session({
    secret: 'yourSecretKey', //TODO: move this to env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use((req, res, next) => {
    if (!req.session.user && req.cookies.rememberMe) {
        const user = req.cookies.rememberMe;
        const userRepo = new UserJsonRepo();

        loginUserJson(userRepo, user).then(user => {
            if (user) {
                req.session.user = user;
            }
            next();
        }).catch(error => {
            console.error('Error logging in with cookie', error);
            next();
        });
    } else {
        next();
    }
});

app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

declare module "express-session" {
    interface SessionData {
        user: UserResponse;
    }
}
