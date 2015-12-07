var myApp = angular.module('Web_practice', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	function refresh(){		
		$http({
			method: "GET",
			url: "/contactlist"
		}).then(function(response){
			$scope.students = response.data;
		}, function(){
			console.log('Error is occuer!')
		})		
	};

	refresh();

	$scope.addStudent = function(){
		$http.post('/contactlist', $scope.student).success(function(){
			refresh();
		});		
	}

	$scope.remove = function(id){
		console.log(id)
		$http.delete('/contactlist/' + id).success(function(){
				refresh();
		});	
	}

	$scope.edit = function(id){
		$http.get('/contactlist/' + id).success(function(response){
			$('.controls').addClass('red')
			$('.updating').addClass('working')
			response.age = new Date(response.age)
			$scope.student = response;
		})
	}

	$scope.update = function(){
		console.log($scope.student)
		$http.put('/contactlist/' + $scope.student._id, $scope.student).success(function(){
			$('.controls').removeClass('red')
			$('.updating').removeClass('working')
			refresh();	
		})
	}

	$scope.information = function(student){
		$('#secondModal').modal();
		$scope.current = student;
		console.log(student)
	}

}]);
