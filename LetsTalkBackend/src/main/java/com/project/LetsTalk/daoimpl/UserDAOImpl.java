package com.project.LetsTalk.daoimpl;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.LetsTalk.dao.UserDAO;
import com.project.LetsTalk.model.User;

@Repository("userDAO")
//@EnableTransactionManagement
@Transactional
public class UserDAOImpl  implements UserDAO {
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	private User user;
	public boolean save(User user) {
		try {
			if(user.getRole()==null || user.getRole()=="")
			{
				user.setRole("USER");
			}
			user.setRegisteredDate(new Date(System.currentTimeMillis()) + "");
			String str=user.getEmailID()+"@LT.COM";
			user.setEmailID(str);
			user.setStatus('N');
			sessionFactory.getCurrentSession().save(user);
			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	public boolean update(User user) {
		try {
			sessionFactory.getCurrentSession().update(user);
			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	public boolean delete(String emaild) {
		try {
			user = get(emaild);
			if(user==null)
			{
				return false;
			}
			sessionFactory.getCurrentSession().delete(user);
			return true;
		} catch (HibernateException e) {
			e.printStackTrace();
			return false;
		}
	}
	public User get(String emailId) {
	return	(User) sessionFactory.getCurrentSession().get(User.class,emailId);
	}
	public List<User> list() {
	return	sessionFactory.getCurrentSession().createQuery("from c_user").list();
	}
	public User validate(String emailID, String password) {
		return (User) sessionFactory.getCurrentSession()
		.createCriteria(User.class)
		.add(Restrictions.eq("emailID", emailID))
		.add(Restrictions.eq("password", password)).uniqueResult();
	}
}
