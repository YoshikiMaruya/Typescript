## Truthy
JavaScriptは、特定の場所（例えば、`if`条件文とbooleanの`&&` `||`オペレータ）でTrueと評価される値（`truthy`）の概念を持っています。次に示すものは、JavaScriptにおいて`truthy`です。例えば`0`以外の数値は`truthy`です。
```
if (123) { // will be treated like true
  console.log('Any number other than 0 is truthy')
}
```

### Booleanとして扱うことを明示的にする
一般的に`boolean`として扱われる値を、それを本当の`boolean`（`true`|`false`）に明示的に変換することは良いことです。あなたは、`!!`を使って値を本当のbooleanに簡単に変換できます。例えば、`!!foo`です。
最初の！は値をbooleanに変換しますが、その論理値を反転します。2つ目の！は、その値を本来の値にマッチするように再度反転させる。
```
// 値を他のものに移す
const hasName = !!name;

// オブジェクトのメンバとして利用する
const someObj = {
  hasName: !!name
}

// JSX
{!!someName && <div>{someName}</div>}
```
