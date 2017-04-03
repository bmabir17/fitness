Template.addInstructor.helpers({
	instructorList : function() {
		console.log(InstructorList.find().fetch());
		return InstructorList.find();	
	},
	selectedInstructor :function(){
		instructorId=this._id;
		var selectedInstructor=Session.get('selectInstructorOnAdd');
		if(instructorId==selectedInstructor){
			//console.log(classId);
			return "selected";
		}
	},
	selectedInstructorShow : function(){
		var selectedInstructor=Session.get('selectInstructorOnAdd');	//Get the saved session variable of selected Member that we saved in click event
		return InstructorList.findOne({_id : selectedInstructor});
	},
});
Template.addInstructor.events({
	'click .instructor': function(){
		var selectedInstructor=this._id;
		console.log(selectedInstructor);
		Session.set('selectInstructorOnAdd',selectedInstructor);

	},
	'click .deleteInstructor':function(){
		var selectedInstructor=Session.get('selectInstructorOnAdd');
		var con=confirm("want to delete Instructor from database?");
		if(con==true){
			InstructorList.remove({ _id : selectedInstructor});
		}
	},
});