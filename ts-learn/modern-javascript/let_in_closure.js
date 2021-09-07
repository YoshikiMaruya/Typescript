var func = [];
for (var i = 0;i < 3; i++) {
  func.push(function() {
    console.log(i)
  })
}

for ( var j = 0;j < 3; j++) {
  func[j]();
}

// 上のコードと下のコードそれぞれどんな出力になるかな？

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
