import express from 'express';
import routerES6 from './routes/testES6.js';
import routerMember from './routes/member-routes-es6.js';
import dotenv from 'dotenv'; 


const app = express();
const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;
dotenv.config({ path: `${__dirname}env/.env.development` });
console.log(`Port:${process.env.PORT}`);

app.use("/test", routerES6);
app.use("/auth", routerMember);


app.get("/", (req, res) => {
    return res.send("Home");
});

app.get("/*", (req, res) => {
    return res.send("Non Page");
});


app.listen(1111, () => {
    console.log("Port 1111 Starting...");
});