//Initializing AngularJS
var app = angular.module('tweetmachine', ['btford.socket-io']);

//Initializing controller and methods required to get the JSON data from the server
app.controller('MainCtrl',['$scope','$http',function($scope,$http){
  	//Angular gets data
  	var dataUrl = "http://localhost:3000/data"
  	$http.get(dataUrl).success(function(data,status,header,config){
  		$scope.posts = data;
  	});

  	//Send DELETE request to server then reset data for AngularJS $scope
  	$scope.delete = function(id){
  		var tweetUrl = "http://localhost:8080/" + id + "/delete";
  		$http.delete(tweetUrl).success(function(data){
  			$scope.posts = data;
  		});
  	}
}]);


