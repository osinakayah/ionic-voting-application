// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngStorage', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'Home'
  })

  
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller:'StudentCtrl' 
        }
      }
    })

    .state('app.election', {
      url: '/election/:position',
      views: {
        'menuContent': {
          templateUrl: 'templates/election.html',
          controller:'StudentCtrl'
        }
      }
    })

   .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

   .state('forgot', {
    url: '/forgot',
    templateUrl: 'templates/forgot_password.html',
    controller: 'AuthCtrl'
  })


  .state('admin', {
    url: '/admin',
    abstract: true,
    templateUrl: 'templates/admin_menu.html',
    controller: 'Home'
  })

  .state('admin.add_student', {
    url: '/add_student',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin_add_student.html',
        controller:'AdminCtrl'
      }
    }
  })

  .state('admin.elections', {
    url: '/elections',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin_elections.html',
        controller:'AdminCtrl'
      }
    }
  })

  .state('app.result', {
    url: '/result',
    views: {
      'menuContent': {
        templateUrl: 'templates/result.html',
        controller:'ResultCtrl'
      }
    }
  })

  .state('app.pos_result', {
    url: '/result/:pos',
    views: {
      'menuContent': {
        templateUrl: 'templates/result_pos.html',
        controller:'ResultCtrl'
      }
    }
  })

  .state('admin.admin_list_student', {
    url: '/admin_list_student',
    views: {
      'menuContent': {
        templateUrl: 'templates/admin_list_student.html',
        controller:'AdminCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
