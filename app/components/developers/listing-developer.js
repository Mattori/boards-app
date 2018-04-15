import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  store: service('store'),
  tagName: 'tbody',

  removedev: undefined,

  identity: undefined,

  init() { // Fonction d'initialisation des arguments
    this.initialize();
    this._super(...arguments);
    this.errors = [];

    let store = this.get('store');
    let modelDev = 'developer';
  },

  initialize() {
    this.projs().then((data) => {
      this.set('projets', data);
    });
  },

  projs() {
    const store = this.get('store');
    return store.findAll('project');
  }
});
