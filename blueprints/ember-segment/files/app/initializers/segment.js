import Ember from 'ember';
import config from '../config/environment';

export default {
  name: 'segment-service',

  initialize(container, application) {
    if (config.environment !== 'test') {
      container.injection('router:main', 'segmentAnalytics', 'service:segment-api');
      application.inject('component', 'segmentAnalytics', 'service:segment-api');
      application.inject('controller', 'segmentAnalytics', 'service:segment-api');

      Ember.Router.reopen({
        didTransition(transitions) {
          const length = transitions.length;
          const transition = transitions[length - 1];
          const name = (transition.params && transition.params.id) ?
            `${Ember.String.classify(transition.name)} ${transition.params.id}`
            :
            transition.name;

          this.segmentAnalytics.trackPage(name);
        }
      });
    }
  }
};