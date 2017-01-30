//Initializing AngularJS
var app = angular.module('tweetmachine', ['btford.socket-io','angular.morris']);

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

//Initializing controller
app.controller('MainCtrl',['$scope','$http','socketio',function($scope,$http,socketio){
  	//Setting variables for our graph
  	var tweetCounter = 0;
  	var lapseCounter = 0;
  	$scope.counter = [];
    $scope.lang = [];
    $scope.xaxis = '1 minute';
    $scope.yaxis = '["tweets"]';

  	//Angular gets data from DB
  	var dataUrl = "http://localhost:3000/data"
  	$http.get(dataUrl).success(function(data,status,header,config){
  		$scope.posts = data;
  	});

  	//Collects number of tweet every 60secs and stores this data into $scope.counter
  	function resetCounter(){
  		lapseCounter++;
  		$scope.counter.push({'1 minute':lapseCounter,'tweets':tweetCounter});
  		tweetCounter = 0;
  	}
  	setInterval(resetCounter,60000);

  	//Catch streamHandler socket signal and push data into $scope.post
  	socketio.on('tweet',function(msg){
  		$scope.posts.push(msg);
  		tweetCounter++;
  	})

  	//Send DELETE request to server then reset data for AngularJS $scope
  	$scope.delete = function(index,id){
  		var tweetUrl = "http://localhost:3000/" + id + "/delete";
  		$http.delete(tweetUrl).success(function(data){
  			$scope.posts.splice($scope.posts.indexOf(index),1);
  		});
  	}

}]);
