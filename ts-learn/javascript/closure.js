const { getConstantValue } = require("typescript");

// Practice closure!!
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

function createCounter() {
  let val = 0;
  return {
    increment() { val++ },
    getVal() { return val }
  }
}

let counter = createCounter();
for (let i = 0; i < 5; i++){
  counter.increment();
  console.log(counter.getVal());
}
