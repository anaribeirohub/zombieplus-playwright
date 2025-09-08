const { expect } = require('@playwright/test')

export class Movies {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(movie) {

        await this.goForm()

        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__indicator').first()
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').first()
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click()

        const path = require('path'); // Importa módulo para trabalhar com caminhos de arquivos
        const coverPath = path.resolve('tests', 'support', 'fixtures', movie.cover); // Monta caminho absoluto do arquivo da capa
        await this.page.locator('input[name=cover]').setInputFiles(coverPath); // Faz upload do arquivo no input de capa da página

        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }


        await this.submit(); // Envia o formulário
    }

    async search(target){
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)
        await this.page.click('.actions button')
    }

    async tableHave(content){
        
    const rows = this.page.getByRole('row')
    await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
    
}