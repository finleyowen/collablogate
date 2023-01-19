const router = require('express').Router();

router.post('/blogs/create', function (req, res) {
    res.json({ success: true })
})

module.exports = router