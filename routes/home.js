const { Router } = require("express");
const router = Router();




router.get("/", (req, res) => {
    res.render("../views/pages/home")
})

module.exports = router