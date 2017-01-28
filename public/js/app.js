var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
'$scope','$http',
function($scope,$http){
  $scope.test = 'Hello Mike!';

  var posts = {}
  $http.get('http://localhost:8080/posts').success(function(data,status,header,config){
    $scope.posts = data;
  });

  $scope.addPost = function() {
  	if (!$scope.message || $scope.message ===''){ return; }
  	$scope.posts.push({author:'Alex Smith', content: $scope.message, upvotes: 0})
    $http.post("http://localhost:8080/posts")
  	$scope.message="";
  	$scope.link="";
  	$scope.title="";
  }

  $scope.upVote = function(post) {
  	post.upvotes ++;
  }

  $scope.downVote = function(post) {
  	post.upvotes --;
  }

}]);