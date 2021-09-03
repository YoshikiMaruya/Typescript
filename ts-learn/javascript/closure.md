## クロージャ（closure）
JavaScriptで最も素晴らしいものは、クロージャでした。
JavaScript関数は、外部スコープで定義された変数にアクセス出来ます。
下記の例でクロージャに対する理解を深める。
```
function outerFunction(arg) {
  let variableInOuterFunction = arg;

  function bar() {
    // 外部スコープにある変数にアクセスする。
    console.log(variableInOuterFunction);
  }

  // argにアクセスできることを示すために、ローカル関数を呼び出す。
  bar();
}

outerFunction("hello closure");
```
内側の関数は外側のスコープの変数(variableInOuterFunction)にアクセスできることがわかります。外側の関数の変数は、内側の関数に閉包されています(または束縛されています)。したがって、クロージャ(closure)という用語のコンセプト自体は簡単で直感的です。

**クロージャの素晴らしい点**

内側の関数は、外側の関数が`return`された後でも変数にアクセスできます。これは変数が内側の関数に束縛されており、外側の関数に依存していないからです。

### なぜクロージャがすばらしいか
オブジェクトを簡単に作成することが出来ます。revealing module patternというコーディングパターンがあります。
```
function createCounter() {
  let val = 0;
  return {
    increment() { val++ },
    getVal() { return val }
  }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2
```
クロージャを使いこなせばNode.jsのようなものも作成可能！
