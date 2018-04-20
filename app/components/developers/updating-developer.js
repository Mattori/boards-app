import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  store: service('store'),

  identity: undefined,
  email: undefined,
  login: undefined,
  password: undefined,

  init() { // Fonction d'initialisation des arguments
    this._super(...arguments);
    this.errors = [];

    let store = this.get('store');
    let modelProj = 'project';
  },

  actions: { // Actions utilisées
    validateEdit(record) { // Validation de l'édition du formulaire
      let getIdentity = record.get('identity');
      let getEmail = record.get('email');
      let getLogin = record.get('login');
      let getPassword = record.get('password');

      if(!getIdentity
      || !getEmail
      || !getLogin
      || !getPassword)
      {
        console.log("Des données sont vides ! Échec de l'enregistrement !");
      } else {
        record.save();
        console.log('Enregistrement modifié avec succès.');
      }
    },

    resetEdit(record) { // Rétablissement des valeurs initiales des données d'une ligne
      record.rollbackAttributes();
      console.log("Données initiales rétablies.");
    },

    openProj(openPop) { // Ouverture de la modale de confirmation de suppression d'une ligne
      this.set('proj', openPop);
      openPop.set('popvalidate', true);
    },

    closeProj(closePop) { // Ouverture de la modale de confirmation de suppression d'une ligne
      this.set('proj', closePop);
      closePop.set('popvalidate', false);
    }
  }
});
