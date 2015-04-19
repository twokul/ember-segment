# Ember Segment

## How it works

Addon will add the following code to your `router.js`:

```javascript
// only if segment addon is enabled
if (config.segment && config.segment.enabled) {
  // `gatherPageAnalytics` action will be invoked on
  // each transition and it can be handled on route/controller level.
  Router.reopen({
    didTransition(transitions) {
      this.send('gatherPageAnalytics', transitions);
      this._super.apply(this, transitions);
    }
  });

  // to make sure not to break your application
  // default implementation of `gatherPageAnalytics`
  // is provided
  Ember.Route.reopen({
    _actions: {
      gatherPageAnalytics() {
        return true;
      }
    }
  });
}
```

## How to use

One way to track your application's pages would be to create a parent route:

```javascript
// base-route.js
export default Ember.Route.extend({
  actions: {
    gatherPageAnalytics(transitions) {
      const length = transitions.length;
      const transition = transitions[length - 1];

      this.segmentAnalytics.trackPage(transition.name/*categoryName, properties, options*/);
    }
  }
});

// child-route.js
import BaseRoute from 'base-route';

export default BaseRoute.extend();
```

### Segment Service

`trackAction` and `trackPage` return Promises and do [`track`](https://segment.com/docs/libraries/analytics.js/#track) and [`page`](https://segment.com/docs/libraries/analytics.js/#page) accordingly.

## Configuration

You can configure the addon through `config/enironment.js` by adding `segment` object to it.

```javascript
ENV.segment = {
  // enable/disable analytics
  enabled: true,
  // api key for reporting
  writeKey: ''
};
```
