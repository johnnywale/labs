import {XMLHttpRequest} from "xmlhttprequest"

function Pair(quote) {
    this.quote = quote;
    this.pair = quote.pair;
    this.mid = function () {
        return (quote.buy + quote.sell) / 2;
    }
    this.quote = function () {
        return quote.pair.substring(3);
    }
}

function Datasource() {
    this.getPrices = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://static.ngnrs.io/test/prices");
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let data = JSON.parse(xhr.responseText).data.prices;
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        res.push(new Pair(data[i]))
                    }
                    resolve(res);
                } else {
                    reject(xhr.statusText);
                }
            }
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        })

    }
}

module.exports = {Datasource}
