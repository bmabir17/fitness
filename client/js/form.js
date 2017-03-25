Template.newRegForm.events({
	'submit form' : function(event){		//using submit form event as it enables the user to submit the form by pressing the return key as well as the submit 
		event.preventDefault();				//Prevents the browser to refresh as the event type is form submit
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
		Metero.defer(function(){
			Router.go('formSubmitSuccess');
		});
		
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