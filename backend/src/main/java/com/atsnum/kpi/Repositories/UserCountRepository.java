package com.atsnum.kpi.Repositories;

import com.atsnum.kpi.DBModel.UserNumber;
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
public class UserCountRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void save(UserNumber userNumber) {
        String sql = "INSERT into userCountTrack (id, hourNumber, userCount) VALUES (?, ?, ?)";
        int rows = jdbcTemplate.update(sql, userNumber.getId(), userNumber.getHourNumber(), userNumber.getUserCount());
        System.out.println(rows + "rows affected");
    }

    public List<UserNumber> findAll() {
        String sql = "SELECT * FROM userCountTrack";

        RowMapper<UserNumber> mapper = new RowMapper<UserNumber>() {
            @Override
            public UserNumber mapRow(ResultSet rs, int rowNum) throws SQLException {
                UserNumber u = new UserNumber();
                u.setId(rs.getInt(1));
                u.setHourNumber(rs.getInt(2));
                u.setUserCount(rs.getInt(3));
                return u;
            }
        };
        return jdbcTemplate.query(sql, mapper);
    };
}
