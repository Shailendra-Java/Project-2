package com.project.LetsTalk.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "c_job")
public class Job {
	@Id
	private int jobid;
	private String jobTitle;
	private String jobDescription;
	private String jobQualification;
	private int jobSalary;
	private String jobStatus;	/* O->Open, C->Closed*/
	private int noOfOpenings;
	private Date dateOfPost;
	
	
	@Transient
	private String statusMessage;
	
	
	
	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}

	public int getJobid() {
		return jobid;
	}

	public void setJobid(int jobid) {
		this.jobid = jobid;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getJobQualification() {
		return jobQualification;
	}

	public void setJobQualification(String jobQualification) {
		this.jobQualification = jobQualification;
	}

	public int getJobSalary() {
		return jobSalary;
	}

	public void setJobSalary(int jobSalary) {
		this.jobSalary = jobSalary;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public int getNoOfOpenings() {
		return noOfOpenings;
	}

	public void setNoOfOpenings(int noOfOpenings) {
		this.noOfOpenings = noOfOpenings;
	}

	public Date getDateOfPost() {
		return dateOfPost;
	}

	public void setDateOfPost(Date dateOfPost) {
		this.dateOfPost = dateOfPost;
	}

	
}