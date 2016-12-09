describe('thymeleaf-fragment.js', function() {
	
	it('should include fragments', function() {
		load('include.html');
		
		expect(browser.driver.findElement(by.id('include')).getInnerHtml()).toEqual('<div th:fragment="x">y</div>');
	});

	it('should replace fragments', function() {
		load('replace.html');

		expect(browser.driver.findElement(by.id('replace')).getInnerHtml()).toEqual('<div th:fragment="x">y</div>');
	});

	var load = function(file) {
		browser.driver.get('http://localhost:8080/test/' + file);
		browser.wait(untilElementPresent(by.css('body.loaded')), 1000);
	};

	var untilElementPresent = function(locator) {
		return function() {
			return browser.driver.findElements(locator).then(function(elements) {
				return !!elements.length;
			})
		}
	};

});
