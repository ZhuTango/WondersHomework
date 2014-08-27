package com.tango.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;







import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import net.sf.json.JSONObject;

import com.tango.beans.*;
import com.tango.dao.*;;

public class UserService {

	private static BeanFactory factory = new ClassPathXmlApplicationContext("com/tango/sources/applicationContext.xml");
	private static UserDao userDao = factory.getBean(UserDao.class );
	
	
	
	/******************************************************************
	 * Service 名称: isLogin
	 * 		       输入: user
	 * 		       输出: boolean
	 * 		       描述: 用于判断用户名密码是否正确。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
    public boolean isLogin(User user){
    	
    	return userDao.isLogin(user);
    }
    
    /******************************************************************
	 * Service 名称: isExist
	 * 		       输入: user
	 * 		       输出: boolean
	 * 		       描述: 用于判断该用户是否存在。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
    public boolean isExist(User user){    	
    	
    	return userDao.isExist(user);
    }
    
    
    /******************************************************************
	 * Service 名称: regist
	 * 		       输入: user
	 * 		       输出: 无
	 * 		       描述: 注册该用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
    public void regist(User user){    	
    	 
    	 userDao.insertUser(user);
    }
    
    /******************************************************************
	 * Service 名称: editUser
	 * 		       输入: user
	 * 		       输出: user
	 * 		       描述: 修改该用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.17
	 ******************************************************************/
    public void editUser(User user){ 
    	
         User userOld = userDao.getUser(user);
         userOld.setEmail(user.getEmail());
    	 userDao.updateUser(userOld);
    }
    
    /******************************************************************
	 * Service 名称: delUser
	 * 		       输入: user
	 * 		       输出: user
	 * 		       描述: 删除该用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.17
	 ******************************************************************/
    public void delUser(User user){ 
    	
         User userOld = userDao.getUser(user);         
    	 userDao.deleteUser(userOld);
    }
    
    /******************************************************************
	 * Service 名称: getUsers
	 * 		       输入: 无
	 * 		       输出: List<User> User列表
	 * 		       描述: 得到所有用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.17
	 ******************************************************************/
    public List<User> getUsers() {
		// TODO Auto-generated method stub
    	List<User> users = userDao.getAllUser(); 	
		return users;
	}
    
    
    public static void main(String args[])
    {
    	

    }

	
    
}