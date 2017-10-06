(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/coffee/app.coffee":[function(require,module,exports){
var KS, myScript, vendor;

KS = require('../../lib-core/coffee/app');

myScript = require('./myscript');

vendor = require('./vendor/index');

document.addEventListener('DOMContentLoaded', function() {
  return myScript();
});



},{"../../lib-core/coffee/app":"/Users/adam/sites/kickstart/lib-core/coffee/app.coffee","./myscript":"/Users/adam/sites/kickstart/lib/coffee/myscript.coffee","./vendor/index":"/Users/adam/sites/kickstart/lib/coffee/vendor/index.coffee"}],"/Users/adam/sites/kickstart/lib-core/coffee/app.coffee":[function(require,module,exports){
var Buffer, Buttons, Debounce, Dropdown, Growl, Icons, KS, Modal, Navbar, Status, Tabs, Throttler;

KS = require('./ks');

Modal = require('./modal');

Navbar = require('./navbar');

Debounce = require('./debouncer');

Icons = require('./icons');

Status = require('./status');

Tabs = require('./tabs');

Throttler = require('./throttler');

Buttons = require('./buttons');

Buffer = require('./buffer');

Growl = require('./growl');

Dropdown = require('./dropdown');

k$.ready = function() {
  var $navbar, $tabSet, i, j, len, len1, ref, ref1, results;
  k$.icons();
  k$.button();
  k$.dropdown();
  ref = k$.$$('[data-ks-navbar]');
  for (i = 0, len = ref.length; i < len; i++) {
    $navbar = ref[i];
    k$.nav($navbar);
  }
  ref1 = k$.$$('[data-ks-tabs]');
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    $tabSet = ref1[j];
    results.push(k$.tabs($tabSet));
  }
  return results;
};

document.addEventListener('DOMContentLoaded', function() {
  return k$.ready();
});



},{"./buffer":"/Users/adam/sites/kickstart/lib-core/coffee/buffer.coffee","./buttons":"/Users/adam/sites/kickstart/lib-core/coffee/buttons.coffee","./debouncer":"/Users/adam/sites/kickstart/lib-core/coffee/debouncer.coffee","./dropdown":"/Users/adam/sites/kickstart/lib-core/coffee/dropdown.coffee","./growl":"/Users/adam/sites/kickstart/lib-core/coffee/growl.coffee","./icons":"/Users/adam/sites/kickstart/lib-core/coffee/icons.coffee","./ks":"/Users/adam/sites/kickstart/lib-core/coffee/ks.coffee","./modal":"/Users/adam/sites/kickstart/lib-core/coffee/modal.coffee","./navbar":"/Users/adam/sites/kickstart/lib-core/coffee/navbar.coffee","./status":"/Users/adam/sites/kickstart/lib-core/coffee/status.coffee","./tabs":"/Users/adam/sites/kickstart/lib-core/coffee/tabs.coffee","./throttler":"/Users/adam/sites/kickstart/lib-core/coffee/throttler.coffee"}],"/Users/adam/sites/kickstart/lib-core/coffee/buffer.coffee":[function(require,module,exports){
var buffer;

buffer = function(fn, delay) {
  var i;
  k$.bufferArray = k$.bufferArray || new Array();
  if (!k$.bufferArray.length) {
    k$.bufferArray = new Array();
    delay = delay || 500;
    i = 1;
    k$.bufferInterval = setInterval(function() {
      if (k$.bufferArray[i]) {
        k$.bufferArray[i]();
      }
      i++;
      if (i >= k$.bufferArray.length) {
        clearInterval(k$.bufferInterval);
        k$.bufferArray = void 0;
        return i = 1;
      }
    }, delay);
  }
  k$.bufferArray.push(fn);
  if (k$.bufferArray.length === 1) {
    k$.bufferArray[0]();
  }
  return console.info("Function queued (" + k$.bufferArray.length + " in queue)");
};

k$.buffer = buffer;

module.exports = buffer;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/buttons.coffee":[function(require,module,exports){
var button;

button = function() {
  var $button, $buttonDropdown, i, j, len, len1, ref, ref1, results;
  ref = k$.$$("button");
  for (i = 0, len = ref.length; i < len; i++) {
    $button = ref[i];
    if ($button.querySelectorAll('ul').length) {
      $button.classList.add('menu-item');
    }
  }
  ref1 = k$.$$('.button-dropdown');
  results = [];
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    $buttonDropdown = ref1[j];
    results.push($buttonDropdown.parentNode.classList.add('menu-item'));
  }
  return results;
};

k$.button = button;

module.exports = button;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/debouncer.coffee":[function(require,module,exports){
var debounce;

debounce = function(fn, id, delay, args, that) {
  delay = delay || 1000;
  that = that || this;
  args = args || new Array;
  if (typeof k$.debounceQueue[id] !== "object") {
    k$.debounceQueue[id] = new Object();
  }
  if (typeof k$.debounceQueue[id].debounceTimer !== "undefined") {
    clearTimeout(k$.debounceQueue[id].debounceTimer);
  }
  return k$.debounceQueue[id] = {
    fn: fn,
    id: id,
    delay: delay,
    args: args,
    debounceTimer: setTimeout(function() {
      k$.debounceQueue[id].fn.apply(that, k$.debounceQueue[id].args);
      return k$.debounceQueue[id] = void 0;
    }, delay)
  };
};

k$.debounce = debounce;

module.exports = debounce;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/dropdown.coffee":[function(require,module,exports){
var dropdown;

dropdown = function() {
  return document.body.addEventListener('click', function(e) {
    var $menuItem, closeAllMenus, openMenu;
    $menuItem = null;
    closeAllMenus = function() {
      var _$menuItem, i, len, ref, results;
      ref = k$.$$('.menu-item');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        _$menuItem = ref[i];
        results.push(_$menuItem.classList.remove('open'));
      }
      return results;
    };
    openMenu = function() {
      if ($menuItem.classList.contains('open')) {
        $menuItem.classList.remove('open');
      } else {
        closeAllMenus();
        $menuItem.classList.add('open');
      }
      return e.stopPropagation();
    };
    if (e.target.classList.contains('menu-item')) {
      $menuItem = e.target;
      return openMenu();
    } else if (e.target.parentNode.classList.contains('menu-item')) {
      $menuItem = e.target.parentNode;
      return openMenu();
    } else {
      closeAllMenus();
    }
  });
};

k$.dropdown = dropdown;

module.exports = dropdown;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/growl.coffee":[function(require,module,exports){
var growl;

growl = function(params) {
  return k$.buffer(function() {
    var className, content, defaults, delay, growlContainer, id;
    defaults = {
      title: void 0,
      text: void 0,
      delay: 2000,
      type: 'growl-warn',
      id: Date.now()
    };
    params = k$.extend(defaults, params);
    if (!k$.$$('.growl_container').length) {
      growlContainer = document.createElement('div');
      growlContainer.className = 'growl_container';
      document.body.appendChild(growlContainer);
    }
    growl = document.createElement('div');
    className = "alert growl show " + params.type + " growl-" + params.id;
    growl.className = className;
    content = "";
    if (params.title) {
      content += "<h1>" + params.title + "</h1>";
    }
    if (params.text) {
      content += "<p>" + params.text + "</p>";
    }
    growl.innerHTML = content;
    k$.$('.growl_container').appendChild(growl);
    delay = params.delay;
    id = params.id;
    if (delay > 0) {
      return (function(delay, id) {
        return setTimeout(function() {
          var $growl, $newGrowl;
          $growl = k$.$(".growl-" + id);
          $growl.classList.remove('show');
          $newGrowl = $growl.cloneNode(true);
          $growl.parentNode.replaceChild($newGrowl, $growl);
          $newGrowl.classList.add('hide');
          return (function(delay, id) {
            return setTimeout(function() {
              if (!k$.$$('.growl.show').length) {
                return k$.$('.growl_container').parentNode.removeChild(k$.$('.growl_container'));
              }
            }, 500);
          })(delay, id);
        }, delay);
      })(delay, id);
    }
  });
};

k$.growl = growl;

module.exports = growl;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/icons.coffee":[function(require,module,exports){
var icons;

icons = function() {
  var CACHE, IE9TO11, embed, onframe, onload, requestAnimationFrame, uses;
  uses = document.getElementsByTagName("use");
  requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
  CACHE = {};
  IE9TO11 = true;
  embed = function(svg, g) {
    var clone, fragment, viewBox;
    if (g) {
      viewBox = g.getAttribute("viewBox");
      fragment = document.createDocumentFragment();
      clone = g.cloneNode(true);
      if (viewBox) {
        svg.setAttribute("viewBox", viewBox);
      }
      while (clone.childNodes.length) {
        fragment.appendChild(clone.childNodes[0]);
      }
      svg.appendChild(fragment);
    }
  };
  onload = function() {
    var s, x, xhr;
    xhr = this;
    x = document.createElement("x");
    s = xhr.s;
    x.innerHTML = xhr.responseText;
    xhr.onload = function() {
      s.splice(0).map(function(array) {
        embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
      });
    };
    xhr.onload();
  };
  onframe = function() {
    var svg, url, url_hash, url_root, use, xhr;
    use = void 0;
    while ((use = uses[0])) {
      svg = use.parentNode;
      url = use.getAttribute("xlink:href").split("#");
      url_root = url[0];
      url_hash = url[1];
      svg.removeChild(use);
      if (url_root.length) {
        xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();
        if (!xhr.s) {
          xhr.s = [];
          xhr.open("GET", url_root);
          xhr.onload = onload;
          xhr.send();
        }
        xhr.s.push([svg, url_hash]);
        if (xhr.readyState === 4) {
          xhr.onload();
        }
      } else {
        embed(svg, document.getElementById(url_hash));
      }
    }
    requestAnimationFrame(onframe);
  };
  if (IE9TO11) {
    onframe();
  }
};

k$.icons = icons;

module.exports = icons;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/ks.coffee":[function(require,module,exports){
(function (global){
global.k$ = new Object();

k$.$$ = function(el) {
  return document.querySelectorAll(el);
};

k$.$ = function(el) {
  return k$.$$(el)[0];
};

k$.extend = function(destination, source) {
  var property;
  for (property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

k$.debounceQueue = new Object;

module.exports = k$;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/adam/sites/kickstart/lib-core/coffee/modal.coffee":[function(require,module,exports){
var modal;

modal = function(el) {
  var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  if (iOS) {
    document.body.classList.add('dismiss-modal');
  }
  (function(el) {
    var $closer, $hideModal;
    $hideModal = function() {
      return k$.$(el).style.display = 'none';
    };
    document.body.addEventListener('click', function() {
      return $hideModal();
    });
    k$.$(el).addEventListener('click', function(e) {
      return e.stopPropagation();
    });
    $closer = k$.$(el).querySelector('a[data-modal-close]');
    if ($closer) {
      return $closer.addEventListener('click', function() {
        return $hideModal();
      });
    }
  })(el);
  return k$.$(el);
};

k$.modal = modal;

module.exports = modal;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/navbar.coffee":[function(require,module,exports){
var nav;

nav = function(el) {
  var $button, $menuItem, $menuItems, $navbar, _$menuItems, e, i, j, len, len1;
  $navbar = typeof el === 'string' ? k$.$(el) : el;
  try {
    $menuItems = $navbar.querySelectorAll('ul > li');
    _$menuItems = new Array();
    for (i = 0, len = $menuItems.length; i < len; i++) {
      $menuItem = $menuItems[i];
      if ($menuItem.querySelectorAll('ul').length && !$menuItem.querySelectorAll('[role="button"]').length) {
        _$menuItems.push($menuItem);
      }
    }
    $menuItems = _$menuItems;
    for (j = 0, len1 = $menuItems.length; j < len1; j++) {
      $menuItem = $menuItems[j];
      $menuItem.classList.add('menu-item');
    }
  } catch (_error) {
    e = _error;
    console.error("Could not instantiate as a nav.", e.message);
  }
  $button = $navbar.querySelector('.navbar-title button');
  if ($button) {
    return $button.addEventListener('click', function() {
      var $nav;
      $nav = $navbar.querySelector('nav');
      if ($nav.classList.contains('expand')) {
        return $nav.classList.remove('expand');
      } else {
        return $nav.classList.add('expand');
      }
    });
  }
};

k$.nav = nav;

module.exports = nav;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/status.coffee":[function(require,module,exports){
var status;

status = function(opts) {
  var $status, $statusBar, defaults, hideStatusBar;
  defaults = {
    type: 'status-yellow',
    delay: 2000
  };
  status = k$.extend(defaults, opts);
  if (!k$.$$('#status_bar').length) {
    $statusBar = document.createElement('div');
    $statusBar.id = 'status_bar';
    $statusBar.className = 'status_bar';
    $statusBar.innerHTML = "<div class='status_bar-status' id='status_bar-status'></div>";
    document.body.appendChild($statusBar);
  }
  $statusBar = k$.$('#status_bar');
  hideStatusBar = function() {
    $statusBar.classList.add('hide');
    return setTimeout(function() {
      $statusBar.classList.remove('hide');
      return $statusBar.parentNode.removeChild($statusBar);
    }, 250);
  };
  if (status.delay > 0) {
    k$.debounce(hideStatusBar, 'hideStatusBar', status.delay);
  }
  $status = k$.$("#status_bar-status");
  $status.innerHTML = status.text;
  return $status.dataset.type = status.type;
};

k$.status = status;

module.exports = status;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/tabs.coffee":[function(require,module,exports){
var tabs;

tabs = function(el) {
  var $_tab, $id, $pane, $paneSet, $tab, $tabContainer, $tabLink, $tabSet, i, j, k, len, len1, len2, results;
  $tabContainer = typeof el === 'string' ? k$.$(el) : el;
  $tabSet = $tabContainer.querySelectorAll('li');
  for (i = 0, len = $tabSet.length; i < len; i++) {
    $tab = $tabSet[i];
    $tab.classList.add('tab-item');
  }
  $paneSet = new Array();
  for (j = 0, len1 = $tabSet.length; j < len1; j++) {
    $_tab = $tabSet[j];
    $id = $_tab.querySelector('a').getAttribute('href');
    $pane = k$.$("article" + $id);
    if ($_tab.classList.contains('open')) {
      $pane.classList.add('open');
    }
    $paneSet.push($pane);
    $pane.setAttribute('data-panel', true);
  }
  results = [];
  for (k = 0, len2 = $tabSet.length; k < len2; k++) {
    $tab = $tabSet[k];
    $tabLink = $tab.querySelector('a');
    $tabLink.setAttribute('data-link', $tabLink.getAttribute('href'));
    $tabLink.href = 'javascript:void(0);';
    results.push((function($tab, $tabLink, $paneSet) {
      return $tab.addEventListener('click', function() {
        var _$tab, l, len3, len4, m;
        for (l = 0, len3 = $paneSet.length; l < len3; l++) {
          $pane = $paneSet[l];
          $pane.classList.remove('open');
        }
        for (m = 0, len4 = $tabSet.length; m < len4; m++) {
          _$tab = $tabSet[m];
          _$tab.classList.remove('open');
        }
        k$.$("article" + ($tabLink.getAttribute('data-link'))).classList.add('open');
        return $tab.classList.add('open');
      });
    })($tab, $tabLink, $paneSet));
  }
  return results;
};

k$.tabs = tabs;

module.exports = tabs;



},{}],"/Users/adam/sites/kickstart/lib-core/coffee/throttler.coffee":[function(require,module,exports){
var throttle;

throttle = function(fn, id, delay) {};

k$.throttle = throttle;

module.exports = throttle;



},{}],"/Users/adam/sites/kickstart/lib/coffee/myscript.coffee":[function(require,module,exports){
var myscript;

myscript = function() {};

module.exports = myscript;



},{}],"/Users/adam/sites/kickstart/lib/coffee/vendor/index.coffee":[function(require,module,exports){




},{}]},{},["./lib/coffee/app.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWRhbS9zaXRlcy9raWNrc3RhcnQvbGliL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS9hcHAuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS9idWZmZXIuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS9idXR0b25zLmNvZmZlZSIsIi9Vc2Vycy9hZGFtL3NpdGVzL2tpY2tzdGFydC9saWItY29yZS9jb2ZmZWUvZGVib3VuY2VyLmNvZmZlZSIsIi9Vc2Vycy9hZGFtL3NpdGVzL2tpY2tzdGFydC9saWItY29yZS9jb2ZmZWUvZHJvcGRvd24uY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS9ncm93bC5jb2ZmZWUiLCIvVXNlcnMvYWRhbS9zaXRlcy9raWNrc3RhcnQvbGliLWNvcmUvY29mZmVlL2ljb25zLmNvZmZlZSIsIi9Vc2Vycy9hZGFtL3NpdGVzL2tpY2tzdGFydC9saWItY29yZS9jb2ZmZWUva3MuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS9tb2RhbC5jb2ZmZWUiLCIvVXNlcnMvYWRhbS9zaXRlcy9raWNrc3RhcnQvbGliLWNvcmUvY29mZmVlL25hdmJhci5jb2ZmZWUiLCIvVXNlcnMvYWRhbS9zaXRlcy9raWNrc3RhcnQvbGliLWNvcmUvY29mZmVlL3N0YXR1cy5jb2ZmZWUiLCIvVXNlcnMvYWRhbS9zaXRlcy9raWNrc3RhcnQvbGliLWNvcmUvY29mZmVlL3RhYnMuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi1jb3JlL2NvZmZlZS90aHJvdHRsZXIuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi9jb2ZmZWUvbXlzY3JpcHQuY29mZmVlIiwiL1VzZXJzL2FkYW0vc2l0ZXMva2lja3N0YXJ0L2xpYi9jb2ZmZWUvdmVuZG9yL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsb0JBQUE7O0FBQUEsRUFBQSxHQUFZLE9BQUEsQ0FBUSwyQkFBUixDQUFaLENBQUE7O0FBQUEsUUFDQSxHQUFZLE9BQUEsQ0FBUSxZQUFSLENBRFosQ0FBQTs7QUFBQSxNQUVBLEdBQVksT0FBQSxDQUFRLGdCQUFSLENBRlosQ0FBQTs7QUFBQSxRQUlRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFNBQUEsR0FBQTtTQUM1QyxRQUFBLENBQUEsRUFENEM7QUFBQSxDQUE5QyxDQUpBLENBQUE7Ozs7O0FDQUEsSUFBQSw2RkFBQTs7QUFBQSxFQUFBLEdBQVksT0FBQSxDQUFRLE1BQVIsQ0FBWixDQUFBOztBQUFBLEtBQ0EsR0FBWSxPQUFBLENBQVEsU0FBUixDQURaLENBQUE7O0FBQUEsTUFFQSxHQUFZLE9BQUEsQ0FBUSxVQUFSLENBRlosQ0FBQTs7QUFBQSxRQUdBLEdBQVksT0FBQSxDQUFRLGFBQVIsQ0FIWixDQUFBOztBQUFBLEtBSUEsR0FBWSxPQUFBLENBQVEsU0FBUixDQUpaLENBQUE7O0FBQUEsTUFLQSxHQUFZLE9BQUEsQ0FBUSxVQUFSLENBTFosQ0FBQTs7QUFBQSxJQU1BLEdBQVksT0FBQSxDQUFRLFFBQVIsQ0FOWixDQUFBOztBQUFBLFNBT0EsR0FBWSxPQUFBLENBQVEsYUFBUixDQVBaLENBQUE7O0FBQUEsT0FRQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBUlosQ0FBQTs7QUFBQSxNQVNBLEdBQVksT0FBQSxDQUFRLFVBQVIsQ0FUWixDQUFBOztBQUFBLEtBVUEsR0FBWSxPQUFBLENBQVEsU0FBUixDQVZaLENBQUE7O0FBQUEsUUFXQSxHQUFZLE9BQUEsQ0FBUSxZQUFS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QUE7O0FBQUEsTUFzQ00sQ0FBQyxPQUFQLEdBQWlCLElBdENqQixDQUFBOzs7OztBQ0FBLElBQUEsUUFBQTs7QUFBQSxRQUFBLEdBQVcsU0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEtBQVQsR0FBQSxDQUFYLENBQUE7O0FBQUEsRUFJRSxDQUFDLFFBQUgsR0FBYyxRQUpkLENBQUE7O0FBQUEsTUFNTSxDQUFDLE9BQVAsR0FBaUIsUUFOakIsQ0FBQTs7Ozs7QUNBQSxJQUFBLFFBQUE7O0FBQUEsUUFBQSxHQUFXLFNBQUEsR0FBQSxDQUFYLENBQUE7O0FBQUEsTUFHTSxDQUFDLE9BQVAsR0FBaUIsUUFIakIsQ0FBQTs7Ozs7QUNBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJLUyAgICAgICAgPSByZXF1aXJlICcuLi8uLi9saWItY29yZS9jb2ZmZWUvYXBwJ1xubXlTY3JpcHQgID0gcmVxdWlyZSAnLi9teXNjcmlwdCdcbnZlbmRvciAgICA9IHJlcXVpcmUgJy4vdmVuZG9yL2luZGV4J1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdET01Db250ZW50TG9hZGVkJywgLT5cbiAgbXlTY3JpcHQoKVxuIiwiS1MgICAgICAgID0gcmVxdWlyZSAnLi9rcydcbk1vZGFsICAgICA9IHJlcXVpcmUgJy4vbW9kYWwnXG5OYXZiYXIgICAgPSByZXF1aXJlICcuL25hdmJhcidcbkRlYm91bmNlICA9IHJlcXVpcmUgJy4vZGVib3VuY2VyJ1xuSWNvbnMgICAgID0gcmVxdWlyZSAnLi9pY29ucydcblN0YXR1cyAgICA9IHJlcXVpcmUgJy4vc3RhdHVzJ1xuVGFicyAgICAgID0gcmVxdWlyZSAnLi90YWJzJ1xuVGhyb3R0bGVyID0gcmVxdWlyZSAnLi90aHJvdHRsZXInXG5CdXR0b25zICAgPSByZXF1aXJlICcuL2J1dHRvbnMnXG5CdWZmZXIgICAgPSByZXF1aXJlICcuL2J1ZmZlcidcbkdyb3dsICAgICA9IHJlcXVpcmUgJy4vZ3Jvd2wnXG5Ecm9wZG93biAgPSByZXF1aXJlICcuL2Ryb3Bkb3duJ1xuXG5rJC5yZWFkeSA9IC0+XG4gIGskLmljb25zKClcbiAgayQuYnV0dG9uKClcbiAgayQuZHJvcGRvd24oKVxuICBrJC5uYXYoJG5hdmJhcikgZm9yICRuYXZiYXIgaW4gayQuJCQoJ1tkYXRhLWtzLW5hdmJhcl0nKVxuICBrJC50YWJzKCR0YWJTZXQpIGZvciAkdGFiU2V0IGluIGskLiQkKCdbZGF0YS1rcy10YWJzXScpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ0RPTUNvbnRlbnRMb2FkZWQnLCAtPiBrJC5yZWFkeSgpXG4iLCJidWZmZXIgPSAoZm4sIGRlbGF5KSAtPlxuXG4gICMgQ3JlYXRlIGEgbmV3IGJ1ZmZlckFycmF5IGlmIG9uZSBkb2VzIG5vdCBleGlzdCBhbHJlYWR5LlxuICBrJC5idWZmZXJBcnJheSA9IGskLmJ1ZmZlckFycmF5IHx8IG5ldyBBcnJheSgpXG4gIGlmIG5vdCBrJC5idWZmZXJBcnJheS5sZW5ndGhcbiAgICBrJC5idWZmZXJBcnJheSA9IG5ldyBBcnJheSgpXG5cbiAgICBkZWxheSA9IGRlbGF5IHx8IDUwMFxuXG4gICAgIyBDcmVhdGUgYW4gaW50ZXJ2YWwgdG8gZmlyZSB0aGUgZm5zIGluIGJ1ZmZlckFycmF5XG4gICAgaSA9IDFcblxuICAgIGskLmJ1ZmZlckludGVydmFsID0gc2V0SW50ZXJ2YWwgLT5cbiAgICAgIGskLmJ1ZmZlckFycmF5W2ldKCkgaWYgayQuYnVmZmVyQXJyYXlbaV1cbiAgICAgIGkrK1xuICAgICAgaWYgaSA+PSBrJC5idWZmZXJBcnJheS5sZW5ndGhcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBrJC5idWZmZXJJbnRlcnZhbFxuICAgICAgICBrJC5idWZmZXJBcnJheSA9IHVuZGVmaW5lZFxuICAgICAgICBpID0gMVxuICAgICwgZGVsYXlcblxuICAjIEFkZCB0aGlzIGZ1bmN0aW9uIHRvIHRoZSBhcnJheS5cbiAgayQuYnVmZmVyQXJyYXkucHVzaCBmblxuXG4gICMgRmlyZSByaWdodCBhd2F5IGlmIGl0J3MgdGhlIGZpcnN0IGluIGxpbmUuXG4gIGskLmJ1ZmZlckFycmF5WzBdKCkgaWYgayQuYnVmZmVyQXJyYXkubGVuZ3RoID09IDFcblxuICBjb25zb2xlLmluZm8gXCJGdW5jdGlvbiBxdWV1ZWQgKCN7ayQuYnVmZmVyQXJyYXkubGVuZ3RofSBpbiBxdWV1ZSlcIlxuXG5rJC5idWZmZXIgPSBidWZmZXJcblxubW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbiIsImJ1dHRvbiA9IC0+XG5cbiAgKCRidXR0b24uY2xhc3NMaXN0LmFkZCAnbWVudS1pdGVtJyBpZiAkYnV0dG9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoKSBmb3IgJGJ1dHRvbiBpbiBrJC4kJChcImJ1dHRvblwiKVxuICAkYnV0dG9uRHJvcGRvd24ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkICdtZW51LWl0ZW0nIGZvciAkYnV0dG9uRHJvcGRvd24gaW4gayQuJCQgJy5idXR0b24tZHJvcGRvd24nXG5cbmskLmJ1dHRvbiA9IGJ1dHRvblxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1dHRvblxuIiwiZGVib3VuY2UgPSAoZm4sIGlkLCBkZWxheSwgYXJncywgdGhhdCkgLT5cblxuICBkZWxheSA9IGRlbGF5IHx8IDEwMDBcbiAgdGhhdCA9IHRoYXQgfHwgdGhpc1xuICBhcmdzID0gYXJncyB8fCBuZXcgQXJyYXlcblxuICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9IG5ldyBPYmplY3QoKSBpZiB0eXBlb2YgayQuZGVib3VuY2VRdWV1ZVtpZF0gIT0gXCJvYmplY3RcIlxuXG4gIGNsZWFyVGltZW91dCBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5kZWJvdW5jZVRpbWVyIGlmIHR5cGVvZiBrJC5kZWJvdW5jZVF1ZXVlW2lkXS5kZWJvdW5jZVRpbWVyICE9IFwidW5kZWZpbmVkXCJcblxuICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9XG4gICAgZm46IGZuXG4gICAgaWQ6IGlkXG4gICAgZGVsYXk6IGRlbGF5XG4gICAgYXJnczogYXJnc1xuICAgIGRlYm91bmNlVGltZXI6IHNldFRpbWVvdXQgLT5cbiAgICAgIGskLmRlYm91bmNlUXVldWVbaWRdLmZuLmFwcGx5KHRoYXQsIGskLmRlYm91bmNlUXVldWVbaWRdLmFyZ3MpXG4gICAgICBrJC5kZWJvdW5jZVF1ZXVlW2lkXSA9IHVuZGVmaW5lZFxuICAgICwgZGVsYXlcblxuayQuZGVib3VuY2UgPSBkZWJvdW5jZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlXG4iLCJkcm9wZG93biA9ICgpIC0+XG5cbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChlKSAtPlxuICAgICRtZW51SXRlbSA9IG51bGxcblxuICAgIGNsb3NlQWxsTWVudXMgPSAtPlxuICAgICAgXyRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyRtZW51SXRlbSBpbiBrJC4kJCgnLm1lbnUtaXRlbScpXG5cbiAgICAjIFdlJ2xsIG5lZWQgdGhpcyBsYXRlci5cbiAgICBvcGVuTWVudSA9IC0+XG4gICAgICAjIFVzZXIgaGFzIGNsaWNrZWQgb24gYSBtZW51IHRyaWdnZXIuXG4gICAgICBpZiAkbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJyBcbiAgICAgICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIFxuICAgICAgZWxzZSBcbiAgICAgICAgY2xvc2VBbGxNZW51cygpIFxuICAgICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnb3BlbidcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICMgTGV0J3MgY2hlY2sgaWYgYSB1c2VyIGhhcyBjbGlja2VkIG9uIGEgbWVudSB0cmlnZ2VyOlxuICAgIGlmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyAnbWVudS1pdGVtJ1xuICAgICAgJG1lbnVJdGVtID0gZS50YXJnZXQgXG4gICAgICBvcGVuTWVudSgpXG4gICAgZWxzZSBpZiBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyAnbWVudS1pdGVtJ1xuICAgICAgJG1lbnVJdGVtID0gZS50YXJnZXQucGFyZW50Tm9kZVxuICAgICAgb3Blbk1lbnUoKVxuICAgIGVsc2VcbiAgICAgIGNsb3NlQWxsTWVudXMoKVxuICAgICAgcmV0dXJuXG5cblxuXG4gICMgIyBUaGUgZm9sbG93aW5nIHNob3VsZCBhcHBseSB0byBzZXZlcmFsIGVsZW1lbnRzLlxuICAjXG4gICMgJG1lbnVJdGVtcyA9IGskLiQkICcubWVudS1pdGVtJ1xuICAjXG4gICMgZm9yICRfbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuICAjXG4gICMgICAkbWVudUl0ZW0gPSAkX21lbnVJdGVtLmNsb25lTm9kZSB0cnVlXG4gICMgICAkX21lbnVJdGVtLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkICRtZW51SXRlbSwgJF9tZW51SXRlbVxuICAjXG4gICMgICBkbyAoJG1lbnVJdGVtKSAtPlxuXG4gICAgICAjIFRPRE8gbWFrZSBvbmx5IG9uZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHBhcmVudC5cbiAgICAgICMgJG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGUpIC0+XG5cbiAgICAgICAgIyAjIEp1c3QgY2xvc2UgaXQgaWYgaXQncyBhbHJlYWR5IG9wZW5cbiAgICAgICAgIyBpZiAkbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zICdvcGVuJ1xuICAgICAgICAjICAgJG1lbnVJdGVtLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nXG4gICAgICAgICMgICByZXR1cm5cbiAgICAgICAgI1xuICAgICAgICAjICMgUmVzZXQgYWxsXG4gICAgICAgICMgXyRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyRtZW51SXRlbSBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtJylcbiAgICAgICAgIyAkb3BlbmFibGUgPSAkbWVudUl0ZW0ucXVlcnlTZWxlY3RvciAndWwnXG4gICAgICAgICNcbiAgICAgICAgIyAjIE9wZW4gdGhpcyBvbmVcbiAgICAgICAgIyBpZiAkb3BlbmFibGVcbiAgICAgICAgIyAgICRtZW51SXRlbS5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuICAgICAgICAjXG4gICAgICAgICMgIyBQcmV2ZW50IGJ1YmJsaW5nXG4gICAgICAgICMgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICMgIyBEaXNtaXNzIGFsbFxuICAjIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuICAjICAgJHVsLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSAnb3BlbicgZm9yICR1bCBpbiBrJC4kJCgnLm1lbnUtaXRlbSA+IHVsJylcbiAgIyAgICRsaS5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgJGxpIGluIGskLiQkKCcubWVudS1pdGVtLm9wZW4nKVxuXG5rJC5kcm9wZG93biA9IGRyb3Bkb3duXG5cbm1vZHVsZS5leHBvcnRzID0gZHJvcGRvd25cbiIsImdyb3dsID0gKHBhcmFtcykgLT5cblxuICBrJC5idWZmZXIgLT5cbiAgICBkZWZhdWx0cyA9XG4gICAgICB0aXRsZTogdW5kZWZpbmVkXG4gICAgICB0ZXh0OiB1bmRlZmluZWRcbiAgICAgIGRlbGF5OiAyMDAwXG4gICAgICB0eXBlOiAnZ3Jvd2wtd2FybidcbiAgICAgIGlkOiBEYXRlLm5vdygpXG5cbiAgICBwYXJhbXMgPSBrJC5leHRlbmQgZGVmYXVsdHMsIHBhcmFtc1xuXG4gICAgIyBDcmVhdGUgZ3Jvd2wgY29udGFpbmVyXG4gICAgaWYgbm90IGskLiQkKCcuZ3Jvd2xfY29udGFpbmVyJykubGVuZ3RoXG4gICAgICBncm93bENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgIGdyb3dsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdncm93bF9jb250YWluZXInXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGdyb3dsQ29udGFpbmVyXG5cbiAgICAjIENyZWF0ZSBncm93bFxuICAgIGdyb3dsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuXG4gICAgIyBBZGQgYXBwcm9wcmlhdGUgY2xhc3Nlc1xuICAgIGNsYXNzTmFtZSA9IFwiYWxlcnQgZ3Jvd2wgc2hvdyAje3BhcmFtcy50eXBlfSBncm93bC0je3BhcmFtcy5pZH1cIlxuICAgIGdyb3dsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZVxuXG4gICAgIyBBZGQgY29udGVudFxuICAgIGNvbnRlbnQgPSBcIlwiXG4gICAgY29udGVudCArPSBcIjxoMT4je3BhcmFtcy50aXRsZX08L2gxPlwiIGlmIHBhcmFtcy50aXRsZVxuICAgIGNvbnRlbnQgKz0gXCI8cD4je3BhcmFtcy50ZXh0fTwvcD5cIiBpZiBwYXJhbXMudGV4dFxuICAgIGdyb3dsLmlubmVySFRNTCA9IGNvbnRlbnRcblxuICAgICMgQXBwZW5kIGNoaWxkIHRvIGNvbnRhaW5lclxuICAgIGskLiQoJy5ncm93bF9jb250YWluZXInKS5hcHBlbmRDaGlsZCBncm93bFxuXG4gICAgZGVsYXkgPSBwYXJhbXMuZGVsYXlcbiAgICBpZCA9IHBhcmFtcy5pZFxuXG4gICAgaWYgZGVsYXkgPiAwXG4gICAgICBkbyAoZGVsYXksIGlkKSAtPlxuICAgICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgJGdyb3dsID0gayQuJChcIi5ncm93bC0je2lkfVwiKVxuICAgICAgICAgICRncm93bC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICAkbmV3R3Jvd2wgPSAkZ3Jvd2wuY2xvbmVOb2RlIHRydWVcbiAgICAgICAgICAkZ3Jvd2wucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQgJG5ld0dyb3dsLCAkZ3Jvd2xcbiAgICAgICAgICAkbmV3R3Jvd2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG5cbiAgICAgICAgICBkbyAoZGVsYXksIGlkKSAtPlxuICAgICAgICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAgICAgICAjIFJlbW92ZSBnaG9zdCBncm93bHNcbiAgICAgICAgICAgICAgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgayQuJCgnLmdyb3dsX2NvbnRhaW5lcicpIGlmIG5vdCBrJC4kJCgnLmdyb3dsLnNob3cnKS5sZW5ndGhcbiAgICAgICAgICAgICwgNTAwXG4gICAgICAgICwgZGVsYXlcblxuayQuZ3Jvd2wgPSBncm93bFxuXG5tb2R1bGUuZXhwb3J0cyA9IGdyb3dsXG4iLCJpY29ucyA9ICgpIC0+XG5cbiAgIyEgc3ZnNGV2ZXJ5Ym9keSB2MS4wLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvc3ZnNGV2ZXJ5Ym9keSBcbiAgdXNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidXNlXCIpXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3Igd2luZG93LnNldFRpbWVvdXRcbiAgQ0FDSEUgPSB7fVxuICAjIElFOVRPMTEgPSAvVHJpZGVudFxcL1s1NjddXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIG9yIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKS8pIG9yIFtdKVsxXSA8IDUzN1xuICBJRTlUTzExID0gdHJ1ZVxuICAjIEZvcmNpbmcgdGhpcyB0byBzaGltIHJlZ2FyZGxlc3MuXG4gIGVtYmVkID0gKHN2ZywgZykgLT5cbiAgICBpZiBnXG4gICAgICB2aWV3Qm94ID0gZy5nZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpXG4gICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgY2xvbmUgPSBnLmNsb25lTm9kZSh0cnVlKVxuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSBcInZpZXdCb3hcIiwgdmlld0JveCAgaWYgdmlld0JveFxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQgY2xvbmUuY2hpbGROb2Rlc1swXSAgd2hpbGUgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGhcbiAgICAgIHN2Zy5hcHBlbmRDaGlsZCBmcmFnbWVudFxuICAgIHJldHVyblxuICBvbmxvYWQgPSAtPlxuICAgIHhociA9IHRoaXNcbiAgICB4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInhcIilcbiAgICBzID0geGhyLnNcbiAgICB4LmlubmVySFRNTCA9IHhoci5yZXNwb25zZVRleHRcbiAgICB4aHIub25sb2FkID0gLT5cbiAgICAgIHMuc3BsaWNlKDApLm1hcCAoYXJyYXkpIC0+XG4gICAgICAgIGVtYmVkIGFycmF5WzBdLCB4LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBhcnJheVsxXS5yZXBsYWNlKC8oXFxXKS9nLCBcIlxcXFwkMVwiKSlcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIHJldHVyblxuXG4gICAgeGhyLm9ubG9hZCgpXG4gICAgcmV0dXJuXG4gIG9uZnJhbWUgPSAtPlxuICAgIHVzZSA9IHVuZGVmaW5lZFxuICAgIHdoaWxlICh1c2UgPSB1c2VzWzBdKVxuICAgICAgc3ZnID0gdXNlLnBhcmVudE5vZGVcbiAgICAgIHVybCA9IHVzZS5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpLnNwbGl0KFwiI1wiKVxuICAgICAgdXJsX3Jvb3QgPSB1cmxbMF1cbiAgICAgIHVybF9oYXNoID0gdXJsWzFdXG4gICAgICBzdmcucmVtb3ZlQ2hpbGQgdXNlXG4gICAgICBpZiB1cmxfcm9vdC5sZW5ndGhcbiAgICAgICAgeGhyID0gQ0FDSEVbdXJsX3Jvb3RdID0gQ0FDSEVbdXJsX3Jvb3RdIG9yIG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHVubGVzcyB4aHIuc1xuICAgICAgICAgIHhoci5zID0gW11cbiAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmxfcm9vdFxuICAgICAgICAgIHhoci5vbmxvYWQgPSBvbmxvYWRcbiAgICAgICAgICB4aHIuc2VuZCgpXG4gICAgICAgIHhoci5zLnB1c2ggW1xuICAgICAgICAgIHN2Z1xuICAgICAgICAgIHVybF9oYXNoXG4gICAgICAgIF1cbiAgICAgICAgeGhyLm9ubG9hZCgpICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICBlbHNlXG4gICAgICAgIGVtYmVkIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodXJsX2hhc2gpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9uZnJhbWVcbiAgICByZXR1cm5cbiAgb25mcmFtZSgpICBpZiBJRTlUTzExXG4gIHJldHVyblxuXG5rJC5pY29ucyA9IGljb25zXG5cbm1vZHVsZS5leHBvcnRzID0gaWNvbnNcbiIsImdsb2JhbC5rJCA9IG5ldyBPYmplY3QoKVxuXG5rJC4kJCA9IChlbCkgLT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBlbFxuayQuJCA9IChlbCkgLT4gayQuJCQoZWwpWzBdXG5rJC5leHRlbmQgPSAoZGVzdGluYXRpb24sIHNvdXJjZSkgLT5cbiAgZm9yIHByb3BlcnR5IG9mIHNvdXJjZVxuICAgIGlmIHNvdXJjZVtwcm9wZXJ0eV0gYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgYW5kIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgaXMgT2JqZWN0XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gb3Ige31cbiAgICAgIGFyZ3VtZW50cy5jYWxsZWUgZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldXG4gICAgZWxzZVxuICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XVxuICBkZXN0aW5hdGlvblxuXG5rJC5kZWJvdW5jZVF1ZXVlID0gbmV3IE9iamVjdFxuXG5tb2R1bGUuZXhwb3J0cyA9IGskXG4iLCJtb2RhbCA9IChlbCkgLT5cblxuICBgdmFyIGlPUyA9IC8oaVBhZHxpUGhvbmV8aVBvZCkvZy50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50IClgXG4gIFxuICAjIEN1cnNvciBwb2ludGVyIGhhY2sgaWYgaU9TXG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCAnZGlzbWlzcy1tb2RhbCcgaWYgaU9TXG5cbiAgZG8gKGVsKSAtPlxuXG4gICAgJGhpZGVNb2RhbCA9IC0+XG4gICAgICBrJC4kKGVsKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAjIEFsbG93IG1vZGFsIHRvIGRpc21pc3Mgd2hlbiBjbGlja2VkIG91dHNpZGVcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cbiAgICAgICRoaWRlTW9kYWwoKVxuXG4gICAgayQuJChlbCkuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZSkgLT5cbiAgICAgIHJldHVybiBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAkY2xvc2VyID0gayQuJChlbCkucXVlcnlTZWxlY3RvcignYVtkYXRhLW1vZGFsLWNsb3NlXScpXG4gICAgaWYgJGNsb3NlclxuICAgICAgJGNsb3Nlci5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAgICRoaWRlTW9kYWwoKVxuXG4gIGskLiQgZWxcblxuayQubW9kYWwgPSBtb2RhbFxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsXG4iLCJuYXYgPSAoZWwpIC0+XG5cbiAgIyBBY2NlcHQgYm90aCBzdHJpbmdzIGFuZCBlbGVtZW50cy5cbiAgJG5hdmJhciA9IGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJyB0aGVuIGskLiQoZWwpIGVsc2UgZWxcblxuICB0cnlcbiAgICAjIFdpcmUgdXAgbWVudSBpdGVtc1xuICAgICRtZW51SXRlbXMgPSAkbmF2YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsID4gbGknKVxuXG4gICAgIyBQcnVuZSBpdGVtcyB0aGF0IGRvbid0IGNvbnRhaW4gdWxzXG4gICAgXyRtZW51SXRlbXMgPSBuZXcgQXJyYXkoKVxuICAgIGZvciAkbWVudUl0ZW0gaW4gJG1lbnVJdGVtc1xuICAgICAgaWYgJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykubGVuZ3RoIGFuZCAhJG1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwiYnV0dG9uXCJdJykubGVuZ3RoXG4gICAgICAgIF8kbWVudUl0ZW1zLnB1c2ggJG1lbnVJdGVtXG5cbiAgICAkbWVudUl0ZW1zID0gXyRtZW51SXRlbXNcbiAgICBmb3IgJG1lbnVJdGVtIGluICRtZW51SXRlbXNcblxuICAgICAgIyBNYXJrIGFzIGEgbWVudSBpdGVtXG4gICAgICAkbWVudUl0ZW0uY2xhc3NMaXN0LmFkZCAnbWVudS1pdGVtJ1xuXG4gIGNhdGNoIGVcbiAgICBjb25zb2xlLmVycm9yIFwiQ291bGQgbm90IGluc3RhbnRpYXRlIGFzIGEgbmF2LlwiLCBlLm1lc3NhZ2VcblxuICAkYnV0dG9uID0gJG5hdmJhci5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXRpdGxlIGJ1dHRvbicpXG4gIGlmICRidXR0b24gXG4gICAgJGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG4gICAgICAkbmF2ID0gJG5hdmJhci5xdWVyeVNlbGVjdG9yKCduYXYnKVxuICAgICAgaWYgJG5hdi5jbGFzc0xpc3QuY29udGFpbnMgJ2V4cGFuZCdcbiAgICAgICAgJG5hdi5jbGFzc0xpc3QucmVtb3ZlICdleHBhbmQnXG4gICAgICBlbHNlXG4gICAgICAgICRuYXYuY2xhc3NMaXN0LmFkZCAnZXhwYW5kJ1xuXG5rJC5uYXYgPSBuYXZcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZcbiIsInN0YXR1cyA9IChvcHRzKSAtPlxuXG4gIGRlZmF1bHRzID1cbiAgICB0eXBlOiAnc3RhdHVzLXllbGxvdydcbiAgICBkZWxheTogMjAwMFxuXG4gIHN0YXR1cyA9IGskLmV4dGVuZCBkZWZhdWx0cywgb3B0c1xuXG4gIGlmIG5vdCBrJC4kJCgnI3N0YXR1c19iYXInKS5sZW5ndGhcbiAgICAkc3RhdHVzQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAkc3RhdHVzQmFyLmlkID0gJ3N0YXR1c19iYXInXG4gICAgJHN0YXR1c0Jhci5jbGFzc05hbWUgPSAnc3RhdHVzX2JhcidcbiAgICAkc3RhdHVzQmFyLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nc3RhdHVzX2Jhci1zdGF0dXMnIGlkPSdzdGF0dXNfYmFyLXN0YXR1cyc+PC9kaXY+XCJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCRzdGF0dXNCYXIpXG5cbiAgJHN0YXR1c0JhciA9IGskLiQoJyNzdGF0dXNfYmFyJylcblxuICBoaWRlU3RhdHVzQmFyID0gLT5cbiAgICAkc3RhdHVzQmFyLmNsYXNzTGlzdC5hZGQgJ2hpZGUnXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgJHN0YXR1c0Jhci5jbGFzc0xpc3QucmVtb3ZlICdoaWRlJ1xuICAgICAgJHN0YXR1c0Jhci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkICRzdGF0dXNCYXJcbiAgICAsIDI1MFxuXG4gIGlmIHN0YXR1cy5kZWxheSA+IDBcbiAgICBrJC5kZWJvdW5jZSBoaWRlU3RhdHVzQmFyLCAnaGlkZVN0YXR1c0JhcicsIHN0YXR1cy5kZWxheVxuXG4gICRzdGF0dXMgPSBrJC4kKFwiI3N0YXR1c19iYXItc3RhdHVzXCIpXG4gICRzdGF0dXMuaW5uZXJIVE1MID0gc3RhdHVzLnRleHRcbiAgJHN0YXR1cy5kYXRhc2V0LnR5cGUgPSBzdGF0dXMudHlwZVxuXG5rJC5zdGF0dXMgPSBzdGF0dXNcblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0dXNcbiIsInRhYnMgPSAoZWwpIC0+XG5cbiAgIyBBY2NlcHQgYm90aCBzdHJpbmdzIGFuZCBlbGVtZW50cy5cbiAgJHRhYkNvbnRhaW5lciA9IGlmIHR5cGVvZiBlbCA9PSAnc3RyaW5nJyB0aGVuIGskLiQoZWwpIGVsc2UgZWxcblxuICAkdGFiU2V0ID0gJHRhYkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICR0YWIuY2xhc3NMaXN0LmFkZCgndGFiLWl0ZW0nKSBmb3IgJHRhYiBpbiAkdGFiU2V0XG5cbiAgJHBhbmVTZXQgPSBuZXcgQXJyYXkoKVxuICBmb3IgJF90YWIgaW4gJHRhYlNldFxuICAgICRpZCA9ICRfdGFiLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICRwYW5lID0gayQuJChcImFydGljbGUjeyRpZH1cIilcbiAgICAkcGFuZS5jbGFzc0xpc3QuYWRkICdvcGVuJyBpZiAkX3RhYi5jbGFzc0xpc3QuY29udGFpbnMgJ29wZW4nXG4gICAgJHBhbmVTZXQucHVzaCgkcGFuZSlcbiAgICAjICRwYW5lLmRhdGFzZXQucGFuZWwgPSAndHJ1ZScgIyBSZXBsYWNlIHdpdGggdGhpcyB3aGVuIElFMTAgc3VwcG9ydCBkcm9wc1xuICAgICRwYW5lLnNldEF0dHJpYnV0ZSgnZGF0YS1wYW5lbCcsIHRydWUpXG5cbiAgZm9yICR0YWIgaW4gJHRhYlNldFxuICAgICMgQ3JlYXRlIGFuIGFycmF5IG9mIHBhbmVscyBieSByZWFkaW5nIHRoZSBsaW5rcyBmcm9tIGVhY2ggdGFiLlxuICAgICR0YWJMaW5rID0gJHRhYi5xdWVyeVNlbGVjdG9yKCdhJylcbiAgICAjICR0YWJMaW5rLmRhdGFzZXQubGluayA9ICR0YWJMaW5rLmdldEF0dHJpYnV0ZSAnaHJlZicgIyBJYmlkXG4gICAgJHRhYkxpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWxpbmsnLCAkdGFiTGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSlcbiAgICAkdGFiTGluay5ocmVmID0gJ2phdmFzY3JpcHQ6dm9pZCgwKTsnXG5cbiAgICBkbyAoJHRhYiwgJHRhYkxpbmssICRwYW5lU2V0KSAtPlxuICAgICAgJHRhYi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIC0+XG5cbiAgICAgICAgIyBSZXNldCB0YWJzIGFuZCBwYW5lcyBvbmx5IGluIHRoaXMgdGFic2V0XG4gICAgICAgICRwYW5lLmNsYXNzTGlzdC5yZW1vdmUgJ29wZW4nIGZvciAkcGFuZSBpbiAkcGFuZVNldFxuICAgICAgICBfJHRhYi5jbGFzc0xpc3QucmVtb3ZlICdvcGVuJyBmb3IgXyR0YWIgaW4gJHRhYlNldFxuXG4gICAgICAgICMgQWRkIGFuIG9wZW4gY2xhc3MgdW5pcXVlbHkgdG8gdGhpcyB0YWIgYW5kIHBhbmUuXG4gICAgICAgICMgayQuJChcImFydGljbGUjeyR0YWJMaW5rLmRhdGFzZXQubGlua31cIikuY2xhc3NMaXN0LmFkZCAnb3BlbicgIyBJYmlkXG4gICAgICAgIGskLiQoXCJhcnRpY2xlI3skdGFiTGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycpfVwiKS5jbGFzc0xpc3QuYWRkICdvcGVuJ1xuICAgICAgICAkdGFiLmNsYXNzTGlzdC5hZGQgJ29wZW4nXG5cbmskLnRhYnMgPSB0YWJzXG5cbm1vZHVsZS5leHBvcnRzID0gdGFic1xuIiwidGhyb3R0bGUgPSAoZm4sIGlkLCBkZWxheSkgLT5cblxuICBcblxuayQudGhyb3R0bGUgPSB0aHJvdHRsZVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlXG4iLCJteXNjcmlwdCA9ICgpIC0+XG4gICMgV3JpdGUgeW91ciBjb2ZmZWVzY3JpcHQgaGVyZS5cblxubW9kdWxlLmV4cG9ydHMgPSBteXNjcmlwdFxuIiwiIyBSZXF1aXJlIHZlbmRvciBjb21wb25lbnRzIGhlcmVcbiNcbiMgRXhhbXBsZTpcbiMgc29tZU1vZHVsZSA9IHJlcXVpcmUgJy4vc29tZU1vZHVsZS9pbmRleCdcbiJdfQ==
