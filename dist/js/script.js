"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isMobile = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  // mobile
  isMobile = true;
}

var header = document.querySelector('.header');
var main = document.querySelector('.main');
var main_pt = '';
var header_h = '';
main_pt = main ? Number.parseInt(window.getComputedStyle(main).paddingTop) : '';
header_h = header ? header.offsetHeight : '';
var swiper = new Swiper(".just_pagination", {
  grabcursor: true,
  speed: 350,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
}); // header_active_link

var header_links = header.querySelectorAll('.header_link'),
    sections = document.querySelectorAll('section[id]');
var middle_view = document.createElement('div');
document.body.append(middle_view);
middle_view.classList.add('middle_view');
var middle_view_h = middle_view.offsetHeight;
middle_view.parentNode.removeChild(middle_view);

function scrollActiveLink(scrollY) {
  sections.forEach(function (i) {
    var section_h = i.offsetHeight,
        section_top = i.offsetTop - middle_view_h,
        section_id = i.getAttribute('id');

    if (scrollY > section_top && scrollY <= section_top + section_h) {
      var active_link = header.querySelector("a.header_link[href*='#".concat(section_id, "']"));

      if (active_link) {
        active_link.classList.add('active');
      }
    } else {
      var _active_link = header.querySelector("a.header_link[href*='#".concat(section_id, "']"));

      if (_active_link) {
        _active_link.classList.remove('active');
      }
    }
  });
}

var cards = document.querySelectorAll('.card');

if (cards && isMobile) {
  cards.forEach(function (i) {
    i.addEventListener('click', card_click);
  });
}

function card_click() {
  var _this = this;

  var cards_active = document.querySelectorAll('.card.show_elms');

  if (cards_active) {
    cards_active.forEach(function (i) {
      if (i !== _this) {
        i.classList.remove('show_elms');
      }
    });
  }

  this.classList.toggle('show_elms');
}

var window_scroll = 0;
window.addEventListener('scroll', function () {
  var scroll = this.scrollY;

  if (header && main_pt) {
    if (window_scroll > scroll && scroll !== 0) {
      header.classList.add('bright');
    } else {
      header.classList.remove('bright');
    }

    window_scroll = scroll;

    if (scroll > header_h / 2) {
      header.classList.add('fixed');
      main.style.paddingTop = main_pt + header_h + 'px';
    } else {
      header.classList.remove('fixed');
      main.style.paddingTop = main_pt + 'px';
    }
  }

  if (header_links && sections) {
    scrollActiveLink(scroll);
  }
});
var animeItems = document.querySelectorAll('.anime-items');

if (animeItems.length > 0) {
  var animScroll = function animScroll(params) {
    for (var i = 0; i < animeItems.length; i++) {
      var animeItem = animeItems[i];
      var animeItemHeight = animeItem.offsetHeight;
      var animeItemOffset = getOffset(animeItem).top;
      var animeStart = 2;
      var animeItemPoint = window.innerHeight - animeItemHeight / animeStart;

      if (animeItemHeight > window.innerHeight) {
        animeItemPoint = window.innerHeight - window.innerHeight / animeStart;
      }

      if (pageYOffset > animeItemOffset - animeItemPoint && pageYOffset < animeItemOffset + animeItemHeight) {
        animeItem.classList.add('anime-show');
      } else {
        animeItem.classList.remove('anime-show');
      }
    }
  };

  var getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };

  window.addEventListener('scroll', animScroll);
  setTimeout(function () {
    animScroll();
  }, 500);
}

; // burger menu

var burger = document.querySelector('.burger');

if (burger) {
  burger.addEventListener('click', burger_click);
}

function burger_click() {
  header.classList.toggle('active');
}

var _iterator = _createForOfIteratorHelper(header_links),
    _step;

try {
  var _loop = function _loop() {
    var smoothLink = _step.value;
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      var id = smoothLink.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

;