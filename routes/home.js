const { Router } = require("express");
const router = Router();




router.get("/", (req, res) => {
    res.render("../views/pages/home")
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.render("../views/pages/movie", {id})
})

module.exports = router