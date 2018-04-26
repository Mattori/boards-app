import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  notifications: service('notification-messages'),
  store: service(),
  tagName: 'tr',

  name: undefined,
  description: undefined,
  startDate: (function(key, value) {
    if (value) {
      return this.set('date', new Date(value));
    } else {
      return (this.get('date') || new Date()).toISOString().substring(0, 10);
    }
  }).property('date'),
  dueDate: undefined,
  owner: undefined,

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
    createProject() { // Création d'une ligne
      let store = this.get('store');
      let modelProject = 'project';

      let getName = this.get('name');
      let getDescription = this.get('description');
      let getStartDate = this.get('startDate');
      let getDueDate = this.get('dueDate');
      let getOwner = this.get('owner');
      let getDevelopers = this.get('developers');

      let dataProject = {
        'name': getName,
        'description': getDescription,
        'startDate': getStartDate,
        'dueDate': getDueDate,
        'owner': getOwner,
      };

      if(!getName
      || !getDescription
      ) {
        this.get('notifications').error("Des données sont vides ! Échec !", {
          autoClear: true,
          clearDuration: 3000,
          htmlContent: true
        });
        console.log("Des données sont vides ! Échec !");
      } else {
        let newProject = store.createRecord(modelProject, dataProject);

        newProject.save().then(() => {
          this.get('notifications').success("Succès de l'enregistrement.", {
            autoClear: true,
            clearDuration: 3000,
            htmlContent: true
          });
          console.log('Enregistrement sauvegardé avec succès.');
        });

        this.set('name', '');
        this.set('description', '');
        this.set('dueDate', '');
        this.set('owner', '');
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
