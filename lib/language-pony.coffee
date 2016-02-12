os = require 'os'
child_process = require 'child_process'
{CompositeDisposable} = require 'atom'
error_regexp = /(.*\.pony):(\d*):(\d*): (.*)/gmi

module.exports =

  activate: ->
    atom.workspace.observeTextEditors( (editor) ->
      editor.onDidSave( (event) ->
        p = child_process.exec('ponyc',["--pass","syntax"])
        p.stdout.on('data', (data) ->
          
          result = error_regexp.exec(data)

          if result
            [input,filename,line,character,error] = result
            console.log error
        )
      )
    )

  toggle: ->
    console.log 'Całuj mnie w dupe'
