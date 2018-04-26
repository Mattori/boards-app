import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  router: service(),
  notifications: service('notification-messages'),
  store: service(),
  tagName: 'tr',

  identity: undefined,
  email: undefined,
  login: undefined,
  password: undefined,
  passwordConfirm: undefined,

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
  },

  actions: {
    createDev() { // Création d'une ligne
      let store = this.get('store');
      let modelDev = 'developer';

      let getIdentity = this.get('identity');
      let getEmail = this.get('email');
      let getLogin = this.get('login');
      let getPassword = this.get('password');

      let dataDev = {
        'identity': getIdentity,
        'email': getEmail,
        'login': getLogin,
        'password': getPassword,
      };

      if(!getIdentity
      || !getEmail
      || !getLogin
      || !getPassword
      ) {
        this.get('notifications').error("Des données sont vides ! Échec de l'inscription !", {
          autoClear: true,
          clearDuration: 3000,
          htmlContent: true
        });
        console.log("Des données sont vides ! Échec de l'inscription !");
      } else if (getPassword !== this.get('passwordConfirm')) {
        console.log('Erreur !');
      } else {
        let newDev = store.createRecord(modelDev, dataDev);

        newDev.save().then(() => {
          this.get('notifications').success("Succès de l'inscription.", {
            autoClear: true,
            clearDuration: 3000,
            htmlContent: true
          });
          console.log("Succès de l'inscription.");
        });

        this.set('identity', '');
        this.set('email', '');
        this.set('login', '');
        this.set('password', '');
        this.get('router').transitionTo('developers');
      }
    },

    handleFocus(select, e) { // Ouverture du select en appuyant sur Tab lorsque l'on est sur l'input du code
      if (this.focusFollowingInput(e)) {
        select.actions.open();
      }
    }
  },

  focusFollowingInput(e) { // Focus/Focalisation sur le select suivant
    let blurredElement = e.relatedTarget;
    if (isBlank(blurredElement)) {
      return false;
    }
    return !blurredElement.classList.contains('ember-power-select-search-input');
  }
});
