/// <reference path="../typings/node/node.d.ts" />
declare var atom;


import Promise from "ts-promise";
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

  exec(basedir : string) : Array<CompilerError>{
    var options : child_process.ExecOptions = {
      cwd : "/home/jarek/projects/opensource/language-pony"}
    var process = child_process.execFile('ponyc',["--pass","final"],options)
    var errors:Array<CompilerError> = []

    process.stdout.on('data', (data) => {
      var error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi
      do{
        var result = error_regexp.exec(data)
        if(result){
          var [input,filename,line,column,message] = result
          console.log(message)
          errors.push(new CompilerError(filename,parseInt(line),parseInt(column),message))
        } else{
          break
        }
      } while(true)
    })

    console.log(errors)
    return errors;
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
