Class('bio.view.Plant', {
	render: function(context, location, size) {
		context.save();

		context.translate(location.x, location.y);

		context.lineWidth = 2;
		context.strokeStyle = "black";
		context.fillStyle = "green";

		context.strokeRect(0, 0, size.x, size.y);
		context.fillRect(0, 0, size.x, size.y);

		context.restore();
	}
});
