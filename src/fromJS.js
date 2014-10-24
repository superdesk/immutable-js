/**
 *  Copyright (c) 2014, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import "Sequence"
/* global Iterable */
/* exported fromJS */

function fromJS(json, converter) {
  if (converter) {
    return _fromJSWith(converter, json, '', {'': json});
  }
  return _fromJSDefault(json);
}

function _fromJSWith(converter, json, key, parentJSON) {
  if (json && (Array.isArray(json) || json.constructor === Object)) {
    return converter.call(parentJSON, key, Iterable(json).map((v, k) => _fromJSWith(converter, v, k, json)));
  }
  return json;
}

function _fromJSDefault(json) {
  if (json && typeof json === 'object') {
    if (Array.isArray(json)) {
      return Iterable.from(json, _fromJSDefault).toVector();
    }
    if (json.constructor === Object) {
      return Iterable.from(json, _fromJSDefault).toMap();
    }
  }
  return json;
}
