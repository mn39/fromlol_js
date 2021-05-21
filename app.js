var urlencode = require('urlencode');
var http = require('http');
var path = require('path');



var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);


// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/index.html'));
});


app.get('/robots.txt', function (req, res) {
    res.type("text/plain");
    res.send(
        "User-agent: *\nAllow: /\n"
    );
});

app.get('/sitemap.xml', function (req, res) {
    res.sendFile(path.join(__dirname + '/sitemap.xml'));
});

app.get('/search', function (req, res) {
    getPlayTime(res, req.query.name)

});

server.listen(process.env.PORT || 8000, function () {
    console.log('Express server listening on port ' + server.address().port);
});


function getPlayTime(res, name) {
    var urlname = urlencode(name)
    var URL = 'https://fow.kr/find/' + urlname

    var request = require('request');

    request(URL, function (error, response, html) { // get played time
        if (error) {
            console.log(error, 'error in request')
        };

        htmlSplit = html.split("'tipsy_live' tipsy='")
        var result = NaN
        if (htmlSplit.length > 2) {
            result = htmlSplit[2].slice(0, 10) + ":" + htmlSplit[2].slice(11, 19)
        }
        res.render(path.join(__dirname + '/search.html'), {
            sum_name: name,
            result: result
        });
    });

}