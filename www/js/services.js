angular.module('starter.services',[])
.service('AdminService', function($http, $ionicLoading) {
    this.getAllStudents = function () {
    	var link = "http://localhost/milang/get_all_student.php";
    	$ionicLoading.show();
    	return $http.get(link);  
    }

    this.getAllPositions = function(){
    	var link = "http://localhost/milang/get_all_position.php";
    	$ionicLoading.show();
    	return $http.get(link);  
    };

    this.getAllElectionState = function(){
        var link = "http://localhost/milang/election_state.php";
        $ionicLoading.show();
        return $http.get(link);
    };

})

 .service('ResultService', function($http, $ionicLoading){
       this.getResult = function(pos){
         var link = "http://localhost/milang/get_result.php?pos="+pos;
         $ionicLoading.show();
         return $http.get(link);
       };
 })

.service('StudentService', function($http, $ionicLoading){
   this.getAspirants = function(positionId){
        console.log("service", positionId);
        var link = "http://localhost/milang/get_aspirant.php?id="+positionId;
        $ionicLoading.show();
        return $http.get(link);
   };
});
