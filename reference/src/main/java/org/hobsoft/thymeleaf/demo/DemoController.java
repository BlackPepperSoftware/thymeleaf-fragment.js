package org.hobsoft.thymeleaf.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@EnableAutoConfiguration
@Controller
public class DemoController {

	@GetMapping("/")
	public String get() {
		return "template";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(DemoController.class, args);
	}
}
