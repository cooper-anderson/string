
let string = new String(51, 2);
let mouse = new Vector2();
let renderMode = "getBezier";

$("#main").on("mousemove", function(data) {
	mouse = new Vector2(data.offsetX, data.offsetY);
});

setInterval(function() {
	string.nodeCount = Number($("#count").val());
	string.distance = Number($("#distance").val());
	string.set(mouse);
	string.update();
	$("svg").html(string[renderMode]());
}, 1);

$(".toolbar-button").on("click", function() {
	function isActive(name) {return $(`.toolbar-button-${name}`).hasClass("active");}
	function setActive(name, value) {return (value) ? $(`.toolbar-button-${name}`).addClass("active") : $(`.toolbar-button-${name}`).removeClass("active");}

	let name = $(this).data("name");
	if (["getBezier", "getLines", "getCircles"].includes(name) && true) {
		$(".toolbar-group-tools>button").removeClass("active");
		setActive(name, true);
		renderMode = name;
	} else if (name == "mouse") {
		if (isActive("mouse")) {
			setActive("mouse", false);
			$(`.toolbar-button-mouse`).addClass("no-hover");
			$("#main").addClass("hideCursor");
		} else {
			setActive("mouse", true);
			$(`.toolbar-button-mouse`).removeClass("no-hover");
			$("#main").removeClass("hideCursor");
		}
	}
});

$(".toolbar-button").on("mouseleave", function() {
	$(this).removeClass("no-hover");
});
