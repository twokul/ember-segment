'use strict';

module.exports = {
  normalizeEntityName: function() { },

  beforeInstall: function() {
    var eventName = 'gatherPageAnalytics';

    var reopens = [
      'if (config.segment && config.segment.enabled) {',
      '  Ember.Route.reopen({',
      '    _actions: {',
      '      gatherPageAnalytics() {',
      '        return true;',
      '      }',
      '    }',
      '  });\n',
      '  Router.reopen({',
      '    didTransition(transitions) {',
      '      this.send(\'' + eventName + '\', transitions);',
      '      this._super.apply(this, transitions);',
      '    }',
      '  });',
      '}\n'
    ];

    return this.insertIntoFile('app/router.js', reopens.join('\n'), {
      before: 'export default'
    });
  },

  afterInstall: function() {
    return this.insertIntoFile('.jshintrc', '    "analytics",', {
      after: '"predef": [\n'
    });
  }
};
