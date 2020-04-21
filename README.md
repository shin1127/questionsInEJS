# questionsInEJS

# caseOne

hoge.js実行時、リンクをクリックするとコンソール上に

> NOT FOUND PAGE:/favicon.ico

が表示される  
正常に動いているように見えるのに何故エラーになる（ if (routes[url_parts.pathname] == null)が実行される）のか？  
そしてfavicon.icoって何？

# caseTwo

hoge.pathnameとは何なのか？どういうデータなのかをconsole.logで表示させたい  

-> 60行目に

console.log(routes[url_parts.pathname]);  

~~を記述してhogeWithPost.jsを実行してもコンソールに何も表示されない。以前は実行時エラーを吐きだした。~~

Github上にアップロード・READMEを書き起こす際に再検証するとコンソールに表示された。  
console.log...を書き加えた後に上書き保存していなかっただけかもしれないし、  
もしかすると、特に以前のケースにおいて、有効でない箇所に記述していたかもしれない。(該当するif文のブロック外とか）  

