import emberQunit from 'ember-qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';
import sinon from 'sinon';

const { moduleFor } = emberQunit;

moduleFor('service:segment-analytics-service', 'service:segment-analytics-service', {
  beforeEach() {
    window.analytics = {};
  }
});

test('it calls track', function(assert) {
  assert.expect(1);
  const expectedReturn = true;
  window.analytics.track = this.stub().callsArgOnWith(3, {}, expectedReturn);

  const action = ['Test', {
    prop1: 'testProp1',
    prop2: 'testProp2'
  }, {
    integrations: {
      'All': false,
      'Mixpanel': true,
      'KISSmetrics': true
    }
  }];

  const segmentService = this.subject();

  segmentService.track(...action);

  assert.ok(window.analytics.track.calledOnce, 'the service gets called correctly');
});

test('it calls page', function(assert) {
  assert.expect(1);
  const expectedReturn = true;

  window.analytics.page = this.stub().callsArgOnWith(4, {}, expectedReturn);

  const page = ['TestCategory', 'TestName', {}, {}];

  const segmentService = this.subject();

  segmentService.page(...page);
  assert.ok(window.analytics.page.calledOnce, 'the service gets called correctly');
});

test('it calls identify', function(assert) {
  assert.expect(1);
  const expectedReturn = true;

  window.analytics.identify = this.stub().callsArgOnWith(3, {}, expectedReturn);

  const user = ['TestUser', { name: 'test'}, {}];

  const segmentService = this.subject();

  segmentService.identify(...user);
  assert.ok(window.analytics.identify.calledOnce, 'the service gets called correctly');
});

test('it calls alias', function(assert) {
  assert.expect(1);
  const expectedReturn = true;

  window.analytics.alias = this.stub().callsArgOnWith(3, {}, expectedReturn);

  const alias = ['testId', 'previousId', {}];

  const segmentService = this.subject();

  segmentService.alias(...alias);
  assert.ok(window.analytics.alias.calledOnce, 'the service gets called correctly');
});

test('it works tasks in order', function(assert) {
  assert.expect(1);
  const expectedReturn = true;

  window.analytics.page = this.stub().callsArgOnWith(4, {}, expectedReturn);
  window.analytics.track = this.stub().callsArgOnWith(3, {}, expectedReturn);

  const page = ['TestCategory', 'TestName', {}, {}];

  const segmentService = this.subject();

  segmentService.page(...page);

  const action = ['Test', {
    prop1: 'testProp1',
    prop2: 'testProp2'
  }, {
    integrations: {
      'All': false,
      'Mixpanel': true,
      'KISSmetrics': true
    }
  }];

  segmentService.track(...action);

  sinon.assert.callOrder(window.analytics.page, window.analytics.track);
});
