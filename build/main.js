"use strict";
/// <reference path="node.d.ts" />
var path = require('path');
var child_process = require('child_process');
var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi;
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
                    var result = error_regexp.exec(data);
                    console.log(result);
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
    return PonyCompiler;
}());
