/*
 * thymeleaf-fragment.js 0.1.2
 * 
 * See: https://github.com/BlackPepperSoftware/thymeleaf-fragment.js
 */
function ThymeleafFragment() {

	// Prefix that gets prepended to view names when building a URL
	var templatePrefix = "";

	// Suffix that gets appended to view names when building a URL
	var templateSuffix = ".html";

	this.processAttributes = function() {
		// Hold off scripts waiting for the document to be ready
		$.holdReady(true);
		
		var promises = [];
		
		$("[th\\:include]").each(function() {
			var fragmentSpec = $(this).attr("th:include");
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			promises.push(createLoadPromise(this, fragmentUri, false));
		});
		
		$("[th\\:replace]").each(function() {
			var fragmentSpec = $(this).attr("th:replace");
			var fragmentUri = resolveFragmentUri(fragmentSpec);
			promises.push(createLoadPromise(this, fragmentUri, true));
		});
		
		// Release scripts once all fragments have been processed
		$.when.apply(null, promises).done(function() {
			$.holdReady(false);
		});
	}	
	
	var resolveFragmentUri = function(fragmentSpec) {
		var tokens = fragmentSpec.split("::");
		var templateName = tokens[0].trim();
		var fragmentName = removeFragmentParameters(tokens[1]).trim();
		
		var resourceName = resolveTemplate(templateName);
		var fragmentSelector = "[th\\:fragment^='" + fragmentName + "']," + fragmentName;

		return resourceName + " " + fragmentSelector;
	}

	var removeFragmentParameters = function(fragmentExpression) {
		var index = fragmentExpression.indexOf("(");
		return (index == -1) ? fragmentExpression : fragmentExpression.substr(0, index);
	}

	var resolveTemplate = function(templateName) {
		var link = document.createElement("a");
		link.href = templatePrefix + templateName + templateSuffix;
		return link.href;
	}

	var createLoadPromise = function(element, url, replace) {
		return $.Deferred(function(deferred) {
			$(element).load(url, function() {
				if (replace) {
					$(element).children().first().unwrap();
				}
				deferred.resolve();
			});
		}).promise();
	}
}

new ThymeleafFragment().processAttributes();
