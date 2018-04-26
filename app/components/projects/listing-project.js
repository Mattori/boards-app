import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  store: service('store'),
  tagName: 'tbody',

  removeproj: undefined,

  name: undefined,
  description: undefined,
  startDate: undefined,
  dueDate: undefined,
  owner: undefined,

  init() { // Fonction d'initialisation des arguments
    this.initialize();
    this._super(...arguments);
    this.errors = [];

    let store = this.get('store');
    let modelProj = 'project';
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

  actions: { // Actions utilisées
    removeRow(removeProj) { // Suppression d'une ligne
      removeProj.destroyRecord();
      removeProj.set('popvalidate', false);
      console.log('Enregistrement supprimé avec succès.');
    },

    validateEdit(record) { // Validation de l'édition d'une ligne
      let getId = record.get('id');
      let getName = record.get('name');
      let getDescription = record.get('description');
      let getStartDate = record.get('startDate');
      let getDueDate = record.get('dueDate');
      let getOwner = record.get('owner');

      let retour = false;
      let retour2 = false;

      let existingRows = this.get('projects');
      let existingOwner = existingRows.filterBy('owner', getOwner);

      existingOwner.forEach(function(value) {
        if((value.get('id') !== getId)
        && (value.get('name') === getName)) {
          console.log("Le nom du projet existe déjà ! Échec de l'enregistrement !");
          retour = true;
        }
      })

      if(!getName
      || !getDescription
      || !getOwner)
      {
        console.log("Des données sont vides ! Échec de l'enregistrement !");
      } else if(!retour && !retour2) {
        record.save().then(function() {
          record.set('edit', false);
        });
        console.log('Enregistrement modifié avec succès.');
      }
    },

    resetEdit(record) { // Rétablissement des valeurs initiales des données d'une ligne
      record.rollbackAttributes();
      console.log("Données initiales rétablies.");
    },

    openEdit(openEd) { // Ouverture de l'édition d'une ligne
      openEd.set('edit', true);
    },

    openProj(openPop) { // Ouverture de la modale de confirmation de suppression d'une ligne
      this.set('proj', openPop);
      openPop.set('popvalidate', true);
    },

    closeProj(closePop) { // Ouverture de la modale de confirmation de suppression d'une ligne
      this.set('proj', closePop);
      closePop.set('popvalidate', false);
    },

    handleFocus(select, e) { // Ouverture du select en appuyant sur Tab lorsque l'on est sur l'input du code
      if (this.focusFollowingInput(e)) {
        select.actions.open();
      }
    },

    openModal(name) {
      $('.ui.' + name + '.modal').modal('show');
    },

    approveModal(element, component) {
      alert('approve ' + component.get('name'));
      return false;
    },

    denyModal(element, component) {
      alert('deny ' + component.get('name'));
      return true;
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
