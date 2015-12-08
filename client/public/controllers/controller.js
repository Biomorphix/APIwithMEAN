var app = angular.module('Web_practice', []);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	function refresh(){		
		$http({
			method: "GET",
			url: "/contactlist"
		}).then(function(response){
			$scope.students = response.data;
			$scope.labs = [];
		}, function(){
			console.log('Error is occuer!')
		})		
	};

	refresh();
	$scope.labs = [];
	

	$scope.addStudent = function(){
		$http.post('/contactlist', [$scope.student, $scope.labs]).success(function(){
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
		$http.put('/contactlist/' + $scope.student._id, [$scope.student, $scope.labs]).success(function(){
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

	var count = 0;
    $scope.addLab = function () {
      $scope.labs.push({ 
       	id: 'id'+count,
       	subject: $scope.lab.subject,
       	ball: $scope.lab.ball
      });
      count += 1;
    };

    $scope.deleteLab = function(id){
    	for(var i = 0; i < $scope.labs.length; i++){
    		if(id == $scope.labs[i].id){
    			$scope.labs.splice(i, 1)
    		}
    	}
    }

    $scope.editLab = function(id){
    	for(var i = 0; i < $scope.labs.length; i++){
    		if(id == $scope.labs[i].id){
    			$('.lab .form-control').addClass('red')
    		}
    	}
    	$('.upd').removeClass('disabled');
    }

    $scope.updateLab = function(id){
    	for(var i = 0; i < $scope.labs.length; i++){
    		if(id == $scope.labs[i].id){
    			$scope.labs[i].subject = $scope.lab.subject;
    			$scope.labs[i].ball = $scope.lab.ball;
    		}
    	}
    	$('.lab .form-control').removeClass('red')   
    	$('.upd').addClass('disabled');  	 
    }	

}]);

