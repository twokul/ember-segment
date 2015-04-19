/*global analytics*/

import Ember from 'ember';

var Service = Ember.Service;
var Promise = Ember.RSVP.Promise;

export default Service.extend({
  trackAction(actionName, properties, options) {
    return new Promise((resolve) => {
      analytics.track(actionName, properties, options, (data) => {
        resolve(data);
      });
    });
  },

  trackPage(pageName, categoryName, properties, options) {
    return new Promise((resolve) => {
      analytics.page(pageName, categoryName, properties, options, (data) => {
        resolve(data);
      });
    });
  }
});
