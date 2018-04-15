import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  store: service(),

  init() {
    this.initialize();
    this._super();
  },

  initialize() {
    this.devs().then((data) => {
      this.set('owners', data);
    });
  },

  devs() {
    const store = this.get('store');
    return store.findAll('developer');
  }
});
