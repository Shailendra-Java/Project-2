package com.project.LetsTalk.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.stereotype.Repository;

@Repository
@Entity
@Table(name="c_blog")
public class Blog {
	
	@Id
	private int blogId;
	private String blogTitle;
	private String emailId;
	private String blogContent;
	private Date DateCreated;
	private char status; /* N->New , A->Accepted, R-> Rejected*/
	private int blogLikes;
	private int blogDislikes;
	
	@Transient
	private String statusMessage;
	
	
	
	public String getStatusMessage() {
		return statusMessage;
	}
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	public int getBlogId() {
		return blogId;
	}
	public void setBlogId(int blogId) {
		this.blogId = blogId;
	}
	public String getBlogTitle() {
		return blogTitle;
	}
	public void setBlogTitle(String blogTitle) {
		this.blogTitle = blogTitle;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	
	public String getBlogContent() {
		return blogContent;
	}
	public void setBlogContent(String blogContent) {
		this.blogContent = blogContent;
	}
	public Date getDateCreated() {
		return DateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		DateCreated = dateCreated;
	}
	public char getStatus() {
		return status;
	}
	public void setStatus(char status) {
		this.status = status;
	}
	public int getBlogLikes() {
		return blogLikes;
	}
	public void setBlogLikes(int blogLikes) {
		this.blogLikes = blogLikes;
	}
	public int getBlogDislikes() {
		return blogDislikes;
	}
	public void setBlogDislikes(int blogDislikes) {
		this.blogDislikes = blogDislikes;
	}
	
	
}
