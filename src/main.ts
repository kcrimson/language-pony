/// <reference path="../typings/node/node.d.ts" />
declare var atom;

import path = require('path')
import os = require('os')
import child_process = require('child_process')

export function activate(state) {
    console.log("activating Pony plugin")
    atom.workspace.observeTextEditors( (editor) => {
      var grammar = editor.getGrammar().name;
      if(grammar=='Pony'){
        console.log("got Pony file")
        editor.onDidSave((event : {path:string}) => {
          var basedir = path.dirname(event.path)
          var options : child_process.ExecOptions = {cwd : basedir}
          var process = child_process.execFile('ponyc',["--pass","syntax"],options)
          process.stdout.on('data', (data) => {
            var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi
            console.log( error_regexp.exec(data) )
            console.log(error_regexp.exec(data))
          })
        });
      }
    })
    return true
}

export class PonyCompiler{

  exec(basedir : string){
    var options : child_process.ExecOptions = {
      cwd : "/home/jarek/projects/opensource/language-pony"}
    var process = child_process.execFile('ponyc',["--pass","final"],options)
    process.stdout.on('data', (data) => {
      var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi
      var result
      do{
        result = error_regexp.exec(data)
        console.log(result)
      } while(result)
    })

    return [];
  }
}

export class CompilerError{
  file : string
  line : number
  colum: number
  message : string
}
