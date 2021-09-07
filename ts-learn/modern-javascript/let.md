## let
JavaScriptにおいて`var`変数は関数スコープです。
これは変数がブロックスコープである他の多くの言語とは異なる。
以下のJavaScriptコードを見ると、`123`を表示すると思うかもしれません。しかし、実際には`456`が表示されます。
```
var foo = 123;
if (true) {
  var foo = 456;
}
console.log(foo); // 456
```
これは`{`が新しい変数スコープを作成しないためです。
変数`foo`はifブロックの内側にあっても外側にあっても同じです。これはJavaScriptのプログラミングにおける一般的なエラーの原因です。
そのためTypeScriptとES6は`let`を導入して真のブロックスコープの変数を定義できるようにしている。つまり`var`の代わりに`let`を使用すると、スコープの外側で定義されているかもしれない変数とは異なる、真にユニークな変数を得ることが出来ます。先ほどと同じ例を`let`で示します。
```
let foo = 123;
if (true) {
  let foo = 456;
}

console.log(foo); // 123
```
`let`がエラーを防止するのに役立つのは、ループ処理です。
```
var index = 0;
var array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
  cosole.log(array[i]);
}

cosole.log(i); // 0
```
可能な時はいつでも`let`（または`const`）を使う！！

### 関数は新たにスコープを作成する
これまでに述べてきた、JavaScriptの関数が新しい変数スコープを作成することを例で示す。
```
var foo = 123;
function test() {
  var foo = 456;
}
test();
console.log(foo);
```
これは期待通りに動作します。これがなければ、JavaScriptでコードを書くのは至難の業でしょう。

### 生成されたjs
TypeScriptによって生成されたJavaScriptは、同じ名前の`let`変数がすでに周囲のスコープに存在する場合は単純に変数名を変更します。`let`変数を単純なリネームする。
次の例は`let`が`var`に置き換えられているだけです。
```
if (true) {
  let foo = 123;
}

// 下記のようになる //
if (true) {
  var foo =123;
}
```
しかし、変数名がすでに周囲のスコープによって補足されている場合には次のように新しい変数名が生成されます。（`_foo`に注目）
```
var foo = "123";
if (true) {
  let foo = 123;
}

// 下記のようになる //
var foo = "123";
if (true) {
  var _foo = 123; // rename
}
```
### クロージャ内のlet
一般的にJavaScriptのDeveloperに対して面接で質問されることは、以下のようなコードの出力結果です。
```
var func = []
// たくさん関数作る
for (var i = 0; i < 3; i++) {
  func.push(function() {
    console.log(i);
  })
}

// 呼びだし
for (var j = 0; j < 3; j++) {
  func[j]();
}
```
`0,1,2`と予測した人は少なくないと思う。
意外なことに、3つの関数はすべて「３」を表示します。理由は、3つの関数すべて外側のスコープの変数`i`を使用しており、それらを実行するときに（第二のループで）`i`の値が`3`だからです（これは最初のループの終了条件です）

修正方法の1つは、ループ毎にその反復だけの変数スコープを新しく作ることです。すでに学んだことですが、IIFEつまり即時関数実行式のパターンです。
```
var func = []

for (var i = 0;i < 3; i++) {
  (function() {
    var local = i;
    func.push(function() {
      console.log(local);
    })
  })();
}

for (var j = 0; j < 3; j++) {
  func[j]();
}
```
ここで関数は*local*変数を閉じ込めて（`closure`）ループ変数`i`の代わりに使用します。
```
var func = []
for (let i = 0; i < 3; i++) {
  func.push(function(){
    console.log(i);
  })
}
for (var j = 0; j < 3; j++) {
  func[j]();
}
```
`var`の代わりに`let`を使用すると、各ループ反復毎に固有の変数`i`が作られます。

### まとめ
`let`は、コードのあらゆる場所で非常に役立ちます。
コードの可読性を大きく改善し、プログラミングの誤りを防止します。
