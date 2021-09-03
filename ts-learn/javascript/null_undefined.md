## nullとundefined
JavaScriptとTypeScriptには`null`と`undefined`という2つのボトム型がある。これらは異なる意味を持っている。

### どちらであるかをチェックする
`==`でチェックする。
```
console.log(undefined == undefined); // true
console.log(null == undefined); // true

// このようなチェックをすれば、falsyな値に関して心配する必要はない。
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```
`== null`を使用し、`undefined`と`null`を両方ともチェックすることが推奨されている。
```
function foo(arg: string | null | undefined) {
  if (arg != null) {
    // != がnullとundefinedを除外しているので、引数argは文字列であることが保証されている。
  }
}
```
1つだけ例外がある。
それが次に説明するルートレベルのundefinedの値である。

### ルートレベルのundefinedのチェック
`== null`を使うべきなのだがそれはルートレベルのものには使用してはいけない。
strictモードで`foo`を使うとき`foo`が定義されていないと、`ReferenceError exception`が発生し、コールスタック全体がアンワインドされる。
変数がグローバルレベルで定義されているかどうか確認するには、通常、`typeof`を使用する。
```
if (typeof someglobal !== 'undefined') {
  // これでsomeglobalは安全に利用できます。
  console.log(someglobal);
}
```
### undefinedの明示的な利用を制限する
TypeScriptでは値と構造を分離してドキュメントのようにわかりやすくできる。下記のようなコードを想像してみる。
```
function foo() {
  //if 何らかの場合に返す値
  return { a: 1, b: 2 };
  //else それ以外の場合に返す値
  return { a: 1, b: undefined };
}
```
これは次のように型アノテーションすべきです。
```
function foo():{ a: number, b?: number } {
  // if 何らかの場合に返す値
  return {a:1,b:2};
  // else それ以外の場合に返す値
  return {a:1};
}
```

### Nodeスタイルのコールバック
独自のAPIを作成する時は、一貫性のために`null`を使用することはよくないですが、問題ありません。
しかし、できればPrimiseを返すようにするべきです。

### JSONとシリアライズ
JSON標準では、`null`のエンコードはサポートしていますが、`undefined`のエンコードはサポートしていません。値が`null`である属性を持つオブジェクトをJSONにエンコードするとき、その属性は`null`値とともにJSONに含まれますが、値が`undefined`である属性は完全に除外されます。
```
JSON.stringify({ willStay: null, willBeGone: undefined });
// {"willStay":null}
```
`null`値を持つ属性はエンコードされるため、オブジェクトをエンコードしてリモートのデータストアに送る前に、ある属性値を`null`にすることで。その属性をクリアしたいという意図を明確に伝えられる。
逆に属性値を`undefined`にすると、その属性はJSONにエンコードされないため、データのストレージと転送のコストを節約することが出来ます。
しかし、これにより値をクリアすることと、値が存在しないことの文脈をあいまいにしてしまいます。


### 結論
TypeScriptチームは、`null`を使わない。
誰もが`undefined`だけを使用すべきと考えている。
