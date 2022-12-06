<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link
	href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet">
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script
	src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta charset="UTF-8">
<title>Title</title>
</head>
<body background="images/Clouds4.jpg">
	<center>
		<div style="font-size: 20px; margin-top: 100px; width: 70%">
			<table>
				<tr>
					<th width="80%">姓名</th>
					<th width="80%">评论</th>
				</tr>
				<c:forEach items="${list}" var="bean">
					<tr>
						<td>${bean.name }</td>
						<td>${bean.remark }</td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</center>
</body>
</html>