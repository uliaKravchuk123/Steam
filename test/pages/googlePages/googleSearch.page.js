
const Page = require('./google.page');

class SearchPage extends Page{
    get inputTextbox() {
        return $('input.gLFyf')
    }

    // await $('input.gLFyf').setValue('iTechArt');
    // await browser.keys('Enter');    //Enter
    // await expect(browser).toHaveTitleContaining('iTechArt');
    async googleFind(value) {
        await this.inputTextbox.setValue(value)
        await browser.keys('Enter')
        expect(browser).toHaveTitleContaining(value);
    }

}
module.exports = new SearchPage()