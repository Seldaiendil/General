#library('bio.physic');

class Vector {
	//
	// FIELDS
	//
	num _x, _y;


	//
	// CONSTRUCTORS
	//
	Vector(this._x, this._y);
	//Vector(num x, num y) { this.x = x; this.y = y; }
	Vector.zero() : this._x = 0, this._y = 0;
	Vector.fromAngle(num angle) {
		this.angle = angle;
	}


	//
	// OPERATORS
	//
	Vector clone() => new Vector(_x, _y);

	bool isZero() => _x == 0 && _y == 0;

	bool operator ==(Vector target) => _x == target._x && _y == target._y;

	Vector operator negate() => new Vector(-_x, -_y);

	Vector operator +(var target) {
		if (target is Vector)
			return new Vector(_x + target._x, _y + target._y);
		if (target is num)
			return new Vector(_x + target, _y + target);
		throw new Exception('[Vector operator+] Target --[$target]-- is not Vector nor num');
	}

	Vector operator -(var target) {
		if (target is Vector)
			return new Vector(_x - target._x, _y - target._y);
		if (target is num)
			return new Vector(_x - target, _y - target);
		throw new Exception('[Vector operator-] Target --[$target]-- is not Vector nor num');
	}

	Vector operator *(num target) => new Vector(_x * target, _y * target);
	
	Vector operator /(num target) => new Vector(_x / target, _y / target);
	
	
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
		
		_x = (_x * operator).round() / operator;
		_y = (_y * operator).round() / operator;
	}

	void abs() {
		_x = _x.abs();
		_y = _y.abs();
	}
	
	
	//
	// PROPERTIES
	//
	double get x() => _x;
	double set x(num value) => _x = value;
	
	double get y() => _y;
	double set y(num value) => _y = value;

	double get hypotenuse() => isZero() ? 0 : 1;//Math.sqrt((_x * _x) + (_y * _y), 2);
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

		double arctan = Math.atan(_y / _x);

		if (arctan < 0)
			arctan += Math.PI;
		if (_y < 0 || (_y == 0 && _x < 0))
			arctan += Math.PI;

		return arctan;
	}
	double set radians(num value) {
		_setRadianHypotenuse(value, this.hypotenuse);
		return value
	}


	void _setRadianHypotenuse(num radians, num hypotenuse) {
		_x = Math.cos(radians) * hypotenuse;
		_y = Math.sin(radians) * hypotenuse;
	}

	String toString() => "[Vector {$_x, $_y}]";
}














