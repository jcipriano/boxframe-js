class Box.EventPublisher extends Box.Core
  ###
  events hash
  ###
  events = {}

  ###
  subscribe to an event
  ###
  subscribe: (event, listener) ->
    # add event to hash 
    unless events[event]
      events[event] = []
    # add listener to event
    events[event].push listener
    
  ###
  unsubscribe to an event
  ### 
  unsubscribe: (event, listener) ->
    # if there are events and event is subscribed to
    if events and events[event]
      # listeners array
      listeners = events[event]
      # remove listener
      index = listeners.indexOf(listener)
      listeners.splice index, 1
    
  ###
  publish an event
  ###
  publish: (event, data) ->
    # if there are events and event is subscribed to
    if events and events[event]
      # listeners array
      listeners = events[event]
      # call all listeners in array
      i = 0
      while i < listeners.length
        listener = listeners[i]
        listener(data)
        i++