import Sum from './sum'

describe ('Sum', () => {
    it('sum of two numbers', () => {
        expect(Sum(4, 5)).toBe(9);
    })
})

