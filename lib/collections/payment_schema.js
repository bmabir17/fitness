PaymentList= new Meteor.Collection('payments');
var paymentSchema= new SimpleSchema({
	'user_id':{
		type: String,
		label: "Members User ID"
	},
	'package_id':{
		type: String,
		label: "Id of the selected Package type"
	},
	'pay_date':{
		type: String,
		label: "date of the payment made",
	},
	'pay_month':{
		type: String,
		label:"Payment made for the Month"
	},
	'amount':{
		type: Number,
		label:"Amount Paid as membership fee",
	},
	'pay_type':{
		type: String,
		label:"Cash, card or Bkash"
	},
	'transaction_id':{
		type: String,
		label: "Bkash or Card Transaction Id",
		optional: true,
	},
	'notes':{
		type:String,
		label: "Additional info",
		optional: true,
	},
});
PaymentList.attachSchema(paymentSchema);