myApp.controller('FriendController',function($scope, $http, $location, $rootScope) {
					$scope.Friend = {
						userName : '',
						friendUserName : '',
						status : ''
					};
					$scope.User = {
							firstName : '',
							lastName : '',
							emailID : '',
							password : '',
							gender : '',
							mobile : '',
							d_o_b : '',
							role :'',
							status : '',
							reason :'',
							registeredDate : ''
						};
					
					$scope.pendingFriendRequest;
					$scope.suggestedFrnd;

//****************************************send friend request*****************************************
					$scope.sendFriendRequest=function(){
						console.log('send friend request')
						$scope.friend.friendUserName=$rootScope.userDetail.emailID;
						$scope.friend.userName=$rootScope.currentUser.emailID;
						$http.post('http://localhost:8085/LetsTalkMiddleware/sendFriendRequest',
										$scope.friend).then(function(response) {
									alert('Friend Request Send');
								});
					}
			
//***************************************Friend List***********************************************
					$scope.friendList=function() {
						console.log('Friend List'+$rootScope.currentUser.emailID);
						$http.get('http://localhost:8085/LetsTalkMiddleware/showFriendList/'+$rootScope.currentUser.emailID+'.')
								.then(function(response) {
									if (response.status==302) {
										$rootScope.errFriendList=response.status;
										aler('you have no friends');
									}
									if (response.status==200) {
										$rootScope.friendList = response.data;
										console.log($rootScope.friendList);
									}
									
								},function(response){
									$rootScope.errFriendList=response.status;
									console.log('no friends');
								});
					}
//*************************************suggested friends List*******************************************
					$scope.suggestedFriends=function() {
						console.log('Suggested Friend');
						$http.get('http://localhost:8085/LetsTalkMiddleware/showSuggestedFriend/'+$rootScope.currentUser.emailID+'.')
								.then(function(response) {
									if (response.status==302) {
										$rootScope.errSuggestedfriends=response.status;
										aler('No Friend Suggestions for you');
									}
									if (response.status==200) {
									$rootScope.suggestedFrnd = response.data;
									console.log(response.status);
									console.log($rootScope.suggestedFrnd);
									console.log('User : '+$rootScope.suggestedFrnd.emailID);
									}
								},function(response){
									$rootScope.errSuggestedFriends=response.status;
									console.log('no friends');
								});
					}
//************************************pending friend request list***********************************************
					$scope.pendingFriendRequest=function() {
						console.log('Pending Friend Request'+$rootScope.currentUser.emailID+'.');
						$http.get('http://localhost:8085/LetsTalkMiddleware/showPendingFriendRequest/'+$rootScope.currentUser.emailID+'.')
								.then(
										function(response) {
											if (response.status==302) {
												$rootScope.errPendingfriendRequest=response.status;
												aler('No Friend Suggestions for you');
											}
											if(response.status==200){
											$rootScope.pendingFriendRequests = response.data;
											console.log($scope.pendingFriendRequests);
											$location.path("/pendingFriend")
											}
										},function(response){
											$rootScope.errPendingfriendRequest=response.status;
											console.log('no friend requests');
										});
					}
//*************************************accept friend request***********************************
					$scope.acceptFriendRequest = function(friendId) {
						console.log('Accept Friend Request');
						$http.get(
								"http://localhost:8085/LetsTalkMiddleware/acceptFriendRequest/"
										+ friendId).then(function(response) {
						alert('Friend Request accepted ');
						$scope.pendingFriendRequest();
						
						});
					}
//*************************************delete friend request**********************************
					$scope.deleteFriendRequest = function(friendId) {
						console.log('Delete Friend Request');
						$http.get(
								"http://localhost:8085/LetsTalkMiddleware/deleteFriendRequest/"
										+ friendId).then(function(response) {
											alert('friend request deleted successfully');
											$scope.pendingFriendRequest();
						});
					}
				});