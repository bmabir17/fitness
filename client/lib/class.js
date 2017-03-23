//import '/client/class.html';
ClassList= new Mongo.Collection('Classes');
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
	}
});