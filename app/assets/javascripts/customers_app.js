var app = angular.module('customers',[]);

app.controller("CustomerSearchController",
				["$scope", "$http",
			function($scope, $http){
		$scope.customers = [];
		$scope.search = function(searchTerm){
			$http.get("/customers.json",
				 { "params": { "keywords": searchTerm } }
				).then(
					function(response) {//true
						$scope.customers = response.data;
					},
					function(response) {//false
						alert("Dave's not here, man. " + response.status);
					}
				);
		}
	}
]);