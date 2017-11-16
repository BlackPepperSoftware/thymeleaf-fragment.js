/*
 * thymeleaf-fragment.js 0.3.0
 * 
 * See: https://github.com/BlackPepperSoftware/thymeleaf-fragment.js
 */
function ThymeleafFragment() {
	/*
	 * Configuration is specified using "data-" attributes on <script> tag.
	 *  data-template-prefix - Prefix that gets prepended to view names when building a URL (default '')
	 *  data-template-suffix - Suffix that gets appended to view names when building a URL (default '.html')
	 */
	var config = getConfig();

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

	function getConfig() {
		var script = $('script[src$="/thymeleaf-fragment.js"]');
		return {
			templatePrefix: script.attr('data-template-prefix') || '',
			templateSuffix: script.attr('data-template-suffix') || '.html'
		}
	}

	function addPromises(promises, element) {
		$('[th\\:include]', element).each(function() {
			var fragmentSpec = $(this).attr('th:include');
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			$(this).removeAttr('th:include');
			promises.push(createLoadPromise(promises, this, fragmentUri, false, true));
		});
		
		$('[th\\:insert]', element).each(function() {
			var fragmentSpec = $(this).attr('th:insert');
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			$(this).removeAttr('th:insert');
			promises.push(createLoadPromise(promises, this, fragmentUri, false, false));
		});
		
		$('[th\\:replace]', element).each(function() {
			var fragmentSpec = $(this).attr('th:replace');
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			promises.push(createLoadPromise(promises, this, fragmentUri, true, false));
		});
	}
	
	function resolveFragmentUri(fragmentSpec) {
		var tokens = fragmentSpec.trim().split(/\s*::\s*/);
		var templateName = tokens[0];
		var fragmentExpression = tokens[1];
		
		var resourceName = resolveTemplate(templateName);
		var fragmentSelector = parseFragmentExpression(fragmentExpression);

		if (fragmentSelector === undefined) {
			return resourceName;
		}
		
		return resourceName + ' ' + fragmentSelector;
	}
	
	function parseFragmentExpression(fragmentExpression) {
		if (fragmentExpression === undefined) {
			return undefined;
		}

		// explicit DOM selector
		var domSelectorRegex = /\[(.*)]/;
		if (fragmentExpression.match(domSelectorRegex)) {
			return fragmentExpression.match(domSelectorRegex)[1];
		}
		
		// fragment name or implicit DOM selector
		var fragmentNameRegex = /([^()]*)/;
		var fragmentNameOrDomSelector = fragmentExpression.match(fragmentNameRegex)[1];
		return '[th\\:fragment^="' + fragmentNameOrDomSelector + '"], ' + fragmentNameOrDomSelector;
	}

	function resolveTemplate(templateName) {
		var link = document.createElement('a');
		link.href = config.templatePrefix + templateName + config.templateSuffix;
		return link.href;
	}

	function createLoadPromise(promises, element, url, replaceHost, insertOnlyContents) {
		return $.Deferred(function(deferred) {
			$(element).load(url, function() {
				var fragment = $(element).children().first().get();
				
				if (insertOnlyContents) {
					$(fragment).contents().first().unwrap();
				}
				else {
					$(fragment).removeAttr('th:fragment');
				}
				
				addPromises(promises, element);
				
				if (replaceHost) {
					$(fragment).unwrap();
				}
				
				deferred.resolve();
			});
		}).promise();
	}
}

new ThymeleafFragment().processAttributes();
