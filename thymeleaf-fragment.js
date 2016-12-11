/*
 * thymeleaf-fragment.js 0.1.2
 * 
 * See: https://github.com/BlackPepperSoftware/thymeleaf-fragment.js
 */
function ThymeleafFragment() {

	// Prefix that gets prepended to view names when building a URL
	var templatePrefix = '';

	// Suffix that gets appended to view names when building a URL
	var templateSuffix = '.html';

	this.processAttributes = function() {
		// Hold off scripts waiting for the document to be ready
		$.holdReady(true);
		
		var promises = [];
		addPromises(promises);
		
		// Release scripts once all fragments have been processed
		$.when.apply(null, promises).done(function() {
			$.holdReady(false);
		});
	};

	var addPromises = function(promises, element) {
		$('[th\\:include]', element).each(function() {
			var fragmentSpec = $(this).attr('th:include');
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			promises.push(createLoadPromise(promises, this, fragmentUri, false));
		});
		
		$('[th\\:replace]', element).each(function() {
			var fragmentSpec = $(this).attr('th:replace');
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			promises.push(createLoadPromise(promises, this, fragmentUri, true));
		});
	};
	
	var resolveFragmentUri = function(fragmentSpec) {
		var tokens = fragmentSpec.split('::');
		var templateName = tokens[0];
		var fragmentName = removeFragmentParameters(tokens[1]);
		
		var resourceName = resolveTemplate(templateName);
		var fragmentSelector = '[th\\:fragment^="' + fragmentName + '"]';

		return resourceName + ' ' + fragmentSelector;
	};

	var removeFragmentParameters = function(fragmentExpression) {
		var index = fragmentExpression.indexOf('(');
		return (index == -1) ? fragmentExpression : fragmentExpression.substr(0, index);
	};

	var resolveTemplate = function(templateName) {
		var link = document.createElement('a');
		link.href = templatePrefix + templateName + templateSuffix;
		return link.href;
	};

	var createLoadPromise = function(promises, element, url, replace) {
		return $.Deferred(function(deferred) {
			$(element).load(url, function() {
				addPromises(promises, element);
				if (replace) {
					$(element).children().first().unwrap();
				}
				deferred.resolve();
			});
		}).promise();
	};
}

new ThymeleafFragment().processAttributes();
