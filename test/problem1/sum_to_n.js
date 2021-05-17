import {expect} from "chakram";
import {sum_to_n_a, sum_to_n_b, sum_to_n_c} from '../../src/problem1/sum_to_n'

describe('Sum to n', () => {

    it('sum 1 to 10 should return 55', function () {
        return expect(sum_to_n_a(10)).to.be.equal(55)
    });

    it('sum 1 to 9 should return 45', function () {
        return expect(sum_to_n_a(9)).to.be.equal(45)
    });

    it('sum 1 to 10 should return 55', function () {
        return expect(sum_to_n_b(10)).to.be.equal(55)
    });

    it('sum 1 to 9 should return 45', function () {
        return expect(sum_to_n_b(9)).to.be.equal(45)
    });

    it('sum 1 to 10 should return 55', function () {
        return expect(sum_to_n_c(10)).to.be.equal(55)
    });

    it('sum 1 to 10 should return 55', function () {
        return expect(sum_to_n_c(9)).to.be.equal(45)

    });

});
