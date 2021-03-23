import * as to from '../src/to';

// compose vs pipe

describe('@zodash/decorator to', () => {
  it('number', () => {
    class Controller {
      ctx = {
        query: {
          age: '10' as any,
          isActive: 'true',
        },
      };

      @to.number()
      public get age(): number {
        return this.ctx.query.age;
      }

      @to.number()
      public getAge(): number {
        return this.ctx.query.age;
      }

      // @to.number()
      // public age2;
    }

    const c = new Controller();

    expect(c.age).toEqual(10);
    expect(c.getAge()).toEqual(10);
    // expect(c.age2).toEqual(10);
  });

  it('boolean', () => {
    class Controller {
      ctx = {
        query: {
          isActive: 'False' as any,
          isActive2: '0' as any,
          isActive3: 'f' as any,
        },
      };

      @to.bool()
      public get isActive(): boolean {
        return this.ctx.query.isActive;
      }

      @to.bool()
      public getIsActive(): boolean {
        return this.ctx.query.isActive;
      }

      @to.bool()
      public get isActive2(): boolean {
        return this.ctx.query.isActive2;
      }

      @to.bool()
      public getIsActive2(): boolean {
        return this.ctx.query.isActive2;
      }

      @to.bool()
      public get isActive3(): boolean {
        return this.ctx.query.isActive3;
      }

      @to.bool()
      public getIsActive3(): boolean {
        return this.ctx.query.isActive3;
      }
    }

    const c = new Controller();

    expect(c.isActive).toEqual(false);
    expect(c.getIsActive()).toEqual(false);
    expect(c.isActive2).toEqual(false);
    expect(c.getIsActive2()).toEqual(false);
    expect(c.isActive3).toEqual(false);
    expect(c.getIsActive3()).toEqual(false);
  });
});
