import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
if(Meteor.isServer){
	MemberList= new Mongo.Collection('members'); //Creates a new Database
}
