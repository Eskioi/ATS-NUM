package com.atsnum.kpi;

import com.atsnum.kpi.DBModel.Machine;
import com.atsnum.kpi.Repositories.StateRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class KpiApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(KpiApplication.class, args);

		Machine machine1 = new Machine();
		machine1.setId(51);
		machine1.setMachine("CTA");
		machine1.setLocation("ECAM Lyon");

		StateRepository stateRepository = context.getBean(StateRepository.class);
		stateRepository.save(machine1);

		System.out.println(stateRepository.findAll());
	}

}
