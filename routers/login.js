const router = require('express').Router()
const { loginPage, loginAuth, indexRedirect } = require('../controller/loginController')

router.get('/', indexRedirect)
router.get('/login', loginPage)
router.post('/login', loginAuth)

module.exports = router