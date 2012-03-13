(function() {
  var Box, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Box = Box = {};

  Box.extend = function(properties, classProperties) {
    var SubClass;
    SubClass = (function(_super) {

      __extends(SubClass, _super);

      function SubClass() {
        SubClass.__super__.constructor.apply(this, arguments);
      }

      return SubClass;

    })(this);
    SubClass.merge(properties, statics);
    return SubClass;
  };

  Box.Core = (function() {
    /*
      constructor calls initialize
    */
    function Core(data) {
      this.data = data;
      console.log("Box.Core.constructor");
      this.initialize(this.constructor.__super__, this.data);
    }

    /*
      intialize to overridden by subclass
    */

    Core.prototype.initialize = function(superReference, data) {
      return this.init(this.constructor.__super__, this.data);
    };

    /*
      shortcut to initialize
    */

    Core.prototype.init = function(superReference, data) {};

    /*
      applies properties for extending 
      credit to spine.js
    */

    Core.merge = function(properties, classProperties) {
      var key, value, _ref, _ref2;
      if (properties) {
        for (key in properties) {
          value = properties[key];
          this.prototype[key] = value;
          if ((_ref = properties.included) != null) _ref.apply(this);
        }
      }
      if (classProperties) {
        for (key in classProperties) {
          value = classProperties[key];
          this[key] = value;
          if ((_ref2 = statics.extended) != null) _ref2.apply(this);
        }
      }
      return this;
    };

    return Core;

  })();

  Box.EventPublisher = (function(_super) {
    var events;

    __extends(EventPublisher, _super);

    function EventPublisher() {
      EventPublisher.__super__.constructor.apply(this, arguments);
    }

    /*
      events hash
    */

    events = {};

    /*
      subscribe to an event
    */

    EventPublisher.prototype.subscribe = function(event, listener) {
      if (!events[event]) events[event] = [];
      return events[event].push(listener);
    };

    /*
      unsubscribe to an event
    */

    EventPublisher.prototype.unsubscribe = function(event, listener) {
      var index, listeners;
      if (events && events[event]) {
        listeners = events[event];
        index = listeners.indexOf(listener);
        return listeners.splice(index, 1);
      }
    };

    /*
      publish an event
    */

    EventPublisher.prototype.publish = function(event, data) {
      var i, listener, listeners, _results;
      if (events && events[event]) {
        listeners = events[event];
        i = 0;
        _results = [];
        while (i < listeners.length) {
          listener = listeners[i];
          listener(data);
          _results.push(i++);
        }
        return _results;
      }
    };

    return EventPublisher;

  })(Box.Core);

  Box.View = (function(_super) {

    __extends(View, _super);

    function View() {
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.renderTemplate = function(id, data) {};

    View.prototype.renderTemplateFromString = function(html, data) {};

    return View;

  })(Box.EventPublisher);

  Box.Router = (function(_super) {

    __extends(Router, _super);

    Router._isIE = false;

    Router._isIE7 = false;

    Router._isHashChangeSupported = false;

    Router._iframe = void 0;

    Router._iframeInterval = void 0;

    Router._location = void 0;

    Router.currentHash = '';

    /*
      constructor calls initialize
    */

    function Router(data) {
      var docMode, that;
      this.data = data;
      Router.__super__.constructor.call(this, this.data);
      console.log("Box.Router.constructor");
      docMode = document.documentMode;
      this._isIE = /msie [\w.]+/;
      this._isHashChangeSupported = (__indexOf.call(window, 'onhashchange') >= 0);
      this._isIE7 = this._isIE && !this._isHashChangeSupported;
      this._iframe = document.createElement('iframe');
      this._iframe.src = 'about:blank';
      document.body.appendChild(this._iframe);
      this._location = window.location;
      that = this;
      this._iframeInterval = setInterval((function() {
        return that._checkForHashChange();
      }), 50);
      this.currentHash = '';
      this._checkForHashChange();
    }

    /*
      initialize
    */

    Router.prototype.initialize = function(superRef) {
      return this.superRef = superRef;
    };

    /*
      checks for new hash
    */

    Router.prototype._checkForHashChange = function() {
      var hash, iframeHash;
      hash = this.getHash();
      iframeHash = this.getIframeHash();
      if (iframeHash !== this.currentHash && iframeHash !== hash) {
        return this.setHash(iframeHash);
      } else if (hash !== iframeHash) {
        return this.setIframeHash(hash);
      }
    };

    /*
      sets hash
    */

    Router.prototype.setHash = function(hash) {
      this.currentHash = hash;
      return location.hash = '#' + hash;
    };

    /*
      set hash in iframe
    */

    Router.prototype.setIframeHash = function(hash) {
      this.currentHash = hash;
      return this.setIframeContent(hash);
    };

    /*
      sets content of iframe
    */

    Router.prototype.setIframeContent = function(hash) {
      var iframeDoc;
      iframeDoc = this._iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write("<html><head><title>" + hash + "</title><script type='text/javascript'>var hash='" + hash + "';</script></head><body>hash: " + hash + "</body></html>");
      return iframeDoc.close();
    };

    /*
      parses hash from url
    */

    Router.prototype.getHash = function() {
      var hash, match;
      match = this._location.href.match(/#(.*)$/);
      hash = match ? match[1] : '';
      if (hash) {
        return hash;
      } else {
        return '';
      }
    };

    /*
      get hash from the iframe
    */

    Router.prototype.getIframeHash = function() {
      if (this._iframe.contentWindow.hash) {
        return this._iframe.contentWindow.hash;
      } else {
        return '';
      }
    };

    return Router;

  })(Box.EventPublisher);

  Box.Book = (function(_super) {

    __extends(Book, _super);

    function Book() {
      Book.__super__.constructor.apply(this, arguments);
    }

    return Book;

  })(Box.View);

}).call(this);
