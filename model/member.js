const mongoose = require('mongoose');
const { Schema } = mongoose; //destroction mongose 中有 Schema 參數的物件

const memberSchena = new Schema({
    account: {
        type: String,
        maxLength: [100, "Too Long"],
        maxLength: [100, "Too Long"],
        require: [true, 'Why no account?']
    },
    password: {
        type: String,
        minlength: 30,
        required: [true, 'Why no password?']
    }
});

module.exports.memberSchena = memberSchena;