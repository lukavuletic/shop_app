var app = angular.module("projekt");

app.controller("AmountController",
function($rootScope, $scope, $http) {
	
	var self = this;
	this.send = function(balance) {
		self.username = $rootScope.username;
		self.balance = balance;

		var data = {username:$rootScope.username, 
					balance:balance
					};

		$http({
			data: data,
			method: "POST",
			url: "/post"
		}).then(function successCallback(response){
			$rootScope.registerSuccess = true;
		}), function errorCallback(response){
			console.log("GRESKA");
			$rootScope.registerSuccess = false;
		}
	}
});
