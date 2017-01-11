describe('thymeleaf-fragment.js', function() {
	
	describe('th:include', function() {

		it('should include fragments by fragment name', function() {
			load('include-fragmentname.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:include="fragments::simple">' +
					'<div th:fragment="simple">x</div>' +
				'</div>'
			);
		});

		it('should include fragments by fragment name with parameters', function() {
			load('include-fragmentparams.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:include="fragments::simple(a=b,c=d)">' +
					'<div th:fragment="simple">x</div>' +
				'</div>'
			);
		});

		it('should include fragments by explicit DOM selector', function() {
			load('include-domselector-explicit.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:include="fragments::[#simple]">' +
					'<div id="simple">y</div>' +
				'</div>'
			);
		});

		it('should include fragments by implicit DOM selector', function() {
			load('include-domselector-implicit.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:include="fragments::#simple">' +
					'<div id="simple">y</div>' +
				'</div>'
			);
		});

		it('should include templates', function() {
			load('include-template.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:include="template">' +
					'<div>z</div>' +
				'</div>'
			);
		});

		it('should include nested fragments', function() {
			load('include-nested.html');

			expect(getMainInnerHtml()).toEqual(
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

			expect(getMainInnerHtml()).toEqual(
				'<div th:include=" fragments :: simple ">' +
					'<div th:fragment="simple">x</div>' +
				'</div>'
			);
		});

	});
	
	describe('th:replace', function() {

		it('should replace fragments by fragment name', function() {
			load('replace-fragmentname.html');

			expect(getMainInnerHtml()).toEqual('<div th:fragment="simple">x</div>');
		});

		it('should replace fragments by fragment name with parameters', function() {
			load('replace-fragmentparams.html');

			expect(getMainInnerHtml()).toEqual('<div th:fragment="simple">x</div>');
		});

		it('should replace fragments by explicit DOM selector', function() {
			load('replace-domselector-explicit.html');

			expect(getMainInnerHtml()).toEqual('<div id="simple">y</div>');
		});

		it('should replace fragments by implicit DOM selector', function() {
			load('replace-domselector-implicit.html');

			expect(getMainInnerHtml()).toEqual('<div id="simple">y</div>');
		});

		it('should replace templates', function() {
			load('replace-template.html');

			expect(getMainInnerHtml()).toEqual('<div>z</div>');
		});

		it('should replace nested fragments', function() {
			load('replace-nested.html');

			expect(getMainInnerHtml()).toEqual(
				'<div th:fragment="nestedReplace">' +
					'<div th:fragment="simple">x</div>' +
				'</div>'
			);
		});

		it('should ignore whitespace in replace fragment spec', function() {
			load('replace-whitespace.html');

			expect(getMainInnerHtml()).toEqual('<div th:fragment="simple">x</div>');
		});

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
	
	var getMainInnerHtml = function() {
		return browser.driver.findElement(by.tagName('main')).getInnerHtml();	
	};

});
