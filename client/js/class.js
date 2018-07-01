//import '/client/class.html';

Template.classView.helpers({
	classList : function() {
		//console.log(ClassList.find().fetch());
		return ClassList.find();	
	},
	selectedClass :function(){
		classId=this._id;
		var selectedClass=Session.get('selectClass');
		if(classId==selectedClass){
			//console.log(classId);
			return "selected";
		}
	},
	getClass: function(){
		var editClassId = Session.get('selectClass');
		//console.log(editClassId);
		return ClassList.find(editClassId);
	}
});
Template.classView.events({
	'click .class': function(){
		var selectedClass=this._id;
		//console.log(selectedClass);
		Session.set('selectClass',selectedClass);

	},
	'click .makeroutineBtn':function(){
		var selectedClass=Session.get('selectClass');
		if(selectedClass==undefined){
			alert("Please Select a Activity type");
		}else{
			console.log(selectedClass);
			Meteor.defer(function(){
				Router.go('makeRoutine');
			});
		}
	}	
});

Template.makeroutine.onCreated(function makeroutineOnCreated(){
	var selectedClass=Session.get('selectClass');
		if(selectedClass==undefined){
			console.log("Redirecting");
			Meteor.defer(function(){
				Router.go('routine');
			});
		}else{
			console.log(selectedClass);
		}
});
Template.makeroutine.helpers({
	getClass: function(){
		var editClassId = Session.get('selectClass');
		//console.log(editClassId);
		return ClassList.find(editClassId);
	},
	getMember: function(){
		
		return MemberList.find();
	},
	getPeriod: function(){
		return PeriodList.find();
	},
	getInstructor: function(){
		return InstructorList.find();
	},
	

});
Template.makeroutine.events({
	'submit form': function(event){
		event.preventDefault();				//Prevents the browser to refresh as the event type is form submit
		console.log("Form submit");
		console.log(event.target.instructor.value);
		console.log(event.target.period.value);
		console.log(event.target.day.value);
		//console.log(event.target.class.value);
		var instructorVar=event.target.instructor.value;
		var periodVar=event.target.period.value;
		var dayVar=event.target.day.value;
		var classVar=Session.get('selectClass');

		classVar=ClassList.find({'_id': classVar},{fields : {className:1}}).fetch();
		classVar=classVar[0].className;
		//console.log(classVar);
		//Session.set('selectClassName',classVar);

		var teacherConflict=RoutineList.findOne({'instructor_name':instructorVar,'day':dayVar,'period_name':periodVar});
		if(teacherConflict==undefined){
			//console.log(teacherConflict);
			var slotConflict=RoutineList.findOne({'class_name' : classVar,'day':dayVar,'period_name':periodVar});
			console.log(slotConflict);
			if(slotConflict==undefined){
				RoutineList.insert({
				'instructor_name' : instructorVar,
				'period_name' : periodVar,
				'class_name' : classVar,
				'day' : dayVar,
				});
			}else{
				alert("Instructor has been already added at this time slot");
			}
			
			
		}else{
			console.log("Instructor is Busy at this time slot");
			alert("Instructor is Busy at this time slot");
		}
		
	},
	'click .saveRoutine': function(){
		var editClassId = Session.get('selectClass');
		var con=confirm("Want to save the Current Routine?");
		if(con==true){
			ClassList.update({_id:editClassId},{$set:{routineFlag: 'Scheduled'}});
		}
		
	}
});
Template.addClass.helpers({
	classList : function() {
		//console.log(ClassList.find().fetch());
		return ClassList.find();	
	},
	selectedClass :function(){
		classId=this._id;
		var selectedClass=Session.get('selectClassOnAdd');
		if(classId==selectedClass){
			//console.log(classId);
			return "selected";
		}
	},
	selectedClassShow : function(){
		var selectedClass=Session.get('selectClassOnAdd');	//Get the saved session variable of selected Member that we saved in click event
		return ClassList.findOne({_id : selectedClass});
	}
});
Template.addClass.events({
	'click .class': function(){
		var selectedClass=this._id;
		//console.log(selectedClass);
		Session.set('selectClassOnAdd',selectedClass);

	},
	'click .deleteClass':function(){
		var selectedClass=Session.get('selectClassOnAdd');
		var con=confirm("want to delete Activity from database?");
		if(con==true){
			ClassList.remove({ _id : selectedClass});
		}
	}
});
