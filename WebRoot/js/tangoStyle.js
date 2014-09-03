/*!
 * tangoStyle v1.0.0
 * Writer: zhujianshan
 * Date: 2014.8.16
 */

var COOKIENAME = "wondersUserName"; //cookie名字
var COOKIETIME = 30; //cookie时间

/*********************************************登录注册等部分************************************************************/

/*!
 * 方法：用户登录
 * Date: 2014.8.16
 */
$("#loginSubmit").click(function () {



    //验证是否输入
    var loginName = $("#loginName").val();
    var loginPwd = $("#loginPwd").val();
    if (loginName.length == 0) {
        alert("请输入用户名！");
        return;
    }
    if (loginPwd.length == 0) {
        alert("请输入密码！");
        return;
    }

    $("#loginSubmit").attr("disabled", "disabled"); //按钮变灰不可用
    //格式化form中数据
    var params = $("input").serialize();
    //ajax调用login.action.
    $.ajax({
        // 后台处理程序
        url: "login.action",
        // 数据发送方式
        type: "post",
        // 接收数据格式
        dataType: "json",
        data: params,
        // 要传递的数据
        // 回传函数
        timeout: 20000, // 设置请求超时时间（毫秒）。
        success: function (data) { // 请求成功后回调函数。

            $("#loginSubmit").attr("disabled", false); //恢复按钮

            var json = eval("(" + data.jsonResult + ")"); //包数据解析为json 格式
            if (json.flag === "success") {

                //设置cookie
                setcookie(COOKIENAME, data.user.name);
                var name = getcookie(COOKIENAME);
                window.location.href = "main.html";

            } else {
                alert("用户名密码不正确！")
            }
        },
        error: function () {
            $("#loginSubmit").attr("disabled", false); //恢复按钮
            alert('登录失败');
        }
    });
});



/*!
 * 方法：用户注册
 * Date: 2014.8.16
 */
$("#registSubmit").click(function () {



    //验证是否输入
    var registEmail = $("#registEmail").val();
    var registName = $("#registName").val();
    var registPwd = $("#registPwd").val();
    var registPwd2 = $("#registPwd2").val();

    //邮箱正则表达式
    var myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (registEmail.length == 0) {
        alert("请输入邮箱！");
        return;
    } else if (!myreg.test(registEmail)) {
        alert("请输入正确的邮箱！");
        return;
    }
    if (registName.length == 0) {
        alert("请输入用户名！");
        return;
    }
    if (registPwd.length == 0) {
        alert("请输入密码！");
        return;
    } else if (registPwd.length < 6) {
        alert("密码不小于6位！");
        return;
    }
    if (registPwd2.length == 0) {
        alert("请输入密码！");
        return;
    } else if (registPwd.length < 6) {
        alert("密码不小于6位！");
        return;
    } else if (!(registPwd == registPwd2)) {
        alert("两次输入密码不一致，请再次输入！");
        return;
    }

    $("#registSubmit").attr("disabled", "disabled"); //按钮变灰不可用
    //格式化form中数据
    var params = $("input").serialize();
    //ajax调用regist.action.
    $.ajax({
        // 后台处理程序
        url: "regist.action",
        // 数据发送方式
        type: "post",
        // 接收数据格式
        dataType: "json",
        data: params,
        // 要传递的数据
        // 回传函数
        timeout: 20000, // 设置请求超时时间（毫秒）。
        success: function (data) { // 请求成功后回调函数。
            $("#registSubmit").attr("disabled", false); //恢复按钮
            var json = eval("(" + data.jsonResult + ")"); //包数据解析为json 格式

            //注册成功则跳转到main.html，否则提示重新输入
            if (json.isRegist === "false") {
                alert("注册成功！");
                window.location.href = "login.html";
            } else {
                alert("用户名已存在，请输入另一个用户名！")
            }
        },
        error: function () {
            $("#registSubmit").attr("disabled", false); //恢复按钮
            alert('注册失败');
        }

    });
});


/*!
 * 方法：用户登出
 * Date: 2014.8.17
 */
$("#logout").click(function () {
    delcookie(COOKIENAME);
    window.location.href = "login.html";
});

/*********************************************用户信息部分************************************************************/



/*!
 * 方法：用户管理页面获取用户列表并显示
 * Date: 2014.8.17
 */
function getUsers() {
    $("#add").children().remove();
    var params = {};
    //ajax调用getUsers.action.
    $.ajax({
        // 后台处理程序
        url: "getUsers.action",
        // 数据发送方式
        type: "post",
        // 接收数据格式
        dataType: "json",
        data: params,
        // 要传递的数据
        // 回传函数
        timeout: 20000, // 设置请求超时时间（毫秒）。
        success: function (data) { // 请求成功后回调函数。           
            var json = eval("(" + data.jsonResult + ")"); //包数据解析为json 格式 
            for (var i = 0; i < json.length; i++) {
                $str = '';
                $str += "<tr>";
                $str += "<td>" + i + "</td>";
                $str += "<td>" + json[i].name + "</td>";
                $str += "<td>" + json[i].email + "</td>";
                $str += "<td>" + json[i].authority + "</td>";
                $str += "<td>";
                //非管理员不可编辑删除
                if (!(json[i].authority === "admin")) {
                    $str += "<button type='button' class='btn btn-primary btn-xs ' onclick='btnEdit(" + i + ")' data-toggle='modal' data-target='#editModal'>";
                    $str += "<span class='glyphicon glyphicon-pencil'></span> 修改";
                    $str += "</button>";
                    $str += " <button type='button' class='btn btn-danger btn-xs'  onclick='btnDel(" + i + ")' data-toggle='modal' data-target='#delModal'>";
                    $str += "<span class='glyphicon glyphicon-remove'></span> 删除";
                    $str += "</button>";
                }
                $str += "</td>";
                $str += "</tr>";
                $("#add").append($str);
            }
        },
        error: function () {
            //alert('查找失败');
        }

    });
}


/*!
 * 方法：userEdit   “编辑”按钮点击后对修改内容赋值
 * Date: 2014.8.17
 */

function btnEdit(id) {

    //获取本行的信息
    var name = $("#add tr").eq(id).find("td").eq(1);
    var email = $("#add tr").eq(id).find("td").eq(2);
    var authority = $("#add tr").eq(id).find("td").eq(3);
    //设置弹出框的结果
    $("#editName").val(name.html());
    $("#editEmail").val(email.html());
    $("#editAuthority").html(authority.html());

}


/*!
 * 方法：用户修改
 * Date: 2014.8.17
 */
$("#editUserBtn").click(function () {

    //验证是否输入
    var registEmail = $("#editEmail").val();


    //邮箱正则表达式
    var myreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (registEmail.length == 0) {
        alert("请输入邮箱！");
        return;
    } else if (!myreg.test(registEmail)) {
        alert("请输入正确的邮箱！");
        return;
    }

    $("#editUserBtn").attr("disabled", "disabled"); //按钮变灰不可用
    //格式化form中数据
    var params = $("#editForm input").serialize();

    //ajax调用editUser.action.
    $.ajax({
        // 后台处理程序
        url: "editUser.action",
        // 数据发送方式
        type: "post",
        // 接收数据格式
        dataType: "json",
        data: params,
        // 要传递的数据
        // 回传函数
        timeout: 20000, // 设置请求超时时间（毫秒）。
        success: function (data) { // 请求成功后回调函数。
            $("#editUserBtn").attr("disabled", false); //恢复按钮
            var json = eval("(" + data.jsonResult + ")"); //包数据解析为json 格式

            $("#editModal").modal('hide'); //关闭窗口           
            getUsers();
        },
        error: function () {
            $("#editUserBtn").attr("disabled", false); //恢复按钮
            //alert('注册失败');
        }

    });
});


/*!
 * 方法：userDel   “删除”按钮点击后对修改内容赋值
 * Date: 2014.8.17
 */

function btnDel(id) {

    //获取本行的信息
    var name = $("#add tr").eq(id).find("td").eq(1);
    //设置弹出框的结果
    $("#delName").val(name.html());

}


/*!
 * 方法：用户删除
 * Date: 2014.8.17
 */
$("#delUserBtn").click(function () {

    $("#delUserBtn").attr("disabled", "disabled"); //按钮变灰不可用
    //格式化form中数据
    var params = $("#delForm input").serialize();

    //ajax调用delUser.action.
    $.ajax({
        // 后台处理程序
        url: "delUser.action",
        // 数据发送方式
        type: "post",
        // 接收数据格式
        dataType: "json",
        data: params,
        // 要传递的数据
        // 回传函数
        timeout: 20000, // 设置请求超时时间（毫秒）。
        success: function (data) { // 请求成功后回调函数。
            $("#delUserBtn").attr("disabled", false); //恢复按钮
            var json = eval("(" + data.jsonResult + ")"); //包数据解析为json 格式

            $("#delModal").modal('hide'); //关闭窗口           
            getUsers();
        },
        error: function () {
            $("#delUserBtn").attr("disabled", false); //恢复按钮
            //alert('注册失败');
        }

    });
});


/*********************************************辅助方法部分************************************************************/

/*!
 * 方法：GetQueryString()为获取页面传值
 * Date: 2014.8.17
 */

function GetQueryString(sProp) {
    var re = new RegExp("[&,?]" + sProp + "=([^//&]*)", "i");
    var a = re.exec(document.location.search);
    if (a == null)
        return "";
    return a[1];
}

/*!
 * 方法：GetQueryString()为获取页面传值
 * 注：每个页面都要执行
 * Date: 2014.8.17
 */
$(function () {
    var title = $("TITLE").html(); //获得title标题  

    //如果cookie中有登录信息，则可以正常使用，否则跳转到登录界面
    if (!(title == "Login") && !(title == "Regist")) {
        var name = getcookie(COOKIENAME); //右上角显示哪位用户登录
        $("#loginUserName").html("<u>" + name + "</u>");
        if (!name) {
            window.location.href = "login.html"; //没有登录过的跳转到login界面
        } else {
            if (name = "人员管理") {
                getUsers();
            }
        }
    } else {
        var name = getcookie(COOKIENAME);
        if (name) {
            window.location.href = "main.html"; //登录过的跳转到main界面
        }
    }
});






/*!
 * 方法：关于cookie方法
 * Date: 2014.8.17
 */
//设定cookie
function setcookie(name, value) {
    var minutes = COOKIETIME;
    var url = document.domain;
    var exp = new Date();
    exp.setTime(exp.getTime() + minutes * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


//获得cookie name
function getcookie(name) {
    var arr = document.cookie.match(new RegExp("[sS]*" + name + "=([^;]*)"));
    //alert(arr);
    if (arr != null)
        return unescape(arr[1]);
    return null;
}

//删除cookie
function delcookie(name) {
    var url = document.domain;
    var exp = new Date();
    exp.setTime(exp.getTime() + 1); //设置cookie时间是1ms，瞬间过期等于删除cookie
    document.cookie = name + "=" + escape(url) + ";expires=" + exp.toGMTString();
}


/*!
 * 方法：dateTimePicker
 * Date: 2014.8.30
 */
var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    firstDay: 1,
    minDate: new Date('2000-01-01'),
    maxDate: new Date('2020-12-31'),
    yearRange: [2000, 2020]
});




/*!
 * 方法：关于table方法
 * Date: 2014.9.3
 */
$("#grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        /* To accumulate custom parameter with the request object */
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/api/data/basic",
    formatters: {
        "link": function(column, row)
        {
            return "<a href=\"#\">" + column.id + ": " + row.id + "</a>";
        }
    }
});