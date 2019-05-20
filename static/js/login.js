var app = angular.module("projekt");

app.controller("LoginController",
function($rootScope, $scope, $http) {
	var self = this;
	
	this.send = function(username, password) {
		$scope.user={};
		self.username;
		self.password;

		var data = {username:username, password:password};

		$http({
			data: data,
			method: "POST",
			url: "/auth"
		}).then(function successCallback(response){
			$rootScope.loginSuccess = true;
			$rootScope.loginError = false;
			$rootScope.token = response.data.token;
			$rootScope.username = response.config.data.username;
			if(response.data.success == false) {
				$rootScope.loginError = true;
				$rootScope.loginSuccess = false;
				$rootScope.username = null;
			}
		}), function errorCallback(response){
			console.log("GRESKA");
			$rootScope.registerSuccess = false;
		}

		$scope.user.username = data.username;
	}
});
