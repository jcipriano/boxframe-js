class Box.Router extends Box.EventPublisher
  @_isIE: false
  @_isIE7: false
  @_isHashChangeSupported: false
  
  @_iframe: undefined
  @_iframeInterval: undefined
  
  @_location: undefined
  @currentHash: ''
  
  ###
  constructor calls initialize
  ###
  constructor: (@data) ->
    super @data
    console.log "Box.Router.constructor"
    docMode = document.documentMode
    
    # browser detection
    @_isIE = /msie [\w.]+/
    @_isHashChangeSupported = ('onhashchange' in window)
    @_isIE7 = this._isIE and not this._isHashChangeSupported
    
    # create iframe
    @_iframe = document.createElement 'iframe'
    @_iframe.src = 'about:blank'
    #this._iframe.style.display = 'none'
    document.body.appendChild this._iframe
    
    @_location = window.location
    
    # start interval to check iframe source
    that = this
    @_iframeInterval = setInterval (->
      that._checkForHashChange()
    ), 50
    
    @currentHash = ''
    
    this._checkForHashChange()
  
  ###
  initialize
  ###
  initialize: (superRef) ->
    @superRef = superRef
    
  ###
  checks for new hash
  ###
  _checkForHashChange: ->
    hash = @getHash()
    iframeHash = @getIframeHash()
    
    # first check if hash has changed in iframe
    if iframeHash isnt @currentHash and iframeHash isnt hash
      @setHash iframeHash
    # check if hash changed in location bar
    else if hash isnt iframeHash
      @setIframeHash hash
      

  ###
  sets hash
  ###  
  setHash: (hash) ->
    @currentHash = hash
    location.hash = '#' + hash

  ###
  set hash in iframe
  ###  
  setIframeHash: (hash) ->
    @currentHash = hash
    @setIframeContent hash
    
  ###
  sets content of iframe
  ###
  setIframeContent: (hash) ->
    iframeDoc = @_iframe.contentWindow.document
    iframeDoc.open()
    iframeDoc.write "<html><head><title>#{hash}</title><script type='text/javascript'>var hash='#{hash}';</script></head><body>hash: #{hash}</body></html>"
    iframeDoc.close()

  ###
  parses hash from url
  ###
  getHash: -> 
    match = @_location.href.match /#(.*)$/
    hash = if match then match[1] else ''
    return if hash then hash else ''
    
  ###
  get hash from the iframe
  ###
  getIframeHash: ->
    return if @_iframe.contentWindow.hash then @_iframe.contentWindow.hash else ''
  