# Ember Segment

## How it works

To send data about your page views, the user should add the following code to `router.js`:

```javascript
// only if segment addon is enabled
if (config.segment && config.segment.enabled) {
  // `gatherPageAnalytics` action will be invoked on
  // each transition and it can be handled on route/controller level.
  import { inject : { service } } = Ember;
  
  Router.reopen({
    analytics: service('segment-analytics-service'),
    
    didTransition() {
      const analytics = this.get('analytics');
      analytics.page(this.get('url'));
      this._super(...arguments);
    }
  });
```

## How to use

One way to track your application's pages would be to create a parent route:

```javascript
// base-route.js
import { inject : { service } } = Ember;

export default Ember.Route.extend({
  analytics: service('segment-analytics-service'),

  actions: {
    gatherPageAnalytics(transitions) {
      const length = transitions.length;
      const transition = transitions[length - 1];
      const analytics = get(this, 'analytics');

      analytics.page(transition.name/*categoryName, properties, options*/);
    }
  }
});

// child-route.js
import BaseRoute from 'base-route';

export default BaseRoute.extend();
```

If you want to track an event, let's say after a successful signin you could do
```javascript
// base-route.js
import { inject : { service } } = Ember;

export default Ember.Route.extend({
  analytics: service('segment-analytics-service'),

  actions: {
    transitionAfterSignin({ userName, email }) {
      const analytics = get(this, 'analytics');
      
      analytics.identify({
        userName,
        email
      }); // will be executed first
      
      analytics.track('Signed In'); // will be executed after the previous
      
      return this.transitionTo('signedInArea');
    }
  }
});
```

### Segment Service

`trackAction` and `trackPage` return Promises and do [`track`](https://segment.com/docs/libraries/analytics.js/#track) and [`page`](https://segment.com/docs/libraries/analytics.js/#page) accordingly.

## Configuration

You can configure the addon through `config/environment.js` by adding `segment` object to it.

```javascript
ENV.segment = {
  // api key for reporting
  writeKey: ''
};
```
