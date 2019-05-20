var app = angular.module("projekt");

app.controller("RegisterController",
function($rootScope, $scope, $http) {
	this.username ="prazno";
	this.password = "prazno";
	var self = this;

	this.active = 0;
	this.selectedClass = "plavo";

	this.send = function(username, password, numcard) {
		self.username = username;
		self.password = password; 

		var data = {username:username, password:password};

		$http({
			data: data,
			method: "POST",
			url: "/register"
		}).then(function successCallback(response){
			$rootScope.registerSuccess = true;
			if(response.data.success == false) {
				$rootScope.registerSuccess = false;
			}
		}), function errorCallback(response){
			console.log("GRESKA");
			$rootScope.registerSuccess = false;
		}
	}
});
