Class('bio.view.Base', {
	render: function(context, element) {
		var location = element.location;
		var movement = element.movement;
		var size = element.size;
		var force = movement.getVector();
		var halfSize = size.clone().multiply(0.5);

		context.save();
		context.translate(location.x, location.y);

		context.save();
		context.rotate(movement.getDirectionRadians());

		context.lineWidth = 2;
		context.strokeStyle = 'black';
		context.fillStyle = 'red';

		context.strokeRect(-halfSize.x, -halfSize.y, size.x, size.y);
		context.fillRect(-halfSize.x, -halfSize.y, size.x, size.y);

		context.restore();

		var multiplier = 3;
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(force.x * multiplier, force.y * multiplier)
		context.stroke();

		context.fillStyle = 'blue';
		context.translate(force.x * multiplier, force.y * multiplier)
		context.fillRect(-2, -2, 4, 4);

		context.restore();
	}
});
