import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      developers:this.get('store').findAll('developer',{include:"projects"}),
      projets:this.get('store').findAll('project'),
      fields:[{name:'identity',caption:'Identité'},{name:'identity',component:'lbl-value',caption:'Identité libellée'}],
      operations:[{icon:'eye',link:'developer'}]
    });
  }
});
