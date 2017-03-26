//import '/client/class.html';

Template.classView.helpers({
	classList : function() {
		console.log(ClassList.find().fetch());
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
		console.log(editClassId);
		return ClassList.find(editClassId);
	}
});
Template.classView.events({
	'click .class': function(){
		var selectedClass=this._id;
		console.log(selectedClass);
		Session.set('selectClass',selectedClass);
	},
	
});
Template.addroutine.helpers({
	getClass: function(){
		var editClassId = Session.get('selectClass');
		console.log(editClassId);
		return ClassList.find(editClassId);
	},
	getMember: function(){
		return MemberList.find();
	},
	getPeriod: function(){
		return PeriodList.find();
	},
	getSubject: function(){
		return SubjectList.find();
	},
	getTeacherError: function(){
		console.log("in error function");
		if(Session.get('teacherBusy')){
			console.log("raised error");
			//Session.set('teacherBusy',false);
			return true;
		}
	},
});
Template.addroutine.events({
	'submit form': function(event){
		event.preventDefault();				//Prevents the browser to refresh as the event type is form submit
		console.log("Form submit");
		console.log(event.target.subject.value);
		console.log(event.target.member.value);
		console.log(event.target.period.value);
		console.log(event.target.day.value);
		//console.log(event.target.class.value);
		var subjectVar=event.target.subject.value;
		var memberVar=event.target.member.value;
		var periodVar=event.target.period.value;
		var dayVar=event.target.day.value;
		var classVar=Session.get('selectClass');
		console.log(classVar);
		classVar=ClassList.find({'_id': classVar},{fields : {className:1}}).fetch();
		console.log(classVar[0].className);
		classVar=classVar[0].className
		Session.set('selectClassName',classVar);

		var teacherConflict=RoutineList.findOne({'member_name':memberVar,'day':dayVar,'period_name':periodVar});
		if(teacherConflict==undefined){
			console.log(teacherConflict);
			RoutineList.insert({
				'subject_name' : subjectVar,
				'member_name' : memberVar,
				'period_name' : periodVar,
				'class_name' : classVar,
				'day' : dayVar,
			});
			Session.set('teacherBusy',true);
		}else{
			console.log("Teacher is Busy at this time slot")
		}
		
	},
});
