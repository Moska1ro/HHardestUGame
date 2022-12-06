<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body background="images/Clouds4.jpg">
    <form action="add" method="post" style="float: left;margin-left: 575px;margin-top:250px">
        <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">👇</span>
            <input name="fname" type="text" class="form-control" placeholder="Your name" aria-label="Username"
                   aria-describedby="addon-wrapping">
        </div>

        <div class="input-group">
            <span class="input-group-text">👇</span>
            <textarea cols="50" rows="5" placeholder="what do you want to say?" name="remark" class="form-control"
                      aria-label="With textarea"></textarea>
        </div>
        <input class="btn btn-primary" type="submit" value="Submit">
    </form>
</body>
</html>