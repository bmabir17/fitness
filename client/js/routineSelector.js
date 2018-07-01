
Template.content.onCreated(function() {
	var data=this.data;
	//console.log("onCreated",data);
	var selectedRoutine_id=[]; //Used to store the _id of the selected routine
	var selectedRoutine_msg=[]; //Used to store the msg to be displayed 
	Session.set("routineArray_id",selectedRoutine_id);
	Session.set("routineArray_msg",selectedRoutine_msg);
});
Template.content.onRendered(function(){
	var data=this.data;
	//console.log("onRendered",data);
});
Template.content.helpers({
	exclamation:function(){
		var data=Template.instance().data;
		return "That's a lot of"+data.contentType+"!";
	},
	getSelectedRoutine: function(){
		var selectedRoutine_id=Session.get("routineArray_id");
		var selectedRoutine_msg=Session.get("routineArray_msg");
		//console.log(selectedRoutine_id);
		//console.log(selectedRoutine_msg);
		
		return selectedRoutine_msg;
	},
	getMember : function(){
		var editMemberId = Session.get('memberId');
		//console.log(editMemberId);
		//console.log(MemberList.find(editMemberId).fetch());
		return MemberList.find(editMemberId);
	},
});
Template.content.events({
	'click .li-selectRoutine':function(event,template){
		//console.log("Activity name:",this.class_name);
		//console.log("Instructor:",this.instructor_name);
		var selectedRoutine_id=Session.get("routineArray_id");
		var selectedRoutine_msg=Session.get("routineArray_msg");
		//console.log(selectedRoutine_id.indexOf(this._id));
		//console.log(this);
		if(selectedRoutine_id.indexOf(this._id)==-1){
			
			selectedRoutine_id.push(this._id);
			selectedRoutine_msg.push(this.class_name+" On: "+this.day+" Time: "+this.period_name+" Taken by: "+this.instructor_name);
			Session.set("routineArray_id",selectedRoutine_id);
			Session.set("routineArray_msg",selectedRoutine_msg);
			//console.log(selectedRoutine_id);
			//console.log(selectedRoutine_msg);
		}else{
			alert("Already Added");
		}
		

	},
	'click .li-finalRoutine':function(event,template){
		//console.log("final Routine");
		var selectedRoutine_id=Session.get("routineArray_id");
		var selectedRoutine_msg=Session.get("routineArray_msg");
		//console.log(this.toString());
		var tempIdFound=selectedRoutine_msg.indexOf(this.toString());
		//console.log(tempIdFound);
		if(tempIdFound>=0){
			selectedRoutine_id.splice(tempIdFound,1);
			selectedRoutine_msg.splice(tempIdFound,1);
			Session.set("routineArray_id",selectedRoutine_id);
			Session.set("routineArray_msg",selectedRoutine_msg);
			//console.log(selectedRoutine_id);
			//console.log(selectedRoutine_msg);
		}

	},
	
});

Template.saveMemRoutine.events({
	'click .btn-saveRoutine':function(event,template){
		var selectedRoutine_id=Session.get("routineArray_id");
		var selectedRoutine_msg=Session.get("routineArray_msg");
		var memIdVar=Session.get('memberId');
		console.log(memIdVar);
		
		console.log(MemberList.update(memIdVar,{
			$set:{
				class_routine_id :{selectedRoutine_id},
				class_routine_msg : {selectedRoutine_msg}
			}
		}));
		
	},
});
