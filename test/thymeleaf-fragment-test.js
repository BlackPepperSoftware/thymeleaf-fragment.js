describe('thymeleaf-fragment.js', function() {
	
	it('should include fragments', function() {
		load('include.html');
		
		expect(browser.driver.findElement(by.id('include')).getInnerHtml()).toEqual('<div th:fragment="x">y</div>');
	});

	it('should include nested fragments', function() {
		load('include-nested.html');

		expect(browser.driver.findElement(by.id('include')).getInnerHtml()).toEqual(
			'<div th:fragment="y">' +
				'<div th:include="fragments::x">' +
					'<div th:fragment="x">y</div>' +
				'</div>' +
			'</div>'
		);
	});

	it('should replace fragments', function() {
		load('replace.html');

		expect(browser.driver.findElement(by.id('replace')).getInnerHtml()).toEqual('<div th:fragment="x">y</div>');
	});

	it('should replace nested fragments', function() {
		load('replace-nested.html');

		expect(browser.driver.findElement(by.id('replace')).getInnerHtml()).toEqual(
			'<div th:fragment="z">' +
				'<div th:fragment="x">y</div>' +
			'</div>'
		);
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
