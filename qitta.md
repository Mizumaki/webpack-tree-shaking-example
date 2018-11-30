# webpackのtreeshakingを基本的なimport/exportで試してみる
今まで大して意識をせずに`import`や`export`を行ってきましたが、TypeScriptについていろいろ調べていたところ、[このようなもの](https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html)を見つけ。。

**`export default` considered harmful**

え、そんな危険なの？と。なんとなく、`import`書くの楽だし使っていたのですが、ビビりました。まぁ読んでみるとそこまで害悪でもなかったのですが、調べていると[アンチパターン](https://qiita.com/genshun9/items/4a00aa6c709b9f024821)について言及があったりなど、何も考えずに使っていると無駄にbundleされたファイルが大きくなってしまうようなので、ここらでTree-Shakingをテストすることにします。

## テスト環境
めっちゃありがたい[先駆者の記事](https://qiita.com/soarflat/items/755bbbcd6eb81bd128c4)がありましたので、その[ソースコード](https://github.com/hira777/webpack-tree-shaking-example)をフォークしました。ありがたや。

今回のソースコードは[こちら](https://github.com/Mizumaki/webpack-tree-shaking-example)になります。

環境は以下のような感じ。
```package.json
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-imports": "^1.5.0",
    "babel-preset-env": "^1.6.1",
    "webpack": "^4.14.0",
    "webpack-cli": "^3.0.2"
  }
```

## テストしたもの
かなりバリエーションに富んだ、import & export & default を試しました。以下の「単体export」は`export func, export func2`のようにexportだけを使ったもの、「単体でimport」は`import { func }`、「全体でimport」は`import * as hoge`で`hoge.func`を実行といった感じです。詳しくは、[ソースコード](https://github.com/Mizumaki/webpack-tree-shaking-example)見てください。

- 「単体export」を「単体でimport」: solo.js
- 「単体export」を「全体でimport」: all.js
- 「単体exportをそのまま全体でexportしたファイル」を「全体でimport」: all2.js
- 「単体exportを全体でimportし、それを単体exportしたファイル」を「単体でimport」: all3.js
- 「export default した object を default as で受けたものを export したファイル」を「単体でimport」: all4.js
- 「object を export default」を「普通にimport」: object.js
- 「object を export default」を「default as で import」: object2.js
- [「アンチパターン検証記事で試されていたもの」](https://qiita.com/genshun9/items/4a00aa6c709b9f024821#export-default-オブジェクト)を「普通にimport」: object3.js

基本的に、各ファイルには「A」と「B」の2つの関数が入っています。index.jsでは、importしたもののうち「A」が付くものだけを実行しています。

```javascript
// all.js
export const allA = () => console.log('allA');

export const allB = () => console.log('allB');

// index.js
import * as all from './all';

all.allA();
```

つまり、上記の例では、`console.log('allA');`のみ見つかれば「Tree Shakingが効いている」、`console.log('allB');`も見つかると「Tree Shakingが効いていない」と判断できます。

## 実行結果
`yarn build`でビルドできます。実行したときの結果は以下の通り。

画像

```dist/bundle.js
// 上の方は省略
  var r = function () {
      return console.log("soloA")
    },
    l = function () {
      return console.log("all3A")
    },
    u = function () {
      return console.log("all3B")
    },
    c = function () {
      return console.log("all4A")
    },
    f = function () {
      return console.log("objectA")
    },
    i = function () {
      return console.log("object2A")
    };
  r(), console.log("allA"), console.log("all2A"), r(), t.all3A(), c(), f(), i(), console.log("foo")
}]);
```

お、all3.js以外はTree Shakingが効いていることがわかりました。

### テストからわかったこと1:オブジェクトでexportしてもTree Shakingは効く
[アンチパターン検証記事](https://qiita.com/genshun9/items/4a00aa6c709b9f024821#export-default-オブジェクト)によれば、`export default object`ではTree Shakingが効かないとありましたが、**webpack4では効くよう**です。

### テストからわかったこと2:全体指定でexportしてもTree Shakingは効く
