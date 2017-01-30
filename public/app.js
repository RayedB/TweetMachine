//Initializing AngularJS
var app = angular.module('tweetmachine', ['btford.socket-io','ng-morris-js']);

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
  	//Setting variables for our graph
  	var tweetCounter = 0;
  	var lapseCounter = 0;
  	$scope.counter = [];

  	//Angular gets data from DB
  	var dataUrl = "http://localhost:3000/data"
  	$http.get(dataUrl).success(function(data,status,header,config){
  		$scope.posts = data;
  	});

  	//Collects number of tweet every 60secs and stores this data into $scope.counter
  	function resetCounter(){
  		lapseCounter++;
  		$scope.counter.push({'time':lapseCounter,'tweets':tweetCounter});
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
  		console.log("i'm in");
  		var tweetUrl = "http://localhost:3000/" + id + "/delete";
  		$http.delete(tweetUrl).success(function(data){
  			console.log("tweet gone");
  			$scope.posts.splice($scope.posts.indexOf(index),1);
  		});
  	}

  	myBarChart = {
	  data: [
	    {year: '2015 Q1', sales: 3, net: 2, profit: 1},
	    {year: '2015 Q2', sales: 2, net: 0.9, profit: 0.45},
	    {year: '2015 Q3', sales: 1, net: 0.4, profit: 0.2},
	    {year: '2015 Q4', sales: 2, net: 1, profit: 0.5}
	  ],
	  options: {
	    xkey: 'year',
	    ykeys: ['sales', 'net', 'profit'],
	    labels: ['Sales', 'Net', 'Profit'],
	    barColors: ['#777777', '#e74c3c', 'rgb(11, 98, 164)']
	  }
	};


}]);
