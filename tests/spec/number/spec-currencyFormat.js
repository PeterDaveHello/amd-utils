define(['src/number/currencyFormat'], function (currencyFormat) {

    //backup defaults
    var _nDecimalDigits = currencyFormat.nDecimalDigits,
        _decimalSeparator = currencyFormat.decimalSeparator,
        _thousandsSeparator = currencyFormat.thousandsSeparator;

    describe('number/currencyFormat()', function () {

        beforeEach(function(){
            currencyFormat.nDecimalDigits = _nDecimalDigits;
            currencyFormat.decimalSeparator = _decimalSeparator;
            currencyFormat.thousandsSeparator = _thousandsSeparator;
        });

        it('should format numbers into a currency-like format', function () {
            expect( currencyFormat(0) ).toEqual( '0.00' );
            expect( currencyFormat(1) ).toEqual( '1.00' );
            expect( currencyFormat(999) ).toEqual( '999.00' );
            expect( currencyFormat(1000) ).toEqual( '1,000.00' );
            expect( currencyFormat(1000000) ).toEqual( '1,000,000.00' );
        });

        it('should handle negative numbers', function () {
            expect( currencyFormat(-10) ).toEqual( '-10.00' );
            expect( currencyFormat(-1000) ).toEqual( '-1,000.00' );
            expect( currencyFormat(-100000) ).toEqual( '-100,000.00' );
        });

        it('should allow custom separators', function () {
            expect( currencyFormat(0, 2, ',', '.') ).toEqual( '0,00' );
            expect( currencyFormat(1, 2, ',', '.') ).toEqual( '1,00' );
            expect( currencyFormat(999, 2, ',', '.') ).toEqual( '999,00' );
            expect( currencyFormat(1000, 2, ',', '.') ).toEqual( '1.000,00' );
            expect( currencyFormat(1000000, 2, ',', '.') ).toEqual( '1.000.000,00' );
        });

        it('should allow custom number of decimal digits', function () {
            expect( currencyFormat(1, 4) ).toEqual( '1.0000' );
            expect( currencyFormat(999, 4) ).toEqual( '999.0000' );
            expect( currencyFormat(1000, 4) ).toEqual( '1,000.0000' );

            expect( currencyFormat(1, 0) ).toEqual( '1' );
            expect( currencyFormat(999, 0) ).toEqual( '999' );
            expect( currencyFormat(1000, 0) ).toEqual( '1,000' );
        });

        it('should allow setting the default values', function () {
            currencyFormat.nDecimalDigits = 1;
            currencyFormat.decimalSeparator = ',';
            currencyFormat.thousandsSeparator = '.';

            expect( currencyFormat(1) ).toEqual( '1,0' );
            expect( currencyFormat(999) ).toEqual( '999,0' );
            expect( currencyFormat(1000) ).toEqual( '1.000,0' );
        });

    });

});
