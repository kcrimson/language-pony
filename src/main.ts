/// <reference path="../typings/node/node.d.ts" />
declare var atom;

import Promise from "ts-promise";
import path = require('path')
import os = require('os')
import child_process = require('child_process')

export function activate(state) {
    console.log("activating Pony plugin")

    var ponyCompiler = new PonyCompiler()

    atom.workspace.observeTextEditors( (editor) => {
      var grammar = editor.getGrammar().name;
      if(grammar=='Pony'){
        console.log("got Pony file")
        editor.onDidSave((event : {path:string}) => {
          var basedir = path.dirname(event.path)
          ponyCompiler.exec(basedir).then( (errors) =>{
            console.log(errors)
          })
        });
      }
    })
}

export class PonyCompiler{

  exec(basedir : string) : Promise<Array<CompilerError>>{
    var options : child_process.ExecOptions = {cwd : basedir}
    var process = child_process.execFile('ponyc',["--pass","final"],options)

    var defer = Promise.defer<Array<CompilerError>>()

    process.stdout.on('data', (data) => {
      var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi
      var errors:Array<CompilerError> = []
      var result;
      while(result = error_regexp.exec(data)){
        var [input,filename,line,column,message] = result
        errors.push(new CompilerError(filename,parseInt(line),parseInt(column),message))
      }
      defer.resolve(errors)
    })

    return defer.promise;
  }
}

export class CompilerError{
  file : string
  line : number
  column: number
  message : string
  constructor(file : string, line : number, column : number, message : string){
    this.file  = file
    this.line = line
    this.column = column
    this.message = message
  }
}
