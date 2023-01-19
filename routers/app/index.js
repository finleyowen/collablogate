const router = require('express').Router();

router.get('/', function (req, res) {
    if (req.user) {
        var { username } = req.user
        res.redirect(`/dash~${username}`)
    } else {
        res.render('index')
    }
});

router.get('/dash~:username', function (req, res) {
    var { username, name } = req.user
    if (username == req.params.username) {
        res.render('app/dash', { username, name })
    } 
})

router.get('/blogs/new-blog', function (req, res) {
    var { username } = req.user
}) 

module.exports = router