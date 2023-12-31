
const express = require('express');
const app = express();
const cookiesessionRoutes = require('./routes/cookie-session-test');

require('dotenv').config({ path: `${__dirname}/env/.env.development` });
const port = process.env.PORT;

//2.設定 middleware

//3.設定 Routes
app.use('/storage', cookiesessionRoutes);
// app.use("/test", testES6);

//4設定 view engine 使用 ejs ，則 render 時就能不寫副檔名
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Welcome My HomePage!!!");
});


app.get("/*", (req, res) => {
    return res.render("error");
})


app.listen(port, () => {
    console.log(`port ${port} Running ...`);
})