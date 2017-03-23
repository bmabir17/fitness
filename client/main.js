import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
//import '/client/lib/class.html'
//import '/client/lib/class.js';
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
	'submit form' : function(event){		//using submit form event as it enables the user to submit the form by pressing the return key as well as the submit 
		//event.preventDefault();				//Prevents the browser to refresh as the event type is form submit
		console.log("Form submit");
		console.log(event.target.memberName.value);
		console.log(event.target.memberAddress.value);
		console.log(event.target.memberBirthDate.value);
		console.log(event.target.occupation.value);
		console.log(event.target.mobileNo.value);
		console.log(event.target.memberEmail.value);
		console.log(event.target.emergencyName.value);
		console.log(event.target.emergencyMobileNo.value);
		console.log(event.target.admissionType.value);
		console.log(event.target.memberStartDate.value);
		console.log(event.target.sat.checked);
		console.log(event.target.timeSelection.value);

		var memberNameVar=event.target.memberName.value;
		var memberAddressVar=event.target.memberAddress.value;
		var memberBirthVar=event.target.memberBirthDate.value;
		var memberOccupationVar=event.target.occupation.value;
		var memberMobileVar=event.target.mobileNo.value;
		var memberEmailVar=event.target.memberEmail.value;
		var emergencyNameVar=event.target.emergencyName.value;
		var emergencyMobileVar=event.target.emergencyMobileNo.value;
		var admissionTypeVar=event.target.admissionType.value;
		var startDateVar=event.target.memberStartDate.value;
		MemberList.insert({
			memName : memberNameVar,
			memAddress : memberAddressVar,
			memBirth: memberBirthVar,
			memOccupation : memberOccupationVar,
			memMobile : memberMobileVar,
			memEmail : memberEmailVar,
			emergency_name : emergencyNameVar,
			emergency_mobile : emergencyMobileVar,
			addmission_type : admissionTypeVar,
			start_date : startDateVar
		});
		event.target.memberName.value="";
		event.target.memberAddress.value="";
		event.target.memberBirthDate.value="";
		event.target.occupation.value="";
		event.target.mobileNo.value="";
		event.target.memberEmail.value="";
		event.target.emergencyName.value="";
		event.target.emergencyMobileNo.value="";
		event.target.admissionType.value="";
		event.target.memberStartDate.value="";
		Session.set('formSuccess',true);
	},
});
Template.newRegForm.helpers({
	formSuccess : function(){
		var flag=Session.get('formSuccess');
		Session.set('formSuccess',false);
		return flag;
	}
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
	},
	selectedMemberShow : function(){
		var selectedMember=Session.get('selectedMember');	//Get the saved session variable of selected Member that we saved in click event
		return MemberList.findOne({_id : selectedMember});
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
	},
	
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

