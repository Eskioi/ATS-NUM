package com.atsnum.kpi;

import com.atsnum.kpi.DBModel.UserNumber;
import com.atsnum.kpi.Services.UserNumberService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class KpiApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(KpiApplication.class, args);
	}

}
