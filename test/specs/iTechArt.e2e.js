const SearchPage = require('../pages/googleSearch.page')
const ResultsPage = require('../pages/googleResults.page');
const { googleResults } = require('../pages/googleResults.page');


describe('First test', () => {
    it('1. Зайти на google.com ', async () => {
        await SearchPage.open();
    })

    it('2. Выполнить поиск по iTechArt ', async () => {
        await SearchPage.googleFind('iTechArt')
    })

    it('3. Вывести в консоль количество найденных результатов.', async () => {
        let numberResults = await ResultsPage.googleResults()
        console.log("Количество результатов - " + numberResults);
        const minQuantityResults = 10000;
        expect(numberResults).toBeGreaterThan(minQuantityResults)
    })

    it('4. Проверить что каждый из результатов на первой странице релевантен запросу', async () => {
        let searchRequest = ('iTechArt');
        let resultHtmlArray = await ResultsPage.relevantResults();
        let testResult = "All search results are relevent to the request";
        for (let resultHtml of resultHtmlArray) {
            if(!resultHtml.includes(searchRequest)) {
                console.log("Attention!!! At least one search result doesn't relevant to the request");
                console.log("Html with error - " + resultHtml);
                testResult = "At least one search result is NOT relevent to the request";
            }
        }
        expect(testResult).toBe("All search results are relevent to the request");
    })

    it('5. Открыть вторую страницу с результатами', async () => {
        await ResultsPage.openSecondPage();
        let resultsQuotation = await ResultsPage.resultsStatsQuotation();
        expect(resultsQuotation).toMatch(/старонка 2/);
    })

    it('6. Проверить что каждый из результатов на второй странице релевантен запросу', async () => {
        let searchRequest = ('iTechArt');
        let resultHtmlArray = await ResultsPage.relevantResults();
        let testResult = "All search results are relevent to the request";
        for (let resultHtml of resultHtmlArray) {
            if(!resultHtml.includes(searchRequest)) {
                console.log("Attention!!! At least one search result doesn't relevant to the request");
                console.log("Html with error - " + resultHtml);
                testResult = "At least one search result is NOT relevent to the request";
            }
        }
        expect(testResult).toBe("All search results are relevent to the request");
    })
})


//npx wdio run .\wdio.conf.js --spec .\test\specs\iTechArt.e2e.js
//npm test

