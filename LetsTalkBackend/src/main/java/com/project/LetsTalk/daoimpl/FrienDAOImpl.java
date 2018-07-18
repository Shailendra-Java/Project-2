package com.project.LetsTalk.daoimpl;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.LetsTalk.dao.FriendDAO;
import com.project.LetsTalk.model.Friend;
import com.project.LetsTalk.model.User;

@Repository("friendDAO")
@Transactional
public class FrienDAOImpl implements FriendDAO {
	@Autowired
	SessionFactory sessionFactory;
//****************************************** get max friend id	****************************************************************
	private int getMaxFriendID() {
		int maxValue = 100;
		try {
				maxValue = (Integer) sessionFactory.getCurrentSession().createQuery("select max(friendId) from Friend").uniqueResult();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return 100;
			}
		System.out.println(maxValue);
			return maxValue;
	}
//********************************************list of friends*************************************************************
	@Override
	public List<Friend> friendList(String userName) {
		return sessionFactory.getCurrentSession().createQuery("from Friend where (userName='"+userName+"' AND status='A')").list();
	}
//*****************************************List of pending friend request*****************************************************
	@Override
	public List<Friend> pendingFriendRequestList(String userName) {
		return sessionFactory.getCurrentSession().createQuery("from Friend where (userName='"+userName+"' AND status='P')").list();
	}
//***************************************List of suggested friend request**************************************************
	@Override
	public List<User> suggestedPeopleList(String userName) {
		Session session = sessionFactory.openSession();
		Query query = session
				.createSQLQuery("select * from c_user where email_ID not in (select friendUserName from c_friend where userName != '"+userName+"')");
		List<User> suggestFriend = (List<User>) query.list();
		return suggestFriend;
	}
//**************************************send friend request*******************************************************
	@Override
	public boolean sendFriendRequest(Friend friend) {
		try
		{
			friend.setFriendId(getMaxFriendID()+1);
			friend.setStatus('P');
			sessionFactory.getCurrentSession().save(friend);
			return true;
      		}
		catch(Exception e)
		{
			return false;
		}
	}
//*****************************************accept friend request**************************************
	@Override
	public boolean acceptFriendRequest(int friendId) {
		try {
			Session session = sessionFactory.openSession();
			Friend friend = (Friend) session.get(Friend.class, friendId);
			friend.setStatus('A');
			sessionFactory.getCurrentSession().update(friend);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
//***********************************************delete friend request*********************************************
	@Override
	public boolean deleteFriendRequest(int friendId) {
		try {
			Friend friend = sessionFactory.getCurrentSession().get(Friend.class, friendId);
			sessionFactory.getCurrentSession().delete(friend);
			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
//************************************************get friend********************************************
	@Override
	public Friend getFriend(int friendId) {
		return sessionFactory.getCurrentSession().get(Friend.class, friendId);
	}

}
