thymeleaf-fragment.js
=====================

Process [Thymeleaf](http://www.thymeleaf.org/) fragments in the browser.

Thymeleaf promotes the use of natural templates that can be viewed in the browser as static prototypes. This works well for the majority of Thymeleaf attributes but falls down when using [template fragments](http://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html#template-layout). Third-party tools such as [Thymol](http://www.thymoljs.org/) do solve this problem but they also process the entire template which can be a hindrance.

To address this `thymeleaf-fragment.js` provides a simple script that only processes `th:include` and `th:replace` attributes using [jQuery](http://jquery.com/).

Getting started
---------------

Include jQuery and the script within your template:

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js" th:if="false"></script>
<script src="http://blackpeppersoftware.github.io/thymeleaf-fragment.js/thymeleaf-fragment.js"
	defer="defer" th:if="false"></script>
```

The `th:if` attributes cause the scripts to be included when prototyping but not at runtime. `defer` will execute the script once the document has finished loading. If you include any other scripts that rely on included fragments then ensure that they are included after `thymeleaf-fragment.js`.

Using fragments
---------------

Once `thymeleaf-fragment.js` has been included in your template simply use the regular Thymeleaf `th:include` attribute to include a fragment:

```html
<html>
	<body>
		<div th:include="fragments::helloworld"></div>
	</body>
</html>
```

This will look for the template `fragments.html` and find the named fragment `helloworld`:

```html
<html>
	<body>
		<p th:fragment="helloworld">Hello world!</p>
	</body>
</html>
```

And then append its content to the `<div>` to produce:

```html
<html>
	<body>
		<div th:include="fragments::helloworld">
			<p>Hello world!</p>
		</div>
	</body>
</html>
```

To replace the `<div>` with the fragment instead use the Thymeleaf `th:replace` attribute. See the [Thymeleaf documentation](http://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html#template-layout) for more details about the fragment syntax.

Demo
----

View the [demo](http://blackpeppersoftware.github.io/thymeleaf-fragment.js/demo/template.html) to see a live example of including and replacing fragments.

Browser restrictions
--------------------

When prototyping templates locally fragments are loaded from the local file system. Browsers will typically disallow this since cross origin requests are denied for the `file:` protocol. This security constraint can be relaxed to allow fragments to be loaded correctly. For example, when using Chrome relaunch the browser using:

```
google-chrome --allow-file-access-from-files
```

Note that this is not required if you [preview the templates directly from an IDE such as IntelliJ IDEA](https://www.jetbrains.com/idea/help/previewing-pages-with-web-contents-in-a-browser.html). This is because the templates are loaded from IntelliJ IDEA's local HTTP server and not the local file system.

Alternatively, you may wish to use a tool like [live-server](https://www.npmjs.com/package/live-server) to serve up your local files through a local HTTP server.

Resolving templates
-------------------

On the server-side Thymeleaf uses the [ITemplateResolver](http://www.thymeleaf.org/apidocs/thymeleaf/2.1.4.RELEASE/org/thymeleaf/templateresolver/ITemplateResolver.html) interface to resolve template names into resources. For the client-side `thymeleaf-fragment.js` takes the following approach:

1. Prepend the template prefix (nothing by default) and append the template suffix (`.html` by default) to the template name
2. Resolve the resultant relative URL against the document's base URL to obtain an absolute URL

For example, consider how a template `file:///app/template.html` that includes the fragment `fragments::helloworld` is resolved: firstly, the fragment's template name `fragments` is converted into the relative URL `fragments.html`; then it is resolved against the template's base URL `file:///app/template.html` to obtain `file:///app/fragments.html`.

When templates are organised in a hierarchy use the `<base>` HTML element to define the base URL for fragments. For example, given the following file structure:

```
app/
+- admin/
|  +- widgetsView.html
+- widget/
   +- widget.html
```

The template `widgetsView.html` can define `app/` to be the base URL for the fragment `widget.html` as follows:

```html
<html>
	<head>
		<base href="../" th:if="false"/>
	</head>
	<body>
		<div th:include="widget/widget::widget"></div>
	</body>
</html>
```

The `th:if` attribute causes the template's base URL to be set when prototyping but not at runtime.

[![Build Status](https://travis-ci.org/BlackPepperSoftware/thymeleaf-fragment.js.svg?branch=master)](https://travis-ci.org/BlackPepperSoftware/thymeleaf-fragment.js)
