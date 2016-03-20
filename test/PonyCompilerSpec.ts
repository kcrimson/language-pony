/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts"/>
import {PonyCompiler} from '../src/main';
import should = require('should')

describe('Calculator', () => {
    var subject : PonyCompiler;

    beforeEach(function () {
        subject = new PonyCompiler();
    });

    describe('#add', () => {
        it('return empty array', () => {
          var result = subject.exec()
          should(result).be.empty()
        });
    });
});
