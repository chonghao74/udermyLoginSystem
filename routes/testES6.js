import express from 'express';
const router = express.Router();


router.get("/es6", (req, res) => {
    res.send('Success ES6');
});


// module.exports = router;
export default router;