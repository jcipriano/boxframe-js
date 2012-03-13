class Box.Core 
  
  ###
  constructor calls initialize
  ###
  constructor: (@data) ->
    console.log "Box.Core.constructor"
    this.initialize(this.constructor.__super__, @data)
    
  ###
  intialize to overridden by subclass
  ### 
  initialize: (superReference, data) ->
    this.init(this.constructor.__super__, @data)
  
  ###
  shortcut to initialize
  ###     
  init: (superReference, data) ->
  
  ###
  applies properties for extending 
  credit to spine.js
  ###
  @merge: (properties, classProperties) ->
    if(properties)
      for key, value of properties
        @::[key] = value
        properties.included?.apply(@)
        
    if(classProperties)
      for key, value of classProperties
        @[key] = value
        statics.extended?.apply(@)
    this