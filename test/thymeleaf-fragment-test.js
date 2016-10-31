describe("thymeleaf-fragment.js", function() {
	
	it("should include fragments", function() {
		browser.driver.get("http://localhost:8080/test/include.html");
		
		// TODO: Assert innerHTML rather than text
		expect(browser.driver.findElement(by.id("include")).getText()).toEqual("y");
	});

	it("should include fragments recursively and stop at maxLevel depth", function() {
		browser.driver.get("http://localhost:8080/test/recursion.html");
		browser.wait(function() {return browser.driver.isElementPresent(by.id('f5'))}, 5000);
		var text = browser.driver.findElement(by.id("include")).getText();
		expect(text).toContain("fragment5");
		expect(text).not.toContain("fragment6");
	});
	
});
