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

	// Max level of recursion after which processing will stop
	var maxLevel = 5;

	this.processAttributes = function() {
		// Hold off scripts waiting for the document to be ready
		$.holdReady(true);
		
		processLevel(1);
	}

	var processLevel = function(level) {
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

		$.when.apply(null, promises).done(function() {
			var moreFragments = $("[th\\:include]").length > 0 || $("[th\\:replace]").length > 0;
			if (moreFragments && level < maxLevel) {
				processLevel(level + 1); // recurse if necessary
			} else {
				// Release scripts once all fragments have been processed recursively
				$.holdReady(false);
			}
		});
	}
	
	var resolveFragmentUri = function(fragmentSpec) {
		var tokens = fragmentSpec.split("::");
		var templateName = tokens[0];
		var fragmentName = removeFragmentParameters(tokens[1]);
		
		var resourceName = resolveTemplate(templateName);
		var fragmentSelector = "[th\\:fragment^='" + fragmentName + "']";
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
				} else {
					// remove th:include attribute to avoid processing this element again
					$(element).removeAttr("th:include");
				}
				deferred.resolve();
			});
		}).promise();
	}
}

new ThymeleafFragment().processAttributes();
