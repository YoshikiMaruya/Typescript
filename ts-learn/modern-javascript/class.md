## クラス
### クラス（class）
JavaScriptにおいて、クラスを第一級のものとして持つことが重要である理由は主に3点あります。
1. クラスが提供する便利な構造の抽象化
2. それぞれのフレームワーク（ember.js, react.jsなど）がそれぞれ独自のクラス構文を提供するのではなく、一貫したクラス構文を提供する。
3. オブジェクト指向の開発者にとっての親和性

TypeScriptでは、ブラウザの五感で意を気にすることなく`class`を使うことが出来ます。ここに、`Point`という簡単なクラスの例をしめす。
```
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}

let p1 = new Point(0, 10);
let p2 = new Point(10, 20);
let p3 = p1.add(p2); // { x: 10, y: 30 }
```
このクラスをコンパイルすると、古いブラウザ（ES5）で動作する次のJavaScriptを生成します。
```
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    return Point;
}());
var p1 = new Point(1, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2);
```
これは慣用的に使われてきた従来のJavaScriptのクラスパターンである。

### 継承（inheritance）
TypeScriptにおけるクラスは`extends`を使った単一警鐘をサポートしている。
```
class Point3D extends Point {
  z: number;
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }
  add(point: Point3D) {
    let Point2D = super.add(point);
    return new Point3D(point2D.x, point2D.y, this.z + point.z);
  }
}
```

クラスにコンストラクタがある場合、コンストラクタから親コンストラクタを呼び出さなければなりません。（TypeScriptはこれをしていない場合エラーを表示）これにより、`this`のプロパティが正しく設定されます。`super`を呼び出した後、コンストラクタで必要な処理を追加することが出来ます（例えば、他のプロパティ`z`を追加します）。
親のメンバ関数をオーバーライドする（ここでは`add`をオーバーライドします）場合でも、親クラスの機能を呼び出せることに注意してください。（`super.`構文を使います）

### 静的メンバ（Statics）
TypeScriptクラスは、クラスの全インスタンスで共有される`static`なプロパティをサポートします。静的メンバを置き、アクセスする自然な場所はクラスそのものです。TypeScriptでは、`static`がサポートされています。
```
class Something {
  static instances = 0;
  constructor() {
    Something.instances++;
  }
}

let s1 = new Something();
let s2 = new Something();
console.log(Something.instances); // 2
```
静的メンバと同様に静的巻子も使用できます。

### アクセス修飾子（Access Modifiers）

| アクセス可能な場所 | public | protected | private |
|:-:|:-:|:-:|:-:|
| class  | yes  | yes  | yes  |
| class children  | yes  | yes  | no  |
| class instances  |  yes | no  |  no |

アクセス修飾子は、ランタイム上では何の影響もないが、間違った使い方をするとコンパイルエラーが出力されることに注意してください。
それぞれの例を以下に示す。

```
class FooBase {
  public x: number;
  private y: number;
  protected z: number;
}
// インスタンスにおける効果
let foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // EEROR : protected

// サブクラスにおける効果
class FooChild extends FooBase {
  constructor() {
    super();
    this.x; // okay
    this.y; // ERROR : private
    this.z; // okay
  }
}
```
### Abstract修飾子
`abstract`はアクセス修飾子の1つと考えることが出来ます。
上で述べた修飾子とは異なり、クラスのメンバと同様に`class`に対しても利用できるため、アクセス修飾子とは分けて説明する。
`abstract`修飾子が主に意味することは、その機能を親クラスに対して直接的に呼び出せず、子クラスがその具体的な機能を提供しなければならないということです。
- 抽象クラスを直接インスタンス化することはできません。その代わりに、`abstract class`を継承した`class`を作成しなければならない。

```
abstract class FooCommand {}
class BarCommand extends FooCommand {}
// Cannot create an instance of an abstract class.
const fooCommand: FooCommand = new FooCommand();
// You can create an instance of a class that inherits from an abstract class.
const barCommand = new BarCommand();
```
- 抽象メンバは直接アクセスできません。子クラスがその具体的な機能を（実装）提供しなくてはなりません。

```
abstract class FooCommand {
  abstract execute(): string;
}

// 'BarErrorCommand' needs implement abstract member 'execute'.
class BarErrorCommand extends FooCommand {}

class barCommand = new BarCommand();

// Command Bar executed.
barCommand.execute();
```
### コンストラクタは必須ではありません
クラスは必ずコンストラクタを持っているわけではない。
以下は正しく動作する。
```
class Foo {}
let foo = new Foo();
```

### コンストラクタを定義する
以下のように、クラスのメンバを定義し、初期化できる。
```
class Foo {
  x: number;
  constructor(x:number) {
    this.x = x;
  }
}
```
これはTypeScriptの省略形がつかえるパターンです　
コンストラクタ引数にアクセス修飾子を付けることが出来、それが自動的にクラス内に宣言され、コンスタントにの引数によって値が初期化されます。
したがって前例は以下のように書き直せる。
```
class Foo {
  constructor(public x:number){}
}
```
### プロパティ初期化子（Property initializer）
これはTypeScript（及びES7以降）でサポートされている気の利いた機能です。クラスのコンストラクタの外側でクラスのメンバ変数を初期化できます。デフォルト値を指定するのに便利です。（**member**に注目）
```
class Foo {
  member = []; // Initialize directly
  add(x) {
    this.members.push(x);
  }
}
```
