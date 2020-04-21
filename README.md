# questionsInEJS

# caseOne

hoge.js実行時、リンクをクリックするとコンソール上に

> NOT FOUND PAGE:/favicon.ico

が表示される  
正常に動いているように見えるのに何故エラーになる（ if (routes[url_parts.pathname] == null)が実行される）のか？  
そしてfavicon.icoって何？

# caseTwo

## routes[url_parts.pathname]とは何なのか？どういうデータなのかをconsole.logで表示させたい  

-> 60行目に

console.log(routes[url_parts.pathname]);  

~~を記述してhogeWithPost.jsを実行してもコンソールに何も表示されない。以前は実行時エラーを吐きだした。~~

Github上にアップロード・READMEを書き起こす際に再検証するとコンソールに表示された。  
console.log...を書き加えた後に上書き保存していなかっただけかもしれないし、  
もしかすると、特に以前のケースにおいて、有効でない箇所に記述していたかもしれない。(該当するif文のブロック外とか）  

## url_parts.pathnameとは何なのか？（追記）

  console.log(url_parts.pathname);
  を記述すると、"/"が返ってくる。
  
>  routes[url_parts.pathname]

という記述もある以上、
url_parts.pathnameに関して、
配列routesのurl_parts.pathname番目・・というInt型でなければおかしいと感じる。なぜなのか。


## 改変したソースコード（抜粋）

```JavaScript
  // get
  if (request.method == "GET") {
    var content = ejs.render(template, {
      title: routes[url_parts.pathname].title,
      content: ejs.render(routes[url_parts.pathname].content, {
        message: routes[url_parts.pathname].message,
      }),
    });
    console.log(routes[url_parts.pathname]); // デバッグ行
    console.log("pathname:");
    console.log(url_parts.pathname); // デバッグ行
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
    return;
  }

```
