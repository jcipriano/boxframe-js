fs = require 'fs'

{print} = require 'util'
{exec, spawn} = require 'child_process'

sourceFiles = [
	'box',
	'box.core',
	'box.eventpublisher',
	'box.view',
	'box.router',
	'box.book'
	]

exerr  = (err, sout,  serr)->
  process.stdout.write err  if err
  process.stdout.write sout if sout
  process.stdout.write serr if serr

task 'build', 'join and compile *.coffee files', ->
	strFiles = ("src/#{file}.coffee" for file in sourceFiles).join ' '
	exec "coffee -j lib/box.js -c #{strFiles}", exerr