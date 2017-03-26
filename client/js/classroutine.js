Template.routineTemplate.helpers({
	getClassRoutine: function(day){

		var dayVar = day;
		var classVar=Session.get('selectClassName');
		console.log(dayVar);
		
		console.log("called");
		routine=RoutineList.find({'day':dayVar, 'class_name':classVar} , {
   		 sort: { period_name: 1 }
  		});

		console.log(routine);
		return routine;
		
		//return ClassList.find(editClassId);
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
});