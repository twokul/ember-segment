import config from '../config/environment';
import SegmentAnalyticsService from 'ember-segment/services/segment-analytics-service';

export default {
  name: 'segment-analytics-service',

  initialize(container, application) {
    if (config.segment.enabled) {
      application.register('service:segment-analytics', SegmentAnalyticsService, { singleton: true });

      application.inject('route',      'segmentAnalytics', 'service:segment-analytics');
      application.inject('controller', 'segmentAnalytics', 'service:segment-analytics');
      application.inject('component',  'segmentAnalytics', 'service:segment-analytics');
    }
  }
};
