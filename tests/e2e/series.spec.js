const { test, expect } = require('../support')

const data = require('../support/fixtures/series.json')
const { executeSQL } = require('../support/database')
const { request } = require('http')

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM tvshows`)
})

test('deve pode cadastrar uma nova serie', async ({ page }) => {
    const serie = data.register

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)
    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
})

test('deve poder remover uma serie', async ({ page, request }) => {
    const serie = data.remove
    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.remove(serie.title)
    await page.popup.haveText('Série removida com sucesso.')

})

test('não deve pode cadastrar quando o titulo é duplicado', async ({ page, request }) => {
    const serie = data.duplicate
    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)
    await page.popup.haveText(
        `O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar quando os campos obrigatórios não são preechidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.series.goForm()
    await page.series.submit()

    await page.series.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
})

test('deve realizar busca pelo termo dead', async ({ page, request }) => {
    const series = data.search

    series.data.forEach(async (m) => {
        await request.api.postSerie(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.search(series.input)
    await page.series.tableHave(series.outputs)
})