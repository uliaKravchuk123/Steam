
const Page = require('./google.page');

class ResultsPage extends Page{
    
    get searchQuantity() {
        return $('div#result-stats')
    }
    get searchResults() {
        return $$('//*[contains(@class,"LC20lb")]')
    }

    get secondResultsPage() {
        return $('//a[@aria-label="Page 2"]')
    }

    // let strRes = await $('div#result-stats').getText(); //Вынікаў каля 92 700 (0,48 с)
    //     let res = "";
    //     for (let symb of strRes) {
    //         if (symb == "(") break;
    //         if (symb >= 0 && symb <= 9 ) res += symb;
    //     }
    //     console.log("Количество результатов - " + res); 
    
    async resultsStatsQuotation () {
        let result = await this.searchQuantity.getText();
        return result;
    }

    async googleResults() {
        let stringResult = await this.resultsStatsQuotation();
        let regexp = /\ \d+/g;
        let quantityResult = stringResult.match(regexp).join('').replace(/ /g, '');
        return +quantityResult;
    }

    async relevantResults () {
        const results = await this.searchResults;
        let resultArray = [];
        for (let res of results) {
            let obj = await res.getHTML();
            let resHtml = "";
            for (let key in obj) {
                resHtml += obj[key];
            }
            resultArray.push(resHtml);
        }
        return resultArray;
    }

    async openSecondPage () {
        await this.secondResultsPage.click()
    }

    

}
module.exports = new ResultsPage()