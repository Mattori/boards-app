import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
export default Route.extend({
  model(){
    return EmberObject.create();
  },
  actions:{
    save(oldValue,newValue){
      let tag=this.get('store').createRecord('tag',JSON.parse(JSON.stringify(newValue)));
      tag.save().then(()=>{
        this.transitionTo("tags");
      })
      .catch((error)=>console.log(error));
    },
    cancel(){
      this.transitionTo("tags");
    }
  }
});
