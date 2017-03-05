Router.configure({
	//The default layout
	layoutTemplate: 'mainNav'
});

Router.route('/',function () {
	this.render('start');
});
Router.route('/newMember',function () {
	this.render('newMember');
});
Router.route('/activeMember',function () {
	this.render('activeMember');
});
Router.route('/inactiveMember',function () {
	this.render('inactiveMember');
});