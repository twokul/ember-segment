/*global analytics*/

import Ember from 'ember';

var Promise = Ember.Promise;
var Service = Ember.Service;

export default Service.extend({
  trackAction(actionName, properties, options) {
    return new Promise(function(resolve) {
      analytics.track(actionName, properties, options, function(data) {
        resolve(data);
      });
    });
  },

  trackPage(pageName, categoryName, properties, options) {
    return new Promise(function(resolve) {
      analytics.page(pageName, categoryName, properties, options, function(data) {
        resolve(data);
      });
    });
  }
});