
class String {
	constructor(nodeCount, distance, color=new Color("#7289DA")) {
		this.nodeCount = nodeCount;
		this.distance = distance;
		this.nodes = [];
		this.color = color;
		this.gravity = new Vector2(0, -9.81 / 10);
		this.useGravity = false;
		this.wind = [0, 0];
		this.windConstants = [1000, 1000];
		this.useWind = false;
		for (let node = 0; node < this.nodeCount; node++) {
			this.nodes[node] = new Vector2();
		}
		this.frame = 0;
	}
	set(position) {
		this.nodes[0] = position;
	}
	update() {
		this.frame++;
		this.wind = [noise.perlin2(this.windConstants[0] + this.frame / 1000, 0), noise.perlin2(this.windConstants[1] + this.frame / 500, 1000)]
		if (this.nodeCount < this.nodes.length) {
			this.nodes = this.nodes.splice(this.nodes.length - this.nodeCount);
		}
		for (let node = this.nodes.length; node < this.nodeCount; node++) {
			this.nodes[node] = new Vector2();
		}
		let previous = this.nodes[0]
		for (let node = 1; node < this.nodes.length; node++) {
			let frame = this.frame / 100;
			let windConstant = 0.01;
			// (b-a)(n+1)/2 + a
			// bn+b-an+a / 2
			//let wind = this.useWind ? new Vector2(((this.wind[1] * windValue) + this.wind[1] + (this.wind[0] * windValue) + this.wind[0]) / 2) : new Vector2();
			let wind = this.useWind ? new Vector2((noise.perlin2(this.nodes[node].x * windConstant, frame)) * .2, (noise.perlin2(this.nodes[node].y * windConstant, frame))) : new Vector2();
			let direction = Vector2.Sub(Vector2.Add(Vector2.Sub(previous, wind), this.useGravity ? this.gravity : new Vector2()), this.nodes[node]).normalized;
			let position = Vector2.Sub(previous, Vector2.Mult(direction, this.distance));
			this.nodes[node] = position;
			previous = this.nodes[node];
		}
	}
	getCircles() {
		let element = "";
		for (let node in this.nodes) {
			element += `<circle cx="${this.nodes[node].x}" cy="${this.nodes[node].y}" r="${this.distance / 2}" fill="${this.color.cssHEX()}"></circle>`
		}
		return element;
	}
	getLines() {
		let path = `M${this.nodes[0].x} ${this.nodes[0].y}`;
		for (let node = 1; node < this.nodes.length; node++) {
			path += `L${this.nodes[node].x} ${this.nodes[node].y} `;
		}
		return `<path d="${path}" stroke="${this.color.cssHEX()}" fill="transparent" />`;
	}
	getBezier() {
		let path = "";
		for (let node = 0; node + 2 < this.nodes.length; node += 2) {
			path += `M${this.nodes[node].x} ${this.nodes[node].y} Q ${this.nodes[node + 1].x} ${this.nodes[node + 1].y}, ${this.nodes[node + 2].x} ${this.nodes[node + 2].y} `;
		}
		return `<path d="${path}" stroke="${this.color.cssHEX()}" fill="transparent" />`;
	}
	getCatmullRom() {
		/*
		 const spline = require('@yr/catmull-rom-spline');
		 const points = spline.points([[0,0], [1,1], [2,1], [3,0], [4,0]]);
		 const svgPath = spline.svgPath(points);
		 */
		let array = []
		for (let node in this.nodes) {
			array.push([this.nodes[node].x, this.nodes[node].y]);
		}
		let path = spline.svgPath(spline.points(array));
		return `<path d="${path}" stroke="${this.color.cssHEX()}" fill="transparent" />`;
	}
}
