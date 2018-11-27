
var html = document.getElementsByTagName("html")[0];
var body = document.getElementsByTagName("body")[0];
var h1 = document.getElementsByTagName("h1")[0];
var menu = document.getElementById("main-menu");
var navbutton = document.getElementById("nav-button");

function navButtonAction (btn) {
	btn.classList.toggle("close");

	html.classList.toggle("white-background");
	menu.classList.toggle("menu-show");
}