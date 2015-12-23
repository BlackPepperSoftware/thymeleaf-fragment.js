exports.config = {
	framework: "jasmine",
	seleniumServerJar: "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.48.2.jar",
	chromeDriver: "./node_modules/chromedriver/lib/chromedriver/chromedriver",
	specs: ["test/thymeleaf-fragment-test.js"]
}
