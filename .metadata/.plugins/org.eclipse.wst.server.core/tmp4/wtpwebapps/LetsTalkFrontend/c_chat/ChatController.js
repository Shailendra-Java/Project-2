myApp.controller("ChatController", function($scope,$rootScope,chatService)
{
	$scope.messages=[];
	$scope.message='';
	$scope.max=250;
	
	$scope.addMessage=function()
	{
		chatService.send($rootScope.currentUser.name+":" +$scope.message);
		$scope.message='';
	};

	chatService.receive().then(null,null,function(message)
	{
		console.log($scope.message);
		$scope.messages.push(message);
	});	

});