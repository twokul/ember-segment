/*global analytics*/

import Ember from 'ember';

const {
  Logger,
  Service,
  computed,
  on,
  RSVP: {
    Promise 
  }
} = Ember;

const get = Ember.get;

export default Service.extend(Ember.Evented, {
  errorMessage: 'Segment.io is not loaded yet (window.analytics)',

  _queue: computed(() => []),

  init: function() {
    this._super();
    if (!this._hasAnalytics()) {
      Logger.error(get(this, 'errorMessage'));
    }
  },

  _hasAnalytics: function() {
    return !!(analytics && typeof analytics === "object");
  },

  _addSegmentTask(fn, ...args) {
    if (!this._hasAnalytics()) {
      Logger.warn(get(this, 'errorMessage'));
      return;
    }

    const queue = get(this, '_queue');
    queue.push({
      fn,
      args
    });
    this.trigger('addedTask');
  },

  _workTask: on('addedTask', function() {
    const queue = get(this, '_queue');
    let task;

    while (task = queue.shift()) {
      const { fn, args } = task;
      new Promise((resolve) => analytics[fn](...args, resolve));
    }
  }),

  track() {
    this._addSegmentTask('track', ...arguments);
  },

  page() {
    this._addSegmentTask('page', ...arguments);
  },

  identify() {
    this._addSegmentTask('identify', ...arguments);
  },

  alias() {
    this._addSegmentTask('alias', ...arguments);
  }
});
