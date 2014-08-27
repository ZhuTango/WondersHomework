package com.tango.dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.tango.beans.*;
import com.tango.service.UserService;
import com.tango.sources.*;

public class UserDao {

	
	
	/******************************************************************
	 * Dao 名称: updateUser
	 * 		       输入: user
	 * 		       输出: 无
	 * 		       描述: 更新一条用户数据。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public void updateUser(User user) {
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		session.update(user);
		trans.commit();
		HibernateSessionFactory.closeSession();
	}

	
	/******************************************************************
	 * Dao 名称: insertUser
	 * 		       输入: user
	 * 		       输出: 无
	 * 		       描述: 插入一条用户数据。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public void insertUser(User user) {
		user.setId(gererateId());
		user.setIsremove("0");
		user.setAuthority("user");
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		session.save(user); 
		trans.commit(); 
		HibernateSessionFactory.closeSession();
	}

	
	/******************************************************************
	 * Dao 名称: deleteUser
	 * 		       输入: user
	 * 		       输出: 无
	 * 		       描述: 删除一条用户数据。逻辑删除。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public void deleteUser(User user) {
		user.setIsremove("1");// isremove赋值"1"
		updateUser(user);
	}

	
	/******************************************************************
	 * Dao 名称: getAllUser
	 * 		       输入: 无
	 * 		       输出: List<User> 所有未删除用户
	 * 		       描述: 得到所有用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public List<User> getAllUser() {
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		Query query = session.createQuery("from User where isremove=?");
		query.setString(0, "0");
		List<User> list = query.list();
		trans.commit();
		HibernateSessionFactory.closeSession();
		return list;
	}
	
	
	/******************************************************************
	 * Dao 名称: getUser
	 * 		       输入: 无
	 * 		       输出: List<User> 所有未删除用户
	 * 		       描述: 根据用户名得到一条用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public User getUser(User userGet) {
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		Query query = session.createQuery("from User where name = ? ");
		query.setString(0,userGet.getName());
		List<User> list = query.list();
		User user = list.get(0);
		trans.commit();
		HibernateSessionFactory.closeSession();
		return user;
	}
	
	/******************************************************************
	 * Dao 名称: login
	 * 		       输入: user
	 * 		       输出: jsonResult
	 * 		       描述: 用于检查用户名登录是否成功。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public boolean isLogin(User user){
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		Query query = session.createQuery("from User where name=? and pwd=? and isremove=?");
		query.setString(0, user.getName());
		query.setString(1, user.getPwd());
		query.setString(2, "0");
		
		List<User> list = query.list();
		trans.commit();
		HibernateSessionFactory.closeSession();
		
		if(list.size()>0){
			return true;
		}
		
		return false;
	}
	
	
	
	/******************************************************************
	 * Dao 名称: isExist
	 * 		       输入: user
	 * 		       输出: boolean
	 * 		       描述: 用于判断该用户是否存在。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public boolean isExist(User user){
		Session session = HibernateSessionFactory.getSession();
		Transaction trans = session.beginTransaction();
		Query query = session.createQuery("from User where name=? ");
		query.setString(0, user.getName());
		
		List<User> list = query.list();
		trans.commit();
		HibernateSessionFactory.closeSession();
		
		if(list.size()>0){
			return true;
		}
		
		return false;
	}
	
	/******************************************************************
	 * Dao 名称: generateId
	 * 		       输入: 无
	 * 		       输出: String id
	 * 		       描述: 获取随机ID。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public  String gererateId(){
		String id;
		long random;
		random = (long)(1+Math.random()*(999999999999999999.0-1+1));		
		id = String.valueOf(random);		
		return id;
	}
	

}
