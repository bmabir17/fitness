Template.routineTemplate.onCreated(function routineTemplateOnCreated(){
	var classVar=Session.get('selectClass');
	if(classVar==undefined){
		console.log("Redirecting")
		Meteor.defer(function(){
			Router.go('routine');
		});
	}else{
		console.log(classVar);
		classVar=ClassList.find({'_id': classVar},{fields : {className:1}}).fetch();
		classVar=classVar[0].className;
		console.log(classVar);
		Session.set('selectClassName',classVar);
	}
	
});
Template.routineTemplate.helpers({
	getClassRoutine: function(day){

		var dayVar = day;
		var classVar=Session.get('selectClassName');
		console.log(classVar);
		console.log(dayVar);
		//console.log("called");
		routine=RoutineList.find({'day':dayVar, 'class_name':classVar} , {
   		 sort: { period_name: 1 }
  		});

		console.log(routine.fetch());
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
	selctedSlot: function(){
		slotId=this._id;
		var selctedSlot=Session.get('selctedSlot');
		if(slotId==selctedSlot){
			console.log("slot selected");
			return "selected";
		}
	},
	selectedSlotShow :function(){
		var selctedSlot=Session.get('selctedSlot');
		return RoutineList.findOne({_id: selctedSlot});
	},
});
Template.routineTemplate.events({
	'click .slot': function(){
		var slotId=this._id;
		Session.set('selctedSlot',slotId);
		console.log(slotId);
	},
	'click .deleteSlot' :function(){
		var selctedSlot=Session.get('selctedSlot');
		var con=confirm("Want to delete this slot?");
		if(con==true){
			RoutineList.remove(selctedSlot);
		}
	},
});