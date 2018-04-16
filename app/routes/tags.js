import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
    return RSVP.hash({
      tags: this.get('store').findAll('tag'),
      fields: [{name:'title', caption:'Titre'},{name:'color', caption:'Couleur'}],
      operations: [{icon:'remove red',link:'tags.delete'},{icon:'edit',link:'tags.update'},{icon:'eye',link:'tag'}]
    });
  }
});
