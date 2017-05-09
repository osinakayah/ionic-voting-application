angular.module('starter.controllers', ['ionic', 'ui.router'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('Home', function($scope, $localStorage, $state, $ionicViewService, $location){
  $scope.matricNumber = $localStorage.userMatric;
  $scope.fullname = $localStorage.userName;

  $scope.signOut = function(){
    $localStorage.userId=0;
    $state.go('login');
  };
})

.controller('AuthCtrl', function($scope, $http, $ionicLoading, $localStorage, $state, $location, $ionicViewService, $window, $ionicPopup){

  var u = $localStorage.userId;
  var ty = $localStorage.accType;
  console.log(1,u);
  if(u!=0 && typeof (u) != 'undefined'){
    console.log(2,u);
    if(ty==1){
      console.log(3,ty);
      $location.path("/admin/add_student");
    }
    else{
      console.log(4,ty);
      $location.path("/app/profile");
    }
    $ionicViewService.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    
  }

  $scope.forgotData = {};
  $scope.doForget = function(){
    console.log(JSON.stringify($scope.forgotData));
    var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: 'Password Sent'
      });
  };

  $scope.loginData = {};
  $scope.loginData.noti = false;
  $scope.doLogin = function(){
    console.log('e', JSON.stringify($scope.loginData))
    var link = "http://localhost/milang/login.php";
    $ionicLoading.show();
    $prom = $http.post(link, JSON.stringify($scope.loginData));
    $prom.success(function(res){
      console.log('res', res);
      $ionicLoading.hide();
      if(res.code==1){
        $localStorage.userId = res.id;
         
        $localStorage.userName = res.name;
        $localStorage.userMatric = res.matric;
        $localStorage.accType = res.acc_type;
        $localStorage.email = res.email;
        if(res.acc_type==1){//its an admin
           $state.go('admin.add_student');
        }
        else{
          $window.location.href = "/#/app/profile";
          //$state.go('app.profile');
        }
        
      }
      else{
        $scope.loginData.noti = true;
      }
    });
    $prom.error(function(err){
      console.log('res', err);
      $ionicLoading.hide();
    });
    
  };
})

.controller('AdminCtrl', function($scope, $http, $ionicLoading, $ionicPopup, AdminService, $state, $ionicModal){
  $prom = AdminService.getAllStudents();

  $prom.success(function(res){
    //console.log('res', JSON.stringify(res));
    $scope.allStudents = res;
    $ionicLoading.hide();
  });

  $prom = AdminService.getAllPositions();
  $prom.success(function(res){
    console.log('res', res);
    $scope.allPositions = res;
  });



  $scope.registerStudentData = {};
  $scope.doRegisterStudent = function(){
    console.log(1, JSON.stringify($scope.registerStudentData));
    var link = "http://localhost/milang/add_student.php";
    $ionicLoading.show();
    $prom = $http.post(link, JSON.stringify($scope.registerStudentData));
    $prom.success(function(res){
      console.log('res', res);
      if(res.code==1){
        var alertPopup = $ionicPopup.alert({
          title: 'Response',
          template: res.msg
        });
      }
      $ionicLoading.hide();
    });
    $prom.error(function(err){
      console.log('res', err);
      $ionicLoading.hide();
    });
  };


  $ionicModal.fromTemplateUrl('templates/admin_add_contestant.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  var studentToBeAssignedContestionPost;
  $scope.addToElection = function(student){
    studentToBeAssignedContestionPost = student;
    $scope.studentName = student.name;
    $scope.modal.show();
  };
  $scope.closeModal = function(){
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function(){
    $scope.modal.remove();
  });

  $scope.choice = {};
  $scope.addStudentToPosition = function(){
    console.log(1,JSON.stringify(studentToBeAssignedContestionPost));
    console.log(2, JSON.stringify($scope.choice));
    var link = "http://localhost/milang/add_contestant.php";
    $ionicLoading.show();
    $prom = $http.post(link,  {user_id:studentToBeAssignedContestionPost.id, position_id:$scope.choice.pos});
    $prom.success(function(res){
      console.log('res', res);
      if(res.code==1){
        var alertPopup = $ionicPopup.alert({
          title: 'Response',
          template: res.msg
        });
      }
      $ionicLoading.hide();
    });
  };


  //election state
  $scope.election = {};
  $prom = AdminService.getAllElectionState();
  $prom.success(function(res){
    console.log(11,JSON.stringify(res));
     // for(var i in res){
     //    console.log("gv", res[i].is_closed);
     //  }

     if(res[0].is_closed==true){
        $scope.election.presState = false;
     }
     else{
      $scope.election.presState = true;
     }

     if(res[1].is_closed==true){
        $scope.election.vpresState = false;
     }
     else{
      $scope.election.vpresState = true;
     }

     if(res[2].is_closed==true){
        $scope.election.treasureState = false;
     }
     else{
      $scope.election.treasureState = true;
     }

     if(res[3].is_closed==true){
        $scope.election.secretaryState = false;
     }
     else{
      $scope.election.secretaryState = true;
     }

      
     
      $ionicLoading.hide();
  });

  var s;
  $scope.pres = function(){
    if($scope.election.presState==true){
      s = 0;
    }
    else{
       s =  1;
    }
      var link = "http://localhost/milang/change_state.php?position_id=1&state="+s;
      console.log('2', link);
      $ionicLoading.show();
      $prom = $http.get(link);
      $prom.success(function(res){
        $ionicLoading.hide();
        console.log('2', JSON.stringify(res));
      });
  };
  
  $scope.vpres = function(){
    if($scope.election.vpresState==true){
      s = 0;
    }
    else{
       s =  1;
    }
      var link = "http://localhost/milang/change_state.php?position_id=2&state="+s;
      console.log('2', link);
      $ionicLoading.show();
      $prom = $http.get(link);
      $prom.success(function(res){
        $ionicLoading.hide();
        console.log('2', JSON.stringify(res));
      });
  };

   $scope.treasure = function(){
    if($scope.election.treasureState==true){
      s = 0;
    }
    else{
       s =  1;
    }
      var link = "http://localhost/milang/change_state.php?position_id=3&state="+s;
      console.log('2', link);
      $ionicLoading.show();
      $prom = $http.get(link);
      $prom.success(function(res){
        $ionicLoading.hide();
        console.log('2', JSON.stringify(res));
      });
  };

   $scope.secretary = function(){
    if($scope.election.secretaryState==true){
      s = 0;
    }
    else{
       s =  1;
    }
      var link = "http://localhost/milang/change_state.php?position_id=4&state="+s;
      console.log('2', link);
      $ionicLoading.show();
      $prom = $http.get(link);
      $prom.success(function(res){
        $ionicLoading.hide();
        console.log('2', JSON.stringify(res));
      });
  };

})

 .controller('ResultCtrl', function($scope, ResultService, $ionicLoading, $stateParams){
   $prom = ResultService.getResult($stateParams.pos);
   $prom.success(function(res){
       $ionicLoading.hide();
       $scope.results = res;
       console.log(res);
   });
   $prom.error(function(err){
      $ionicLoading.hide();
   });
 })
 


.controller('StudentCtrl', function($scope, $stateParams, StudentService, $ionicLoading, $http, $localStorage, $ionicPopup) {
  console.log("param", $stateParams.position);
  $prom = StudentService.getAspirants($stateParams.position);
  $prom.success(function(res){
    console.log(1,res);
    $scope.aspirants = res;
    $ionicLoading.hide();
  });

  $scope.choice = {};
  $scope.vote = function(){
    console.log(1,JSON.stringify($scope.choice));
    if(angular.equals($scope.choice, {})){
      var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: 'Seleect a candidate'
      });
      return;
    }
    var link = "http://localhost/milang/cast_vote.php";
    $ionicLoading.show();
    $prom = $http.post(link, {election_id:$scope.choice.pos, voter_id:$localStorage.userId, position_id:$stateParams.position});
    $prom.success(function(res){
      console.log('res', res);
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: res.msg
      });
    });
  };


  //profile details
  $scope.fname = $localStorage.userName; 
  $scope.matric = $localStorage.userMatric;
  $scope.email = $localStorage.email; 
})

.filter('first_letter', function(){
  return function(x){
    var letter = x.substring(0, 1);
    return letter;
  };
});
