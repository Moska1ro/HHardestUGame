package dao_.test;

import dao_.dao.actorDao;
import dao_.dao.victoryDao;
import dao_.pojo.Actor;
import dao_.pojo.victory;

import java.util.Iterator;
import java.util.List;

public class testDao {
    @Test
    public void testActorDao(){
        actorDao actorDao = new actorDao();
        List<Actor> actorList = actorDao.queryMulty("select * from actor where id>=?", Actor.class, 1);
        for(Actor actor:actorList){
            System.out.println(actor);
        }
    }
    @Test
    public void testInsert() {
        victoryDao victoryDao = new victoryDao();
        String name="zhangsan";
        String remark="lisi";
        victoryDao.update("insert into victory values(?,?)",name,remark);
    }
}
