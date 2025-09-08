const { test, expect } = require('../support')


test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('não deve logar com a seha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'abc23')

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('ww.papito.com.br', 'abc23')
    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o email não é preechido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'abc23')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preechida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('adm@gmail.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText([
        'Campo obrigatório', 
        'Campo obrigatório'])
})