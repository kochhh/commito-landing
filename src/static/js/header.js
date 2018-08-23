'use strict';

var header = document.querySelector('.header');
var pageWrap = document.querySelector('.wrapper');
var lastScrollTop = 0;

function debounce(func, wait) {
  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(context, args);
    }, wait);
  };
}

function onScroll() {
  var currScrollTop = pageWrap.scrollTop;
  var isScrollingDown = currScrollTop > lastScrollTop;
  var isHeaderVisible = currScrollTop < header.height;

  header.classList.toggle('is-hidden', isScrollingDown && !isHeaderVisible);
  lastScrollTop = currScrollTop;
}

pageWrap.addEventListener('scroll', debounce(onScroll, 16));