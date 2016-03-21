"use strict";
/// <reference path="../typings/node/node.d.ts" />
var path = require('path');
var child_process = require('child_process');
function activate(state) {
    console.log("activating Pony plugin");
    atom.workspace.observeTextEditors(function (editor) {
        var grammar = editor.getGrammar().name;
        if (grammar == 'Pony') {
            console.log("got Pony file");
            editor.onDidSave(function (event) {
                var basedir = path.dirname(event.path);
                var options = { cwd: basedir };
                var process = child_process.execFile('ponyc', ["--pass", "syntax"], options);
                process.stdout.on('data', function (data) {
                    var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi;
                    console.log(error_regexp.exec(data));
                    console.log(error_regexp.exec(data));
                });
            });
        }
    });
    return true;
}
exports.activate = activate;
var PonyCompiler = (function () {
    function PonyCompiler() {
    }
    PonyCompiler.prototype.exec = function (basedir) {
        var options = {
            cwd: "/home/jarek/projects/opensource/language-pony" };
        var process = child_process.execFile('ponyc', ["--pass", "final"], options);
        var errors = [];
        process.stdout.on('data', function (data) {
            var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi;
            do {
                var result = error_regexp.exec(data);
                if (result) {
                    var input = result[0], filename = result[1], line = result[2], column = result[3], message = result[4];
                    console.log(message);
                    errors.push(new CompilerError(filename, parseInt(line), parseInt(column), message));
                }
                else {
                    break;
                }
            } while (true);
        });
        console.log(errors);
        return errors;
    };
    return PonyCompiler;
}());
exports.PonyCompiler = PonyCompiler;
var CompilerError = (function () {
    function CompilerError(file, line, column, message) {
        this.file = file;
        this.line = line;
        this.column = column;
        this.message = message;
    }
    return CompilerError;
}());
exports.CompilerError = CompilerError;
