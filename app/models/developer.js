import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.Model.extend({
  identity: DS.attr('string'),
  email: DS.attr('string'),
  login: DS.attr('string'),
  password: DS.attr('string'),
  projects: DS.hasMany('project', {inverse:'owner','async':true}),
  toString(){
    return this.get('identity');
  }
});
