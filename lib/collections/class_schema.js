ClassList= new Mongo.Collection('classes');
ClassList.schema = new SimpleSchema({
	className: {
		type: String,
		//unique : true
	},
	activityType : {type: String},
	activitySeat : {type: String, defaultValue:"30"},
	routineFlag : {type: String, defaultValue:'Not Scheduled'}

});