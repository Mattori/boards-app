import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      projects:this.get('store').findAll('project',{include:"developers"}),
      owners:this.get('store').findAll('developer'),
      fields:[{name:'name', caption:'Nom'},{name:'description', caption:'Description'},{name:'sDate',caption:'Date de début'},{name:'dDate',caption:'Date butoir'},{name:'owner.identity',caption:'Propriétaire'}],
      operations:[{icon:'eye',link:'project'}]
    });
  },

  actions: {
    testAddNew(newProject) {
      console.log(newProject);
    }
  }
});
