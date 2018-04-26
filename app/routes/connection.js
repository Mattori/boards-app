import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  session: service("session"),

  model() {
    return RSVP.hash({
      developer: this.get('store').findAll('developer')
    });
  },

  actions:{
    authenticate() {
      let { login, password} = this.getProperties('login', 'password');
      this.get('session').authenticate('authenticator:oauth2', login, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
