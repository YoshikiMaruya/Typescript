## Iterator
イテレータ自体はTypeScriptまたはES6の機能ではなく、オブジェクト指向プログラミング言語において一般的な振る舞いに関するデザインパターンです。これは、一般的に次のインターフェースを実装するオブジェクトです。

```
interface Iterator<T> {
  next(value?: any): IteratorResult<T>;
  return?(value?: any): IteratorResult<T>;
  throw?(e?: any): IteratorResult<T>;
}
```

このインターフェースは、コレクションまたはシーケンスのオブジェクトに属する値を取得することを可能にします。
`IteratorResult`は単なる`value+done`のペアです。
```
interface IteratorResult<T> {
  done: boolean;
  value: T;
}
```

何らかのframeという名前のオブジェクトがあると想像する。
このframeは、コンポーネントの一覧で構成されています。イテレータのインターフェースは、frameオブジェクトのコンポーネントを次のように取得することが出来ます。
```
class Component {
  constructor (public name: string) {}
}

class Frame implements Iterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true
      }
    }
  }

}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); //{ done: true }

// `value`プロパティを経由して、イテレータの戻り値を取得することができます
let component = iteratorResult1.value; // Component { name: 'top' }
```

繰り返しになるが、イテレータ自体はTypeScriptの機能ではありません。このコードは`Iterator`と`IteratorResult`のインターフェースを明示的に実装しなくても動作します。しかしながら、ES6のインターフェースを使うことはコードの一貫性を保つうえで非常に便利です。

上のコードでもいいが、リファクタリング可能！
ES6は反復可能プロトコルを定義していおり、その1つは[Symbol.iterator]シンボルです。
これを利用して`for...of`で反復可能なオブジェクトを実装出来ます。

```
//...
class Frame implements Iterable<Component> {

  constructor(public name: string, public components: Component[]) {}

  [Symbol.iterator]() {
    let pointer = 0;
    let components = this.components;

    return {
      next(): IteratorResult<Component> {
        if (pointer < components.length) {
          return {
            done: false,
            value: components[pointer++]
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    }
  }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  console.log(cmp);
}
```
残念ながら`frame.next()`はこのパターンでは動作しません。また、見た目が少し不格好です。そこで助けになるのがTypeScriptで利用できる`IterableIterator`インターフェースです。
```
//...
class Frame implements IterableIterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

  [Symbol.iterator](): IterableIterator<Component> {
    return this;
  }

}
//...
```
`farame.next()`と`for`ループの両方がIterableIteratorインターフェースでうまく動作するようになりました。
イテレータが反復する対象は有限個である必要はありません。
典型的な例はフィボナッチ計算です。

```
class Fib implements IterableIterator<number> {

  protected fn1 = 0;
  protected fn2 = 1;

  constructor(protected maxValue?: number) {}

  public next(): IteratorResult<number> {
    var current = this.fn1;
    this.fn1 = this.fn2;
    this.fn2 = current + this.fn1;
    if (this.maxValue != null && current >= this.maxValue) {
      return {
        done: true,
        value: null
      }
    }
    return {
      done: false,
      value: current
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

}

let fib = new Fib();

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21);
for(let num of fibMax21) {
  console.log(num); //Prints fibonacci sequence 0 to 21
}
```
