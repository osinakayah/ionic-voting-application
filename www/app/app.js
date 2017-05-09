angular.module("milangApp", ["ionic"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova &&window.cordova.plugins.Keyboard) {
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

    .state('home', {
    url: '/home',
    abstract:true,
    templateUrl: 'app/home/home.html'
  })
    .state('home.leagues', {
    	url:'leagues',
    	views:{
    		'tabs-leagues':{
    			templateUrl:'app/home/leagues.html'
    		}
    	}
    })

    .state('home.myteams', {
    	url:'myteams',
    	views:{
    		'tab-myteams':{
    			templateUrl:'app/home/myteams.html'
    		}
    	}
    })

   .state('app', {
   	url:"/app",
   	templateUrl:'app/layout/menu-layout.html'
   });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/leagues');
});