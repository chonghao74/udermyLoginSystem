import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import memberSchema from "../model/member-es6.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

mongoose.connect('mongodb://127.0.0.1:27017/school')
    .then(() => {
        console.log(".....");
    })
    .catch((e => {
        console.log("....." + e);
    })
    );
// const Account = mongoose.model("accounts", memberSchema, "accounts");
const Account = mongoose.model("Account", memberSchema);


router.get("/getData", async (req, res) => {
    const getData = await Account.find({}).exec().then(data => {
        return data;
    })
        .catch(e => {
            return e;
        });
    res.send(getData);
});

export default router;