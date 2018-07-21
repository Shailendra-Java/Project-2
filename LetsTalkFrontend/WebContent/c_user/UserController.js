myApp.controller("UserController", function($scope, $http, $rootScope,
		$location,$route,$cookieStore) {

	$scope.User = {
		firstName : "",
		lastName : "",
		emailID : "",
		password : "",
		gender : '',
		mobile : '',
		d_o_b : ''
	}

	$scope.register = function() {

		$http.post('http://localhost:8085/LetsTalkMiddleware/registerUser',
				$scope.User).then(function(response) {
			$scope.User = response.data;
			console.log($scope.User.msg);
			alert('User Registered Successfully');
			console.log(response.statusText);
				},function(response)

				{

					alert('Cannot Register Try Again')
				});

	}
/*	$scope.uploadProfilePic=function(){
		console.log('inside upload profile picture')
		$http.post('http://localhost:8085/LetsTalkMiddleware/doUpload')
		.then(function(response){
			alert('profile piture uploaded successfully');
			$location.path("/uploadProfilePicture");
		},function(response)
		{

			alert('cannot upload picture try again ')
		});
	}*/

	$scope.checklogin = function() {
		alert("Checking Login Process");

		$http.post('http://localhost:8085/LetsTalkMiddleware/login',
				$scope.User).then(function(response) {
			$scope.User = response.data;
			$rootScope.currentUser = $scope.User;
			console.log($rootScope.currentUser.emailID);
			$cookieStore.put('userDetails',response.data);
			$location.path("/");
		}, function(response)

		{

			alert('Invalid Credentials')
		});
	}
	
//****************************logout************************************************
	
	$scope.logout=function()
	{
		console.log("Logging Out");
		alert("Logged Out Successfully")
		delete $rootScope.currentUser;
		$cookieStore.remove('userDetails');
		$location.path("/login");
	}
//****************************get user *********************************************	
	$scope.getUserDetails=function(emailID)
	{
		console.log('inside get User ');
		console.log('emailID :'+emailID);
		$http.get('http://localhost:8085/LetsTalkMiddleware/getUser/'+emailID+'.')
		.then(function(response) {
			if($rootScope.currentUser!=undefined){
			$scope.User = response.data;
			$rootScope.userDetail = $scope.User;
			$cookieStore.put('userDetail',response.data);
			$location.path("/displayProfile");
			}else{
				alert('login to view user details');
				$location.path("/login");
			}
	}, function(response)

	{

		alert('USER NO  MORE EXIST')
	});
   }
//***************************Update User*********************************************
	$scope.updateUserDetails=function(){
		console.log('inside update user details');
		$http.put('http://localhost:8085/LetsTalkMiddleware/updateUser',
				$scope.User).then(function(response) {
			$scope.User = response.data;
			$rootScope.currentUser=response.data;
			console.log($scope.User.msg);
			alert('User Updated Successfully');
			console.log(response.statusText);
				},function(response)

				{

					alert('Cannot Update Try Again')
				});

	}
});