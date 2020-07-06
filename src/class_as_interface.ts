class Point {
  x!: number;
  y!: number;
  draw(): void {
    console.log(this);
  }
}

function draw(p: Point) {
  if (!(p instanceof Point)) {
    throw new Error('Go away!');
  }
  p.draw();
}

// Error: Go away!
draw({
  x: 1,
  y: 2,
  draw() {
    console.log('hello', this);
  }
});


interface Point3D extends Point {
  z: number;
}

class MyPoint3D implements Point3D {
  x!: number;
  y!: number;
  z!: number;
  draw(): void {
    console.log(this.constructor.name, this);
  }
}

class MyPoint3D_2 extends Point implements Point3D {
  z!: number;
  draw(): void {
    console.log(this.constructor.name);
    super.draw();
  }
}


// Error: Go away!
draw(new MyPoint3D());

// OK!
draw(new MyPoint3D_2());


export {};
