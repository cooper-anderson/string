
class String {
	constructor(nodeCount, distance, color=new Color("#7289DA")) {
		this.nodeCount = nodeCount;
		this.distance = distance;
		this.nodes = [];
		this.color = color;
		this.gravity = new Vector2(0, -9.81 / 10);
		this.useGravity = false;
		for (let node = 0; node < this.nodeCount; node++) {
			this.nodes[node] = new Vector2();
		}
	}
	set(position) {
		this.nodes[0] = position;
	}
	update() {
		if (this.nodeCount < this.nodes.length) {
			this.nodes = this.nodes.splice(this.nodes.length - this.nodeCount);
		}
		for (let node = this.nodes.length; node < this.nodeCount; node++) {
			this.nodes[node] = new Vector2();
		}
		let previous = this.nodes[0]
		for (let node = 1; node < this.nodes.length; node++) {
			let direction = Vector2.Sub(previous, this.nodes[node]).normalized;
			let position = Vector2.Sub(previous, Vector2.Mult(direction, this.distance));
			if (this.useGravity) {
				position = Vector2.Sub(position, this.gravity)
			}
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
}
