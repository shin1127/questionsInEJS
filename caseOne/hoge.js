var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var url = require("url"); // URLを扱う為のurlオブジェクトをロードする

var template = fs.readFileSync("./template.ejs", "utf8");
var content1 = fs.readFileSync("./content1.ejs", "utf8");
var content2 = fs.readFileSync("./content2.ejs", "utf8");

// ルーティング情報の連想配列の用意

var routes = {
  // それぞれのページのデータをまとめる変数
  "/": {
    title: "Main Page",
    message: "これはサンプルのページですよ。",
    content: content1,
  },

  "/index": {
    title: "Main Page",
    message: "これはサンプルのページですよ。",
    content: content1,
  },
  "/other": {
    title: "Other Page",
    message: "別のページを表示していますよ。",
    content: content2,
  },
};

// サーバーの作成と実行

var server = http.createServer();
server.on("request", doRequest);
server.listen(1234);
console.log("Server running");

// リクエストの処理
function doRequest(request, response) {
  var url_parts = url.parse(request.url); // リクエストからアクセスしてきたURLをパース処理する parse:解析する
  // リクエストされたURLはrequestオブジェクトのurlプロパティで取得
  // ルートエラーのチェック
  if (routes[url_parts.pathname] == null) {
    console.log("NOT FOUND PAGE:" + request.url);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      "<html><body><h1>NOT FOUND PAGE:" + request.url + "</h1></body></html>"
    );  // 正常に動作しているようなのに、URLを踏むたびNOT FOUND PAGE:/favicon.icoがコンソールに出力される
    return; // なんで戻り値に変数指定されてないの？<-そもそも関数じゃないけどね
  }
  // ページのレンダリング
  var content = ejs.render(template, {
    title: routes[url_parts.pathname].title,
    content: ejs.render(routes[url_parts.pathname].content, {
      message: routes[url_parts.pathname].message,
    }),
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
