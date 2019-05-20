var app = angular.module("projekt");

app.controller("ListController", function($rootScope, $scope, $http) {

	var self = this;
	this.users = [];
	getUsers();

	this.log = function (user) {
		console.log(user);
	}

	function getUsers() {
		var headers = {'X-Auth-Token': $rootScope.token};
		var request = {method: "GET", url:"/api/users", headers: headers};
		$http(request)
		.then(function successCallback(response) {
			self.users = response.data;
			$rootScope.listError = false;
		})
		.catch(function errorCallback(response) {
			console.log("getUsers ERROR", response);
			$rootScope.listError = true;
		});
	}
});