const { addressFormatter } = require('../../utils/util');

describe('Address Formatter', () => {
    it('Address Formatter should take a given address and format it to the appropriate string', () => {
        const testAddress = '11592 Celine St. El Monte CA 91732';
        expect(addressFormatter(testAddress)).toBe('11592-celine-st-el-monte-ca-91732');
    })
});