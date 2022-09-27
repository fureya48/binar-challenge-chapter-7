const router = require('express').Router()
const { loginPage, loginPageAdmin, loginAuthAdmin, indexRedirect, logOut, loginAuthPlayer } = require('../controller/authController')
const { checkNotAuthenticatePlayer, checkNotAuthenticateAdmin } = require('../middleware/checkAuthenticate')


router.get('/', indexRedirect)
router.get('/login', checkNotAuthenticatePlayer, loginPage)
router.get('/login/admin', checkNotAuthenticateAdmin, loginPageAdmin)
router.post('/login/admin', checkNotAuthenticateAdmin,loginAuthAdmin)
router.post('/login', loginAuthPlayer)
router.get('/logout', logOut)

module.exports = router