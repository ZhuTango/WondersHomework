package com.dao.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;
import com.tango.beans.User;
import com.tango.service.UserService;

public class UserAction {
	
	private String LOGINSUCCESS = "success";// 定义登录返回值，成功
	private String LOGINFAIL = "fail";	//定义登录返回值，失败
	private String REGISTED = "true";// 定义登录返回值，成功
	private String NOTREGISTED = "false";	//定义登录返回值，失败
	
	private String jsonResult;//返回json数据
	private User user;// 用户bean
	
	//spring创建UserService实体。
	private static BeanFactory factory = new ClassPathXmlApplicationContext("com/tango/sources/applicationContext.xml");
	UserService userService = (UserService) factory.getBean("userService");
	
	
	//众get、set方法
	public String getJsonResult() {
		return jsonResult;
	}

	public void setJsonResult(String jsonResult) {
		this.jsonResult = jsonResult;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	 
	/******************************************************************
	 * Action 名称: login
	 * 		       输入: user
	 * 		       输出: jsonResult
	 * 		       描述: 用于检查用户名登录是否成功。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public String login() throws Exception {
		//初始化返回结果的map
		Map<String, String> map = new HashMap<String, String>();  
		
		//查询该用户名密码是否存在于数据库中
		if(userService.isLogin(user)){
			 map.put("flag", LOGINSUCCESS); 
		}else{
			map.put("flag", LOGINFAIL); 
		}
        
        // 将要返回的map对象进行json处理  
        JSONObject jo = JSONObject.fromObject(map); 
        jsonResult = jo.toString();
        
		return "success";
	}
	
	
	/******************************************************************
	 * Action 名称: regist
	 * 		       输入: user
	 * 		       输出: jsonResult
	 * 		       描述: 用于注册用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public String regist() throws Exception {
		//初始化返回结果的map
		Map<String, String> map = new HashMap<String, String>();  		
		
		//先查询用户名是否存在，不存在时注册，都返回形影的注册状态
		if(userService.isExist(user)){
			map.put("isRegist", REGISTED); 
		}else{
			userService.regist(user);
			map.put("isRegist", NOTREGISTED); 
		}
		
        // 将要返回的map对象进行json处理  
        JSONObject jo = JSONObject.fromObject(map); 
        jsonResult = jo.toString();
        
		return "success";
	}
	
	
	/******************************************************************
	 * Action 名称: getUsers
	 * 		       输入: 无
	 * 		       输出: jsonResult
	 * 		       描述: 用于得到所有没被删除的用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.17
	 ******************************************************************/
	public String getUsers() throws Exception {
		//得到所有User
		List<User> users = userService.getUsers();		
		
        // 将要返回的user对象进行json处理  
        JSONArray jo = JSONArray.fromObject(users);         
        jsonResult = jo.toString();
        System.out.println("所有用户:   "+jsonResult);
        
		return "success";
	}
	
	
	/******************************************************************
	 * Action 名称: editUser
	 * 		       输入: user
	 * 		       输出: jsonResult
	 * 		       描述: 用于编辑用户。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.17
	 ******************************************************************/
	public String editUser() throws Exception {
		//初始化返回结果的map
		Map<String, String> map = new HashMap<String, String>();  		
				
		userService.editUser(user);		
		
        // 将要返回的map对象进行json处理  
        JSONObject jo = JSONObject.fromObject(map); 
        jsonResult = jo.toString();
        
		return "success";
	}
	
	/******************************************************************
	 * Action 名称: delUser
	 * 		       输入: user
	 * 		       输出: jsonResult
	 * 		       描述: 用于删除。
	 * 		       作者: zhujianshan
	 * 		       日期: 2014.8.16
	 ******************************************************************/
	public String delUser() throws Exception {
		//初始化返回结果的map
		Map<String, String> map = new HashMap<String, String>();  		
				
		userService.delUser(user);		
		
        // 将要返回的map对象进行json处理  
        JSONObject jo = JSONObject.fromObject(map); 
        jsonResult = jo.toString();
        
		return "success";
	}
	
	
}
