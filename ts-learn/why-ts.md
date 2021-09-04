## Why TypeScript

### TypeScriptの主要なゴールは以下の2つ
- JavaScriptに任意の型システムを追加する。
- JavaScriptの将来のバージョンで計画されている機能を、現在のJavaScriptの環境でも使えるようにする。

以下でなぜこれらのゴールが重要なのか、ゴールを目指す動機を説明する。

### TypeScriptの型システム
型はコードの品質と読みやすさを高めることが実証されています。
大規模なチームは常にこの結論に至っている。

- 型は、リファクタリングする際の開発スピードを高める。
型があることによってコードを書いている時点でエラーに気付くことが出来ます。
そしてすぐにエラーを修正できます。
ランタイム（実行時）で、初めてエラーに気付いて、コードに戻って修正するよりもずっと効率的です。
開発中に早い段階でエラーに気付けるということは非常に素晴らしいことです。
- 型は、それ自体が完璧なドキュメントです。
関数のシグネチャは定理であり、関数の本体は証明です。

### JavaScriptはTypeScriptのsubset
上記を言い換えればTypeScriptはJavaScriptのsupersetということになる。
TypeScriptは意図的なかつ厳密なJavaScriptの上位互換であり、任意の型チェックの
仕組みを持ったプログラミング言語です。

### 暗黙的な型推論
TypeScriptはコーディングの生産性に対する影響をなるべく小さく抑えながら型の安全性を提供するために、可能な限り、型推論を行います。
型推論とは、TypeScriptが、ソースコードを解析し、そのコードの流れから、変数や関数などの型を推測してくれる仕組みのことです。
次の例ではTypeScriptは`foo`の変数の型が`number(数値)`であると推測します。そのため2行目にエラーが表示されます。なぜなら、`number(数値)`に`string(文字列)`を代入しているからです。

```
let foo = 123;
foo = '456';

// fooはnumber？string？
```

型推論が必要とされることには、大きな理由があります。
上記のコードでは他の部分で`foo`を扱う際、それが`number`か`string`かがわからない。
このような問題は、大規模なプロジェクトでは良く発生する。TypeScriptは型を推論することでこのような不明確なコードに対して、エラーを表示してくれます。

### 明示的な型指定（型アノテーション）👍
TypeScriptは、開発者が明示的にコード上で型を指定（型アノテーション）することが出来る。
これには以下の2つのメリットが存在している。
- コンパイラの理解を助けるだけでなく、より重要なことにあなたが書いたコードを次に読まなくてはならない開発者にとってのドキュメントになる。（それは将来の己かも！）
- コンパイラがどのようにコードを理解するか、ということを強制する。
つまり、コードに対する開発者の正しい理解を、コンパイラの型チェックのアルゴリズムに反映するということ。

TypeScriptでは、末尾型アノテーションが採用されている。
```
let foo: number = 123;
```
型が一致しない場合にはコンパイルエラーを出力
```
let foo: number = '123' //ERROR: stringをnumberに代入できない。
```
### 構造的な型
TypeScriptはJavaScript開発者に対する認知的はな負荷をなるべく小さくするため、構造的な型を採用している。
つまり、ダックタイピングが第一級（言語レベルでサポートされている）のものであるということです。
これを理解するため、次の例を見てみる。
この関数`iTakePoint2D`は、必要なプロパティは（この例では`x`と`y`）を含むオブジェクトであれば、なんでも引数として受け入れる。
```
interface Point2D{
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}

let point2D: point2D = { x: 0, y: 10 }
let point3D: point3D = { x: 0, y: 10, z: 20  }
function iTakePoint2D(point: Point2D){ 何らかの処理 }

iTakePoint2D(point2D); // 全く同じ構造なので問題なし
iTakePoint2D(point3D); // 追加のプロパティがあっても問題なし
iTakePoint2D({ x: 0 }); // エラー: `y` が存在しない
```
### 型チェックでエラーがあってもJavaScriptは出力される
JavaScriptのコードをTypeScriptに移行することを簡単にするために、デフォルトの設定では、コンパイルエラーがあったとしても、TypeScriptは有効なJavaScriptを出力します。例えば、次のコードを見ると、このコードにはエラーがあるが、これをコンパイルすると、、、
```
let foo = 123;
foo = '456'; // ERROR:stringをnumberに代入できない。
```
以下のJavaScriptが出力されます。
```
var foo = 123;
foo = '456';
```
これによって、JavaScriptにコードを少しずつTypeScriptに移行できる。
これは他の言語とは全く異なる動作です。そしてこれはTypeScriptに移行する理由の1つになりうるものです。

### アンビエント宣言（declare）によって、既存のJavaScriptライブラリでも型を利用できる
TypeScriptの設計上の大きなゴールは、既存のJavaScriptライブラリであっても、安全かつ簡単に利用できるようにすることです。
TypeScriptはこれを型宣言（declare）で行う。TypeScriptにおいて、型宣言にどれほどの労力をかけるかどうかは自由である。
より多くの労力を掛ければ、より多くの型安全性と、IDEでのコード補完が得られる。ほとんどすべての有名なJavaScriptライブラリの型定義は、Definitely Typed Communityによって既に作成されている。そのため
- 型宣言ファイル（アンビエント宣言が書かれたファイル）が既に存在します。
- あるいは、最低でも、きちんとレビューされた型宣言のテンプレートがすでに利用なのです。

### モダンなJavaScriptの機能を今すぐに利用可能
TypeScriptは、古いJavaScript（ES5以前）の実行環境でも、ES6以降のバージョンで計画されている多くの機能を使えるようにしている。
TypeScriptチームは積極的に機能を追加しています。
例えば、クラス構文（ES6で追加された機能）もその1つです。
```
class Point {
  constructor(public x: number, public y: number) {

  }
  add(point: Point){
    return new Point(this.x + this.y + point.y);
  }
}

let p1 = new Point(1, 10);
let p2 = new Point(10, 20);
let p3 = p1.add(p2); //{ x: 10, y: 300 }
```
アロー関数もその1つです。
```
let inc = x => x+1;
```

### まとめ
本ファイルでは、TypeScriptを使用する理由と、TypeScriptが目指しているゴールを解説した。以降はTypeScriptが提供している機能や利便性を詳しく見ていく。