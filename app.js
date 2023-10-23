const express = require('express');
const fs = require('fs');
const url = require('url');

//執行express 函示-一般做法
const app = express();

//import routes
const memberRoutes = require('./routes/member-routes');

//cors
const cors = require('cors');

//middleware
//1.設定 content-type
app.use(express.json());
app.use(express.static("public"));//css, js and other folder position

//2.default middleware
app.use((req, res, next) => {
    console.log("I am middleware all!!!");

    // 可以寫判斷式來預處理
    // 如果都符合才執行 next 執行所要的 routes
    if (true) {
        next();
    }
    else {
        res.redirect("https://google.com");
    }
});

//3.設定 Routes
app.use('/api/membres', memberRoutes);

//4設定 view engine 使用 ejs ，則 render 時就能不寫副檔名
app.set("view engine", "ejs");

app.get("/*", (req, res) => {
    return res.render("error");
});


app.listen(3002, () => {
    console.log("port 3002 is Running ...");
})