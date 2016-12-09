describe('thymeleaf-fragment.js', function() {
	
	it('should include fragments', function() {
		browser.driver.get('http://localhost:8080/test/include.html');
		
		expect(browser.driver.findElement(by.id('include')).getInnerHtml()).toEqual('<p th:fragment="x">y</p>');
	});

	it('should replace fragments', function() {
		browser.driver.get('http://localhost:8080/test/replace.html');

		expect(browser.driver.findElement(by.id('replace')).getInnerHtml()).toEqual('<p th:fragment="x">y</p>');
	});

});
