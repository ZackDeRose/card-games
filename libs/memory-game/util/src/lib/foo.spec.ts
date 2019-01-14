import { Foo } from './foo';

// describe('Foo Class', () => {
//   describe('constructor', () => {
//     const fooClassRef = Foo as any; // to pass typechecking
//     beforeEach(() => {
//       console.log(`start of beforeEach: ${fooClassRef._count}`);
//       fooClassRef._count = 0;
//       console.log(`end of beforeEach: ${fooClassRef._count}`);
//     });
//     test('creating one Foo obj should result in an id of 1', () => {
//       console.log(fooClassRef._count);
//       const foo = new Foo();
//       expect(foo.id).toBe(1);
//     });
//     test('creating two Foo objs should result in ids of 1 and 2', () => {
//       console.log(fooClassRef._count);
//       const foo1 = new Foo();
//       const foo2 = new Foo();
//       expect(foo1.id).toBe(1);
//       expect(foo2.id).toBe(2);
//     });
//   });
// });
debugger;
beforeEach(() => {
  console.log(1);
  const fooClassRef = Foo as any;
  fooClassRef._count = 0;
});
describe('Foo Class', () => {
  beforeEach(() => console.log(2));
  describe('constructor', () => {
    beforeEach(() => console.log(3));
    describe('creating one Foo obj', () => {
      beforeEach(() => console.log('4A'));
      it('should have an id of 1', () => {
        console.log('A');
        const foo = new Foo();
        expect(foo.id).toBe(1);
      });
    });
    describe('creating two Foo objs', () => {
      let foo1;
      let foo2;
      beforeEach(() => {
        console.log('4B');
        foo1 = new Foo();
        foo2 = new Foo();
      });
      it('should have ids of 1 and 2', () => {
        console.log(`4B'`);
        expect(foo1.id).toBe(1);
        expect(foo2.id).toBe(2);
      });
      it('should originally start with ids of 1 and 2, but they could be changed', () => {
        console.log(`4B''`);
        expect(foo1.id).toBe(1);
        expect(foo2.id).toBe(2);
        foo2.id = 47;
        expect(foo1.id).toBe(1);
        expect(foo2.id).toBe(47);
      });
    });
    describe(`creating lots of Foos`, () => {
      let fooArr: Foo[];
      const test = (x: number) => {
        describe(`creating ${x} Foo objs`, () => {
          beforeEach(() => {
            // fooArr = [];
            // for (let i = 0; i < x; i++) {
            //   fooArr.push(new Foo());
            // }
            fooArr = Array.from(Array(x), () => new Foo());
          });
          it('each obj should have an ID corresponding to the order it was created', () => {
            console.log(fooArr);
            for (let i = 0; i < x; i++) {
              expect(fooArr[i].id).toBe(i + 1);
            } 
          });
        });
      };
      test(5);
      test(20);
      test(100);
    });
  });
});