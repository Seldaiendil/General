Class('bio.view.Plant', {
	render: function(context, location, size, movement, parent) {
		context.save();

		context.translate(location.x, location.y);

		context.lineWidth = 2;
		context.strokeStyle = "black";
		context.fillStyle = "green";
		if (this.see) {
			context.lineWidth = 10;
			context.strokeStyle = "red";
			context.fillStyle = "blue";
		}

		context.strokeRect(0, 0, size.x, size.y);
		context.fillRect(0, 0, size.x, size.y);

		context.fillText(parent.getId(), size.x, size.y);

		context.restore();
	}
});
