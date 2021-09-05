## アロー関数
### Arrow Functions
アロー関数は、かわいらしく*fat arrow*（なぜなら **->** は細く **=>** は太いから）、または *lambda*関数とも呼ばれます。一般的に利用される機能の1つは、このアロー関数 **()=> something**です。
これを使用する理由は主に以下の3つ
1. **function**を何度もタイピングしなくて済む
2. **this**の参照をレキシカルスコープで捕捉する。
3. **argments**の参照をレキシカルスコープで捕捉する。

関数型の言語と比べると、JavaScriptでは **function**を頻繁に打ち込む傾向がある。アロー関数を使うと関数をシンプルに作成できます。
```
let inc = (x) => x+1;
```
**this**はJavaScriptにおいて昔から頭痛の種だった。
アロー関数は、それを囲んだコンテキストから **this**を補足します。
純粋なJavaScriptだけで書かれたクラスを使って考える。
```
function Person(age) {
  this.age = age;
  this.growOld = function() {
    this.age++;
  }
}

let person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() { console.log(person.age); }, 2000):
// 1, should have been 2
```

このコードをブラウザで実行すると、関数内の`this`は`window`を参照します。なぜなら、`window`が`growOld`関数を実行しているからです。
修正方法はアロー関数を使用することです。
```
function Person(age) {
  this.age = age;
  this.growOld = () => {
    this.age++;
  }
}
let person  new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function() { console.log(person.age); }, 2000): // 2
```
これがうまくいく理由は、アロー関数が関数本体の外側の`this`を補足するからです。TypeScriptを使うとはるかに快適な構文でかける。
```
class Person {
  constructor(public age:number) {}
  growOld = () => {
    this.age++;
  }
}
let person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function() { console.log(person.age); }, 2000);
```
