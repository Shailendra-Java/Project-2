package com.project.middleware.restController;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.project.LetsTalk.dao.ProfilePictureDAO;
import com.project.LetsTalk.model.ProfilePicture;
import com.project.LetsTalk.model.User;

@RestController
public class ProfilePictureController {
	@Autowired
	ProfilePictureDAO profileDAO;
	
	@RequestMapping(value="/doUpload",method=RequestMethod.POST)
	public ResponseEntity<?> uploadPicture(@RequestParam(value="file")CommonsMultipartFile fileupload,HttpSession session)
	{

		User user=(User)session.getAttribute("user");
		System.out.println("Inside Profile picture controller : ");
		
		if(user==null) 
		{
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
		else
		{
			System.out.println("Uploading the picture..");
			ProfilePicture profilePicture=new ProfilePicture();
			profilePicture.setUserName(user.getEmailID());
			profilePicture.setImage(fileupload.getBytes());
			profileDAO.save(profilePicture);
			System.out.println("Successfully uploaded..!!");
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/getImage/{emailId}")
	public @ResponseBody byte[] getProfilePic(@PathVariable("emailId") String userName)
	{
		
		ProfilePicture profilePicture=profileDAO.getProfilePicture(userName);
		
		if(profilePicture==null)
		{
			return null;
		}
		else
		{
			return profilePicture.getImage();
		}
}
}
