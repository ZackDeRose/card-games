export class Foo {
  private static _count = 0;
  id: number;
  constructor() {
    this.id = ++Foo._count; // starts with 1
  }
}