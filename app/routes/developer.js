import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      developer: this.get('store').findRecord('developer',params.developer_id,{include:"projects"})
    });
  }
});
