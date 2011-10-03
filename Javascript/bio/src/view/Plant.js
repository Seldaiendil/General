Class('bio.view.Plant', {
	render: function(context, element) {
		var location = element.location;
		var size = element.size;

		context.save();
		context.translate(location.x, location.y);

		context.lineWidth = 1;
		context.strokeStyle = '#005500';
		context.fillStyle = '#00FF00';

		var halfSize = size.clone().multiply(0.5);
		context.strokeRect(-halfSize.x, -halfSize.y, size.x, size.y);
		context.fillRect(-halfSize.x, -halfSize.y, size.x, size.y);

		context.restore();
	}
});
