var app = angular.module("projekt");

app.controller("MainController",
function($scope) {
	var self = this;

	this.toggleView = function toggleView(view) {
		self.presentedView = "views/" + view;
	};
	this.toggleView("register.html");
});