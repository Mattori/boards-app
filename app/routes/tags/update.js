import Route from '@ember/routing/route';
import EmberObject, {set} from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      tagg: this.get('store').findRecord('tag',params.tag_id)
    });
  },
  afterModel(model){
    set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.tagg))));
  },
  actions:{
    save(tagg,data){
     set(tagg,'title',data.title);
     dev.save().then(()=>{
       this.transitionTo("tags");
     })
    },
    cancel(){
      this.transitionTo("tags");
    }
  }
});
