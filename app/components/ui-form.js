import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  classNames: ['ui form'],
  tagName: 'form',
  smallIcon:computed('isNew',function(){
    return (this.get('isNew'))?'plus':'edit';
  }),
  description:computed('isNew',function(){
    return (this.get('isNew'))?'Ajouter un objet':'Modifier un objet';
  }),
  actions: {
    validation() {
      this.sendAction('validation',this.get('oldValue'),this.get('newValue'));
    },
    cancel() {
        this.sendAction('cancel');
    }
  }
});
