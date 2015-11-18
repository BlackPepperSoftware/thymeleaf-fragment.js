thymeleaf-fragment.js
=====================

Script to process [Thymeleaf](http://www.thymeleaf.org/) fragments in the browser.

Thymeleaf promotes the use of natural templates that can be viewed in the browser as static prototypes. This works well for the majority of Thymeleaf attributes but falls down when using [template fragments](http://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html#template-layout). Third-party tools such as [Thymol](http://www.thymoljs.org/) do solve this problem but they also process the entire template which is often a hindrance.

To address this `thymeleaf-fragment.js` provides a simple script that processes `th:include` and `th:replace` attributes only. It depends on [jQuery](http://jquery.com/) and has been tested against version 2.1.4.

Getting started
---------------

Include jQuery and the script within your template:

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="http://blackpeppersoftware.github.io/thymeleaf-fragment.js/thymeleaf-fragment.js"
	defer="defer" th:if="false"></script>
```

The `th:if` attribute includes the script when prototyping but not at runtime. `defer` will execute the script once the document has finished loading. If you include other scripts that rely on included fragments then ensure that they are included after `thymeleaf-fragment.js`.

Using fragments
---------------

Once `thymeleaf-fragment.js` has been included in your page simply use the regular Thymeleaf `th:include` attribute to include a fragment:

```html
<html>
	<body>
		<div th:include="myfragments::helloworld"></div>
	</body>
</html>
```

This will look for the template `myfragments.html` and find the named fragment `helloworld`:

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
		<div th:include="myfragments::helloworld">
			<p>Hello world!</p>
		</div>
	</body>
</html>
```

To replace the `<div>` with the fragment instead use the Thymeleaf `th:replace` attribute. See the [Thymeleaf documentation](http://www.thymeleaf.org/doc/tutorials/2.1/usingthymeleaf.html#template-layout) for more details about the syntax.

Demo
----

View the [demo](http://blackpeppersoftware.github.io/thymeleaf-fragment.js/demo/template.html) to see a live example of including and replacing fragments.
