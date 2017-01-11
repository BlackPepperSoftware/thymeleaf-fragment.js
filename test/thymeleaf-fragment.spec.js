describe('thymeleaf-fragment.js', function() {
	
	it('should include fragments by fragment name', function() {
		load('include-fragmentname.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="fragments::simple">' +
				'<div th:fragment="simple">x</div>' +
			'</div>'
		);
	});

	it('should include fragments by fragment name with parameters', function() {
		load('include-fragmentparams.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="fragments::simple(a=b,c=d)">' +
				'<div th:fragment="simple">x</div>' +
			'</div>'
		);
	});
	
	it('should include fragments by explicit DOM selector', function() {
		load('include-domselector-explicit.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="fragments::[#simple]">' +
				'<div id="simple">y</div>' +
			'</div>'
		);
	});
	
	it('should include fragments by implicit DOM selector', function() {
		load('include-domselector-implicit.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="fragments::#simple">' +
				'<div id="simple">y</div>' +
			'</div>'
		);
	});
	
	it('should include templates', function() {
		load('include-template.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="template">' +
				'<div>z</div>' +
			'</div>'
		);
	});
	
	it('should include nested fragments', function() {
		load('include-nested.html');

		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include="fragments::nestedInclude">' +
				'<div th:fragment="nestedInclude">' +
					'<div th:include="fragments::simple">' +
						'<div th:fragment="simple">x</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
	});
	
	it('should ignore whitespace in include fragment spec', function() {
		load('include-whitespace.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:include=" fragments :: simple ">' +
				'<div th:fragment="simple">x</div>' +
			'</div>'
		);
	});
	
	it('should replace fragments by fragment name', function() {
		load('replace-fragmentname.html');

		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:fragment="simple">x</div>'
		);
	});

	it('should replace fragments by fragment name with parameters', function() {
		load('replace-fragmentparams.html');

		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:fragment="simple">x</div>'
		);
	});
	
	it('should replace fragments by explicit DOM selector', function() {
		load('replace-domselector-explicit.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div id="simple">y</div>'
		);
	});
	
	it('should replace fragments by implicit DOM selector', function() {
		load('replace-domselector-implicit.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div id="simple">y</div>'
		);
	});
	
	it('should replace templates', function() {
		load('replace-template.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div>z</div>'
		);
	});
	
	it('should replace nested fragments', function() {
		load('replace-nested.html');

		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:fragment="nestedReplace">' +
				'<div th:fragment="simple">x</div>' +
			'</div>'
		);
	});
	
	it('should ignore whitespace in replace fragment spec', function() {
		load('replace-whitespace.html');
		
		expect(browser.driver.findElement(by.tagName('main')).getInnerHtml()).toEqual(
			'<div th:fragment="simple">x</div>'
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
