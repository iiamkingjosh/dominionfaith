'use strict'
// React 18 shim for react/compiler-runtime (used by packages built with React Compiler)
const { useState } = require('react')

const $empty = Symbol.for('react.memo_cache_sentinel')

exports.c = function (size) {
  return useState(function () {
    const $ = new Array(size)
    for (let i = 0; i < size; i++) {
      $[i] = $empty
    }
    return $
  })[0]
}
