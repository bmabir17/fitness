Template.activeMember.helpers({
	activeList : function(){
		return MemberList.find();
	},
	selectedMember :function(){	//This helper is called each time a member is found to be shown on the List
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
	},
	'click .addRoutine': function(){
		var selectedMember=Session.get('selectedMember');		//Get the Id of the Selected Member from Session
		Session.set('addMemRoutine',selectedMember);				//Save the selected id to editMember Session Variable
		var editMember=Session.get('editMember');
		console.log(editMember);
	},
	'click .deleteMember' : function(){
		var selectedMember=Session.get('selectedMember');
		//alert("removing Member from database");
		var con=confirm("want to remove member from database?");
		if(con==true){
			MemberList.remove(selectedMember);
		}
		
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

Template.memberRoutineSelect.helpers({
	getMember : function(){
		var editMemberId = Session.get('memberId');
		//console.log(editMemberId);
		//console.log(MemberList.find(editMemberId).fetch());
		return MemberList.find(editMemberId);
	},
	getActivity : function(){
		//console.log( ClassList.find().fetch());
		return ClassList.find();
	}
});