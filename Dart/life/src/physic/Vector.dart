#library('bio.physic');

class Vector {
	//
	// FIELDS
	//
	num x, y;


	//
	// CONSTRUCTORS
	//
	Vector(this.x, this.y);
	Vector.zero() : this.x = 0, this.y = 0;
	Vector.fromAngle(num angle) {
		this.angle = angle;
	}


	//
	// OPERATORS
	//
	Vector clone() => new Vector(x, y);

	bool isZero() => x == 0 && y == 0;

	bool operator ==(Vector target) => x == target.x && y == target.y;

	Vector operator negate() => new Vector(-x, -y);

	Vector operator +(var target) {
		if (target is Vector)
			return new Vector(x + target.x, y + target.y);
		if (target is num)
			return new Vector(x + target, y + target);
		throw new Exception('[Vector operator+] Target --[$target]-- is not Vector nor num');
	}

	Vector operator -(var target) {
		if (target is Vector)
			return new Vector(x - target.x, y - target.y);
		if (target is num)
			return new Vector(x - target, y - target);
		throw new Exception('[Vector operator-] Target --[$target]-- is not Vector nor num');
	}

	Vector operator *(num target) => new Vector(x * target, y * target);
	
	Vector operator /(num target) => new Vector(x / target, y / target);
	
	
	//
	// MATH
	//
	void round([int decimals = 0]) {
		// TODO: Integer.pow not implemented yet
		//int operator = 10.pow(decimals);
		int operator = 1;
		while (decimals-- != 0) {
			operator *= 10;
		}
		
		x = (x * operator).round() / operator;
		y = (y * operator).round() / operator;
	}

	void abs() {
		x = x.abs();
		y = y.abs();
	}

	//
	// PROPERTIES
	//
	double get hypotenuse() => isZero() ? 0 : Math.sqrt((x * x) + (y * y), 2);
	double set hypotenuse(num value) {
		_setRadianHypotenuse(this.radians, value);
		return value;
	}

	double get angle()  {
		double angle = (this.radians / Math.PI * 180) % 360;
		
		if (angle < 0)
			angle += 360;

		return angle;
	}
	double set angle(num value) {
		value %= 360;

		if (value < 0)
			value += 360;

		this.radians = value * Math.PI / 180;
		return value;
	}

	double get radians() {
		if (isZero())
			return 0;

		double arctan = Math.atan(y / x);

		if (arctan < 0)
			arctan += Math.PI;
		if (y < 0 || (y == 0 && x < 0))
			arctan += Math.PI;

		return arctan;
	}
	double set radians(num value) {
		_setRadianHypotenuse(value, this.hypotenuse);
		return value
	}


	void _setRadianHypotenuse(num radians, num hypotenuse) {
		x = Math.cos(radians) * hypotenuse;
		y = Math.sin(radians) * hypotenuse;
	}

	String toString() => "[Vector {$x, $y}]";
}














