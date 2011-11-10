#import('physic/Vector.dart');
#import('physic/Force.dart');

int main() {
	var force = new Force.empty();
	print(force);

	var vec = new Vector(2, 4);
	print(vec);
	print(vec.angle);
	print(vec += 1);
	print(vec += new Vector(7, 5));
	print(-vec);
	print(vec.angle);
	print(vec.round(2));
	print(vec);
	print(vec.abs());
	print(vec);
	print(vec.hypotenuse);
}
