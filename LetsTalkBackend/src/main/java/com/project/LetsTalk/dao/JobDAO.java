package com.project.LetsTalk.dao;

import java.util.List;

import com.project.LetsTalk.model.Job;
import com.project.LetsTalk.model.JobApplication;

public interface JobDAO {
	public boolean saveJob(Job job);
	public boolean closeJob(int jobid);
	public boolean openJob(int jobid);
	public boolean updateJob(Job job);
	public boolean deleteJob(int jobid);
	public Job getJob(int jobid);
	public List<Job> jobList();
	public List<Job> jobList(char jobstatus);
	public boolean isJobOpened(int jobid);
	public boolean saveJobApplication(JobApplication jobApplication);
	public boolean updateJobApplication(JobApplication jobApplication);
	public boolean deleteJobApplication(int jobAppId);
	public JobApplication getJobApplication(int jobAppId);
	public List<JobApplication> jobApplicationlist(int jobid); 
	public List<JobApplication> jobApplicationlist(int jobid, char jobstatus);
	public boolean isJobAlreadyApplied(String email, int jobid);
	public List<JobApplication> jobApplicationList(String email);
	}
