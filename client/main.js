import {GoogleMaps} from 'meteor/dburles:google-maps'



  conn=DDP.connect("http://localhost:3000")
  test=conn.call('test')
  console.log(test)
  console.log('asdas');
  locDb=new Mongo.Collection('LocationDb',conn)
  subscribe=conn.subscribe('getLocation')
  console.log(subscribe.ready())

Meteor.startup(function(){
  GoogleMaps.load();
});
