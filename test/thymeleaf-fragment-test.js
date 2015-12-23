QUnit.test("th:include test", function(assert) {
	var include = document.getElementById("include");
	assert.equal(include.innerHTML, "<p th:fragment=\"x\">y</p>");
});
