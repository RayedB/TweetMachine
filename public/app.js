//Initializing AngularJS
var app = angular.module('tweetmachine', ['btford.socket-io']);

//Building factory in order to use socket.io in angular
app.factory('socketio',['$rootScope', function($rootScope){
	var socket = io.connect();
	return {
		on: function(eventName,callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});
		}
	};
}]);

//Initializing controller and methods required to get the JSON data from the server
app.controller('MainCtrl',['$scope','$http','socketio',function($scope,$http,socketio){
  	//Angular gets data
  	var dataUrl = "http://localhost:3000/data"
  	$http.get(dataUrl).success(function(data,status,header,config){
  		$scope.posts = data;
  	});

  	//Catch streamHandler socket signal and push data into $scope.post
  	socketio.on('tweet',function(msg){
  		console.log(msg);
  		$scope.posts.push(msg);
  	})

  	//Send DELETE request to server then reset data for AngularJS $scope
  	$scope.delete = function(id){
  		var tweetUrl = "http://localhost:8080/" + id + "/delete";
  		$http.delete(tweetUrl).success(function(data){
  			$scope.posts = data;
  		});
  	}
}]);


