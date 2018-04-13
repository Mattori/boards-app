import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Component.extend({
  store: service(),
  tagName: 'tr',

  name: undefined,
  description: undefined,
  sDate: undefined,
  dDate: undefined,
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
      let getSDate = this.get('sDate');
      let getDDate = this.get('dDate');
      let getOwner = this.get('owner');
      let getDevelopers = this.get('developers');

      let dataProject = {
        'name': getName,
        'description': getDescription,
        'sDate': getSDate,
        'dDate': getDDate,
        'owner': getOwner,
      };

      if(!getName
      || !getDescription
      ) {
        console.log("Des données sont vides ! Échec de l'enregistrement !");
      } else {
        let newProject = store.createRecord(modelProject, dataProject);

        newProject.save().then(() => {
          console.log('Enregistrement sauvegardé avec succès.');
        });

        this.set('name', '');
        this.set('description', '');
        this.set('sDate', '');
        this.set('dDate', '');
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
