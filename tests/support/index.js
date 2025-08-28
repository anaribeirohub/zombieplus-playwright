const { test: base, expect} = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPages')
const { LandingPage } = require('../pages/LandingPage')
const { MoviesPages } = require('../pages/MoviesPages')
const { Toast } = require('../pages/Componentes')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            login: new LoginPage(page),
            landing: new LandingPage(page),
            movies: new MoviesPages(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }