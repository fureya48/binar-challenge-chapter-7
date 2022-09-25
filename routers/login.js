const router = require('express').Router()
const { loginPage, loginPageAdmin, loginAuth, loginAuthAdmin, indexRedirect, logOut } = require('../controller/authController')
const { checkNotAuthenticatePlayer, checkNotAuthenticateAdmin } = require('../middleware/checkAuthenticate')

router.get('/', indexRedirect)
router.get('/login', checkNotAuthenticatePlayer, loginPage)
router.post('/login', checkNotAuthenticatePlayer,loginAuth)
router.get('/login/admin', checkNotAuthenticateAdmin, loginPageAdmin)
router.post('/login/admin', checkNotAuthenticateAdmin,loginAuthAdmin)
router.get('/logout', logOut)

module.exports = router