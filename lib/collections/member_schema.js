MemberList= new Mongo.Collection('members');
MemberList.schema = new SimpleSchema({
	memName: {
		type: String,

	},
	memAddress: {
		type: String,
	}
});