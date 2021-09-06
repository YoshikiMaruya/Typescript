## 残余引数（Rest Parameters）
可変長引数（引数の最後に`...argmentName`と書く）を受け取る場合、以下のように関数に渡された複数の引数をすぐに配列として取得できます。
```
function iTakeItAll(first, second, ...allOthers) {
  console.log(allOthers);
}

iTakeItAll("foo", "bar"); // []
iTakeItAll("foo", "bar", "bas", "qux"); // ["bas", "qux"]
```
つまり関数の最後の引数に`...`の接頭辞を付けると、（ユーザーが提供した）その位置にある残りの引数をJavaScriptの「標準」配列の中に入れることが出来るということ。

可変長引数は`function/()=>/class menber`の関数で使用可能。
なお、可変長引数でなくてもRestパラメータを利用できることに注意。
