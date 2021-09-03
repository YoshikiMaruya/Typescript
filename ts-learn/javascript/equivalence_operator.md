## 等価演算子の同一性
### 等価演算子（Equality）
JavaScriptで注意すべき点の1つは`==`と`===`の違いである。
JavaScriptはエラーが起きにくい仕様であるため、`==`は、2つの型変換を行います。
例えば、下記の場合、文字列は数値に変換されます。
```
console.log(5 == "5"); //True , TS Error
console.log(5 === "5"); //false , TS Error
```
しかしJavaScriptの選択は必ずしも理想的ではありません。下の例の最初の行は`""`と `"0"`は両方とも文字列であり、明らかに等しくないため、`false`です。しかし、第2のケースでは、`0`と空文字列(`""`)はfalsy(`false`のように振る舞う)であるため、`==`を使った比較では`true`になります。両方とも`===`を使うと`false`になります。
```
console.log("" == "0") // false
console.log(0 == "") // true

console.log("" === "0") // false
console.log(0 === "") // false
```
> TypeScriptの場合、`string == number`と`string === number`はどちらもコンパイルエラーである。

`==`と`===`と同様に、`!=`と`!==`でも同じです。

そのため後で説明するnullチェック以外は常に`===`と`!==`を使うことを推奨している。
