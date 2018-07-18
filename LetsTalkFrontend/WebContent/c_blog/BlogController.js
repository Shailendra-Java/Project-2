myApp.controller("BlogController", function($scope,$http,$location, $rootScope,$window,$cookieStore) {
			$scope.blog = {"blogId":'',
			        "blogTitle": '',
			        "emailId":'',
			        "blogContent": '',
			        "status": '',
			        "blogLikes":'' ,
			        "blogDislikes":'' ,
			        "dateCreated":''};
			$scope.blogComment={
					"blogCommentId":'',
					"emailId":'',
					"blogId":'',
					"commentText":'',
					"commentDate":''
			}
			       $scope.blogData;
			       $scope.myBlogs;
			       
//*******************************************add blog**********************************************
			$scope.insertBlog = function(){
				$scope.blog.emailId=$scope.currentUser.emailID;
				console.log('inside insert Blog');
				$http.post('http://localhost:8085/LetsTalkMiddleware/addBlog',$scope.blog)
				.then (function(response) {
					alert('Blog Added Success')
				$window.location.reload();
				},function(response)

				{

					alert('Cannot Add Try Again')
				});
			};
			
//****************************************fetch all blog***********************************************
			$scope.fetchAllBlog=function() 
			{
				console.log('Fetch All Blogs');
				$http.get("http://localhost:8085/LetsTalkMiddleware/listBlogs")
				.then(function(response)
				{
					
					$rootScope.blogData=response.data;
					console.log($scope.blogData);
				});
			}
			$scope.fetchAllBlog();
//***************************************fecth my blogs************************************************
			$scope.myBlog=function(){
				console.log("fetch all my blogs")
				$http.get("http://localhost:8085/LetsTalkMiddleware/listBlogsOfUser/"+$scope.currentUser.emailID+".")
				.then(function(response) {
					$rootScope.myBlogs=response.data;
					 console.log($scope.myBlogs);
					 $location.path("/showMyBlogs");
				},function(response)

				{

					alert('you have not created any blog yet')
				});
			}
				
//***************************************get blog*****************************************************
			$scope.getBlog = function(blogId) {
				$http.get('http://localhost:8085/LetsTalkMiddleware/getBlog/' + blogId)
						.then(function(response) {
							console.log(response.status);
							$scope.blog=response.data;
							$rootScope.currentBlog = $scope.blog;
							$cookieStore.put('blogDetails',$scope.blog);
							console.log($rootScope.currentBlog.blogId);
						});
			};

//*************************************update blog******************************************************
			$scope.updateBlog = function(blogId){
				$http.put('http://localhost:8085/LetsTalkMiddleware/updateBlog',$scope.currentBlog)
				.then(function(response){
					console.log('updated blog'+ $scope.currentBlog.blogId+ ' successfully');
					$window.alert("Blog Id : "+$scope.currentBlog.blogId +" updated successfully");
					$scope.myBlog();
				});
			};
			
//*************************************delete blog********************************************************
			$scope.deleteBlog = function(blogId){
				// alert("in delete blog");
				$http.delete('http://localhost:8085/LetsTalkMiddleware/deleteBlog/'+blogId)
				.then(function(response){
					console.log('Blog deleted ');
					$window.alert("Blog Id : "+$scope.currentBlog.blogId +" deleted successfully");
					$scope.myBlog();
				},function(response)

				{

					alert('Cannot delete Try Again')
				});
			};
			
//*************************************incrment Likes********************************************************
			$scope.incrementLike = function(blogId) {
				console.log('Into like increment');
				$http.get(
						'http://localhost:8085/LetsTalkMiddleware/likeBlog/'+ blogId)
						.then(function(response) {
							console.log('Incremented likes');
							$window.location.reload();
						});
		}
			//*************************************incrment Dislikes********************************************************
			$scope.incrementDislike = function(blogId) {
				console.log('Into Dislike increment');
				$http.get(
						'http://localhost:8085/LetsTalkMiddleware/dislikeBlog/'
								+ blogId).then(
						function(response) {
							console.log('Incremented Islikes');
							$window.location.reload();
						});
		}
			
			//***************************************delete blogCommentsList*************************************

			$scope.deleteBlogComment=function(blogId){
				console.log('Into deleteBlogComments '+ blogId);
				$http.get(
						'http://localhost:8085/LetsTalkMiddleware/deleteBlogComment/'
								+blogId).then(
						function(response) {
							     $scope.getBlogDetails();
						});
			}
	
//***************************************get blogCommentsList*************************************

		$scope.getBlogCommentList=function(blogId){
			console.log('Into getBlogComments '+ blogId);
			$http.get(
					'http://localhost:8085/LetsTalkMiddleware/listBlogComments/'
							+blogId).then(
					function(response) {
						$scopeblogcomment=response.data;
						$rootScope.blogComments=response.data;
						$cookieStore.put('blogCommentsList',$rootScope.blogComments);	
						console.log($rootScope.blogComments.length);
						
					});
		}
		
//*************************************get Blog Details*******************************************
		
		$scope.getBlogDetails=function(blogId){
			console.log('into get blog details')
				$scope.getBlog(blogId);
				$scope.getBlogCommentList(blogId);
							
				/*$window.location.reload();*/
			};
			
//************************************add blog Comment*********************************************
			$scope.addBlogComment=function(){
				console.log('into add blog comment')
				console.log($rootScope.currentUser.emailID);
				$scope.blogComment.emailId=$rootScope.currentUser.emailID;
				$scope.blogComment.blogId=$rootScope.currentBlog.blogId;
				$http.post(
					'http://localhost:8085/LetsTalkMiddleware/addBlogComment',$scope.blogComment)
					.then(
					function(response) {
						console.log('Blog Comment Added Success')
						$scope.getBlogDetails($scope.blogComment.blogId);
						$location.path("/showBlog");
					},function(response)

						{

							alert('Cannot Add Try Again')
						});
			}
			
//*************************************approve blog********************************************
			$scope.approveBlog=function(blogId){
				console.log('inside approve Blog');
				$http.get('localhost:8085/LetsTalkMiddleware/approveBlog/'+blogId)
				.then(function(response){
						alert('blog accepted succesfully');
						$window.location.reload();
						});

			}
});
