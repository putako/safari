var app = angular.module(
	'customers',
	[ // dependencies
		'ngRoute',
		'templates'
	]
);

app.config([
	"$routeProvider",
	function($routeProvider){
		//configure routes here
		$routeProvider.when("/", // making the root a single page app (root relative to ngApp being called)
		{
			controller: "CustomerSearchController",
			templateUrl: "customer_search.html"
		});
	}
]);

app.controller("CustomerSearchController",[
					"$scope", "$http",
			function($scope, $http){
				var page = 0;
				$scope.customers = [];

				$scope.search = function(searchTerm){
					if (searchTerm.length < 3){
						return;
					}
					$http.get("/customers.json",
						{"params": { "keywords": searchTerm, "page": page } }
					).then(
						function(response){
							$scope.customers = response.data;
						},function(response){
							alert("Dave's not here man. " + response.status);
						}
					);
				}

				$scope.previousPage = function(){
					if (page > 0){
						page = page - 1;
						$scope.search($scope.keywords);
					}

				}

				$scope.nextPage = function(){
					page = page + 1;
					$scope.search($scope.keywords);
				}
			}
]);