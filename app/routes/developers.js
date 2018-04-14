import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      developers:this.get('store').findAll('developer',{include:"projects"}),
      projets:this.get('store').findAll('project'),
      fields:[{name:'identity',caption:'Identité'},{name:'identity',component:'lbl-value',caption:'Identité libellée'}],
      operations:[{icon:'red remove',link:'developers.delete'},{icon:'edit',link:'developers.update'},{icon:'eye',link:'developer'}]
    });
  }
});
