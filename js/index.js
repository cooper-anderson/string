
let string = new String(51, 2);
let mouse = new Vector2();
let renderMode = "getCatmullRom";

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
	if (["getBezier", "getLines", "getCircles", "getCatmullRom"].includes(name) && true) {
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
	} else if (name == "gravity") {
		if (isActive("gravity")) {
			setActive("gravity", false);
			$(`.toolbar-button-gravity`).addClass("no-hover");
			string.useGravity = false;
		} else {
			setActive("gravity", true);
			$(`.toolbar-button-gravity`).removeClass("no-hover");
			string.useGravity = true;
		}
	} else if (name == "wind") {
		if (isActive("wind")) {
			setActive("wind", false);
			$(`.toolbar-button-wind`).addClass("no-hover");
			string.useWind = false;
		} else {
			setActive("wind", true);
			$(`.toolbar-button-wind`).removeClass("no-hover");
			string.useWind = true;
		}
	}
});

$(document).on("keydown", function(data) {
	let key = data.key;
	if (key == "ArrowUp") {
		$("#distance").val(Number($("#distance").val()) + 1);
	} else if (key == "ArrowDown") {
		$("#distance").val(Number($("#distance").val()) - 1);
	} else if (key == "ArrowLeft") {
		$("#count").val(Number($("#count").val()) - 1);
	} else if (key == "ArrowRight") {
		$("#count").val(Number($("#count").val()) + 1);
	} else if (key > 0 && key <= $(".toolbar-group-tools").children().length) {
		$(`.toolbar-group-tools>button:nth-child(${key})`).trigger("click");
	} else if (key == 'q') {
		$(".toolbar-button-mouse").trigger("click");
	} else if (key == 'w') {
		$(".toolbar-button-gravity").trigger("click");
	} else if (key == 'e') {
		$(".toolbar-button-wind").trigger("click");
	}
});

$(".toolbar-button").on("mouseleave", function() {
	$(this).removeClass("no-hover");
});
