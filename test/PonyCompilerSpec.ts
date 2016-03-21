/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/should/should.d.ts"/>
import {PonyCompiler} from '../src/main';
import should = require('should')

describe('PonyCompiler', () => {
    var subject : PonyCompiler;

    beforeEach(function () {
        subject = new PonyCompiler();
    });

    describe('#exec', () => {
        it('return compilation errors', (done) => {
          subject.exec("fixtures/syntax_error").then( (data) => {
            console.log(data)
            data.should.be.instanceof(Array).and.have.lengthOf(3)
            done()
          })
        });
    });
});
