describe("thymeleaf-fragment.js", function() {
	
	it("should include fragments", function() {
		browser.driver.get("http://localhost:8080/test/include.html");
		
		// TODO: Assert innerHTML rather than text
		expect(browser.driver.findElement(by.id("include")).getText()).toEqual("y");
	});
	
});
