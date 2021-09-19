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
const yet
```
