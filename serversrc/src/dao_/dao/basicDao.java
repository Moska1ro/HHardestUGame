package dao_.dao;

import dao_.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class basicDao <T>{
    private QueryRunner qr=new QueryRunner();
    public int update(String sql, InputStream is,Object... parameters){
        Connection connection=null;
        try {
            connection=JDBCUtilsByDruid.getConnection(is);
            int update = qr.update(connection, sql, parameters);
            return update;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null,null,connection);
        }
    }

    public List<T> queryMulty(String sql,Class<T> clazz,InputStream is,Object... parameters){
        Connection connection=null;
        try {
            connection= JDBCUtilsByDruid.getConnection(is);
            return qr.query(connection, sql, new BeanListHandler<T>(clazz), parameters);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null,null,connection);
        }
    }
}
