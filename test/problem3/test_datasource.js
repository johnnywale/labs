import {Datasource} from "../../src/problem3/datasource";

describe('Datasoure', () => {
    it('should get price', function () {
        let ds = new Datasource();
        return ds.getPrices()
            .then(prices => {
                prices.forEach(price => {
                    console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
                });
            }).catch(error => {
                console.error(error);
            });
    });
});


