import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

MemberList= new Mongo.Collection('members'); //Downloads the dataBase from the server and save it as a local database
Template.newRegForm.events({
	
});
Template.newRegForm.helpers({
	
});
Template.newRegForm.onCreated(function newRegFormOnCreated(){
	
});

Template.activeMember.helpers({
	activeList : function(){
		return MemberList.find();
	},
	selectedClass :function(){	//This helper is called each time a member is found to be shown on the List
		memberId=this._id;		//This gets the id of the current member id 
		var selectedMember=Session.get('selectedMember');	//Get the saved session variable of selected Member that we saved in click event
		if (memberId==selectedMember) {
			return "selected";
		}
	}
});
Template.activeMember.events({
	'click .member': function(){
		var memberId=this._id;
		Session.set('selectedMember',memberId);					//Save the Id of the member from the click action to session var
		//console.log(selectedMember);
	},
	'dblclick .member': function(){
		console.log("You double clicked .member element");
	},
	'click .editMember': function(){
		var selectedMember=Session.get('selectedMember');		//Get the Id of the Selected Member from Session
		Session.set('editMember',selectedMember);				//Save the selected id to editMember Session Variable
		//var editMember=Session.get('editMember');
		//console.log(editMember);
	}


});
Template.recentMember.helpers({
	recentList : function(){
		return MemberList.find(); //Return all the member list by sorted by order of join time
	},
	selectedClass :function(){	//This helper is called each time a member is found to be shown on the List
		memberId=this._id;		//This gets the id of the current member id 
		var selectedMember=Session.get('selectedMember');	//Get the saved session variable of selected Member that we saved in click event
		if (memberId==selectedMember) {
			return "selected";
		}
	}
});
Template.recentMember.events({
	'click .member': function(){
		var memberId=this._id;
		Session.set('selectedMember',memberId);					//Save the Id of the member from the click action to session var
		//console.log(selectedMember);
	},
});
Template.editMember.helpers({
	getMember : function(){
		var editMemberId = Session.get('editMember');
		//console.log(editMemberId);
		//console.log(MemberList.find(editMemberId).fetch());
		return MemberList.find(editMemberId);
	}
});
