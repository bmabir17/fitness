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
Router.route('/payment',function () {
	this.render('payment');
});
Router.route('/routine',function () {
	this.render('routine');
});

Router.route('/editMember',function(){
	this.render('editMember');
});
Router.route('/submitSuccess',function(){
	this.render('formSubmitSuccess');
});
Router.route('/AddRoutine', function(){
	this.render('addroutine');
});
Router.route('/AddClass', function(){
	this.render('addClass');
});
Router.route('/AddSubject', function(){
	this.render('addSubject');
});
Router.route('/AddPeriod', function(){
	this.render('addPeriod');
});
