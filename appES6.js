import express from 'express';
import routerES6 from './routes/testES6.js';
import routerMember from './routes/member-routes-es6.js';
const app = express();


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