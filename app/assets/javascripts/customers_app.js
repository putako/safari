var app = angular.module(
	'customers',
	[ // dependencies
		'ngRoute',
		'ngResource',
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
		}).when("/:id", // showing details of customer using id
		{
			controller: "CustomerDetailController",
			templateUrl: "customer_detail.html"
		});
	}
]);

app.controller("CustomerSearchController",[
			"$scope", "$http", "$location",
	function($scope, $http, $location){
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

		$scope.viewDetails = function(customer){
			$location.path("/" + customer.id);
		}
	}
]);

app.controller("CustomerDetailController",
			["$scope", "$routeParams", "$resource",
	function($scope, $routeParams, $resource){
			$scope.customerId = $routeParams.id;
			var Customer = $resource('/customers/:customerId.json')
			$scope.customer = Customer.get({"customerId": $scope.customerId})
		}
]);

app.controller("CustomerCreditCardController",
				["$scope", "$resource",
		function($scope, $resource){
			var CreditCardInfo = $resource('/fake_billing.json')
			//$scope.creditCard = CreditCardInfo.get({ "cardholder_id": 1234}) //change this hardcoded value to dynamic later
			$scope.setCardholderId = function(cardholderId){
				$scope.creditCard = CreditCardInfo.get({
					"cardholder_id": cardholderId
				})
			}
		}
]);