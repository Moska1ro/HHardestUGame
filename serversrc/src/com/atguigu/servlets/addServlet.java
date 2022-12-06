package com.atguigu.servlets;

import dao_.dao.victoryDao;
import dao_.pojo.victory;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;

public class AddServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String fname = request.getParameter("fname");
        String remark = request.getParameter("remark");
        String deadCount = request.getParameter("death");
        ServletContext servletContext1 = this.getServletContext();
        InputStream is1 = servletContext1.getResourceAsStream("/WEB-INF/classes/druid.properties");
        victoryDao victoryDao = new victoryDao();
        int update = victoryDao.update("insert into victory values(?,?,?)", is1, fname, remark, deadCount);
        if (update > 0) {
            System.out.println("添加成功");
        }
        ServletContext servletContext2 = this.getServletContext();
        victoryDao victoryDao2 = new victoryDao();
        InputStream is2 = servletContext2.getResourceAsStream("/WEB-INF/classes/druid.properties");
        List<victory> victoryList = victoryDao2.queryMulty("select * from victory", victory.class, is2, null);
        response.setCharacterEncoding("gbk");
        PrintWriter writer = response.getWriter();
        writer.write("<body background=\"images/Clouds4.jpg\">" +
                "<div style=\"font-size: 20px;margin-left: 475px;margin-top: 100px\">\n" +
                "    <table>\n" +
                "        <tr>\n" +
                "            <th>姓名" +
                "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                "</th>\n" +
                "            <th>评论" +
                "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                "</th>\n" +
                "            <th>死亡次数" +
                "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                "</th>\n");
        for (victory vic : victoryList) {
            writer.write("<tr>\n" +
                    "            <th>" + vic.getName() +
                    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                    "</th>\n" +
                    "            <th>" + vic.getRemark() +
                    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                    "</th>\n" +
                    "            <th>" + vic.getDeadCount() +
                    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
                    "</th>\n");
        }
        writer.write("    </table>\n" +
                "</div>" +
                "</body>");
    }
}
