PackageList =new Meteor.Collection('packages');
var packageSchema= new SimpleSchema({
	'package_name':{
		type: String,
		label: "Name of the package",
	},
	'package_fee':{
		type: Number,
		label: "Fee for the package",
	},
	'duration':{
		type: String,
		label: "Duration of the package",
	},

});
PackageList.attachSchema(packageSchema);