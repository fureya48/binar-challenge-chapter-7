const router = require('express').Router()
const { loginPage, loginAuth, indexRedirect, logOut } = require('../controller/authController')
const { checkNotAuthenticate } = require('../controller/checkAuthenticate')

router.get('/', indexRedirect)
router.get('/login', checkNotAuthenticate,loginPage)
router.post('/login', checkNotAuthenticate,loginAuth)
router.get('/logout', logOut)

module.exports = router