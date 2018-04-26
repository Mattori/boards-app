import Service from '@ember/service';

export default Service.extend({
  currentUser: null,
  login(developer){
    this.set('currentUser', developer)
  },
  logout(){
    this.set('currentUser', null)
  }
});
