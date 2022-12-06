package dao_.pojo;

public class victory {
    private String name;
    private String remark;
    private String deadCount;
    public victory() {
    }

    public victory(String name, String remark,String deadCount) {
        this.name = name;
        this.remark = remark;
        this.deadCount=deadCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getDeadCount() {
        return deadCount;
    }

    public void setDeadCount(String deadCount) {
        this.deadCount = deadCount;
    }

    @Override
    public String toString() {
        return "victory{" +
                "name='" + name + '\'' +
                ", remark='" + remark + '\'' +
                ", deadCount='" + deadCount + '\'' +
                '}';
    }
}
