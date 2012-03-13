
root = exports ? this

root.Box = Box = {}

Box.extend = (properties, classProperties) ->
  # create a new view
  class SubClass extends this
  SubClass.merge(properties, statics)
  SubClass