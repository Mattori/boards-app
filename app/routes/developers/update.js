import Route from '@ember/routing/route';
import EmberObject, {set} from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      dev: this.get('store').findRecord('developer',params.developer_id)
    });
  },
  afterModel(model){
    set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.dev))));
  },
  actions:{
    save(dev,data){
     set(dev,'identity',data.identity);
     dev.save().then(()=>{
       this.transitionTo("developers");
     })
    },
    cancel(){
      this.transitionTo("developers");
    }
  }
});
