## Spread Operator
スプレッド演算子の主な目的は、配列またはオブジェクトの要素を展開することです。以下例
### 引数への適応（Apply）
一般的なユースケースは、配列を使って関数に引数を渡すことです。
以前は`Function.prototype.apply`を使う必要がありました。
```
function foo(x, y, z) { }
var args = [0, 1, 2];
foo.apply(null, args);
```
### オブジェクトの展開
オブジェクトを別のオブジェクトに展開することもできます。
一般的なユースケースは、オリジナルに変更を加えることなくオブジェクトにプロパティを追加することです。
```
const point2D = { x: 1, y: 2 };
const point3D = { ...point3D, z:: 3 };
```
オブジェクトの場合、オブジェクトを展開する順序は重要です。これは`Object.assign`のように動作し、期待通りのことを行います。
最初に来るものは、後で来るものによって上書きされます。
```
const foo = { a: 1, y: 2 };
const anotherPoint3D = { x: 5, z: 4, ...point2D };
console.log(anotherPoint3D); // { x: 1, y: 2, z: 4 }
const yetAnotherPoint3D = { ...point2D, x: 5, z: 4 }
console.log(yetAnotherPoint3D); // {x: 5, y: 2, z: 4}
```
別の一般的なユースケースは、シンプルな浅い拡張です。
```
const foo = { a: 1, b: 2, c: 0 };
const bar = { c: 1, d: 2 };
// fooとbarを結合する。
const foobar = { ...foo, ...bar }; //{a: 1, b: 2, c: 1, d: 2}
```

### まとめ
スプレッド演算子はJavaScriptでよく使われる`apply`の`this`の引数にわかりづらい`null`を渡さなくてもすむようになるため優れた構文です。
また、配列を分割したり、他の配列に代入したりする構文を使うことによって簡潔なコードで部分配列に対する処理を行うことが出来ます。
