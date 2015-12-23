describe("thymeleaf-fragment.js", function() {
	
	it("should include fragments", function() {
		browser.driver.get("http://localhost:8080/test/thymeleaf-fragment-test.html");
		
		// TODO: Assert innerHTML rather than text
		expect(browser.driver.findElement(by.id("include")).getText()).toEqual("y");
	});
	
});
