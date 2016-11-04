    <%--
        Document   : getData.jsp
        Created on : Mar 29, 2016, 7:39:04 PM
        Author     : achitale
    --%>

        <%@ page import="java.sql.*" %>
        <HTML>
        <HEAD>
        <TITLE>Filling a Table</TITLE>
        </HEAD>

        <BODY>
        <H1>Filling a Table</H1>

            <%
            Connection connection = null;
            Class.forName("com.mysql.jdbc.Driver");
        connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb","root","root");

            Statement statement = connection.createStatement();

            ResultSet resultset = statement.executeQuery("select * from Users");

            while(resultset.next()){
        %>
        <TABLE BORDER="1">
        <TR>
        <TH>ID</TH>
        <TH>Name</TH>
        </TR>
        <TR>
        <TD> <%= resultset.getString(1) %> </TD>
        <TD> <%= resultset.getString(2) %> </TD>
        <TD> <%= resultset.getString(3) %> </TD>
        <TD> <%= resultset.getString(4) %> </TD>
        <TD> <%= resultset.getString(5) %> </TD>
        </TR>
        </TABLE>
            <%
            }
        %>
        </BODY>
        </HTML>
