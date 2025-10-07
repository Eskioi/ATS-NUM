package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.Machine;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Getter
@Setter
@Repository
public class StateRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void save(Machine machine){
        String sql = "INSERT into machine (id, machine, location) VALUES (?, ?, ?)";
        int rows = jdbcTemplate.update(sql, machine.getId(), machine.getMachine(), machine.getLocation());
        System.out.println(rows + "rows affected");
    }

    public List<Machine> findAll() {
        String str = "SELECT * FROM machine";

        RowMapper<Machine> mapper = new RowMapper<Machine>() {
            @Override
            public Machine mapRow(ResultSet rs, int rowNum) throws SQLException {
                Machine m = new Machine();
                m.setId(rs.getInt(1));
                m.setMachine(rs.getString(2));
                m.setLocation(rs.getString(3));
                return m;
            }
        };

        return jdbcTemplate.query(str, mapper);
    }


}
