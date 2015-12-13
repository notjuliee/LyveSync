var http = require('http');

var curMetas = ['COOKIES COOKIES COOKIES COOKIES COOKIES COOKIES COOKIES'];
var curShows = ['http://www.gifwave.com/media/728668_cookie-monster-dancing-sesame-street.gif'];
var ssids = ['1l0v3c00k135'];

var curSSID = 'N/A';
var curMeta = 'Please wait for your host to select a photo!';
var curShow = 'http://placehold.it/350x150?text=No+image+selected';
global.curIF = 'N/A';
var tmpssid = '';
var tmpvid = '';

http.createServer(function (req, res) {
    if (req.url=='/index.html' || req.url=='/' || req.url.substring(0,10)=='/vie?ssid=' && ssids.indexOf(req.url.substring(10,req.url.lenght))==-1) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<html><meta http-equiv="refresh" content="5"><title>ERROR</title><body style="background:black;"><center><h1 style="color:red;">ERROR!<br/>INVALID SESSION ID!<br/>Double check your session id. If this problem persists, please contact your session host.</h1></center><a href="http://www.mylyve.com"><img height=62 width=119 src="http://www.digitalfishfun.com/files/LyveLogo.jpeg" style="position:fixed; bottom:42; right:0;"></img></a><a href="http://www.mylyve.com/downloads/android"><img height=42 width=119 src="http://www.digitalfishfun.com/files/Gplay.png" style="position:fixed; bottom:0; right:0;"></img></a></body></html>');
    }
    else if (req.url.substring(0,10)=='/vie?ssid=') {
	tmpvid = req.url.substring(10,req.url.lenght);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<html><meta http-equiv="refresh" content="5"><title>Lyve API image viewer</title><body style="background:black;"><center><img src="'+curShows[ssids.indexOf(tmpvid)]+'"></img><h3 style="color:white;">'+curMetas[ssids.indexOf(tmpvid)]+'</h3></center><a href="http://www.mylyve.com"><img height=62 width=119 src="http://www.digitalfishfun.com/files/LyveLogo.jpeg" style="position:fixed; bottom:42; right:0;"></img></a><a href="http://www.mylyve.com/downloads/android"><img height=42 width=119 src="http://www.digitalfishfun.com/files/Gplay.png" style="position:fixed; bottom:0; right:0;"></img></a></body></html>');
    }
    else if (req.url.substring(0,11)=='/push?type=') {
	global.curIF = req.url.substring(req.url.indexOf('?type=')+6,req.url.indexOf('&url='));
	tmpssid = req.url.substring(req.url.indexOf('&mid=')+5,req.url.lenght);
	if (ssids.indexOf(tmpssid)==-1) {
	    ssids.push(tmpssid);
	    curShows.push(curShow);
	    curMetas.push(curMeta);
	}
	curShows[ssids.indexOf(tmpssid)] = req.url.substring(req.url.indexOf('&url=')+5,req.url.indexOf('&dia='));
	curMetas[ssids.indexOf(tmpssid)] = req.url.substring(req.url.indexOf('&dia=')+5,req.url.indexOf('&mid='));
	curMetas[ssids.indexOf(tmpssid)] = curMetas[ssids.indexOf(tmpssid)].replace(/%20/g,' ');
	curMetas[ssids.indexOf(tmpssid)] = curMetas[ssids.indexOf(tmpssid)].replace(/%27/g,"'");
	res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<html><title>Push Successful</title><body style="background:black;"><center><img src="'+curShows[ssids.indexOf(tmpssid)]+'"></img><br/><h1 style="color:white;">SUCCESS!</h1><p style="color:white;">Type='+global.curIF+'<br/>SSID='+tmpssid+'<br/>Caption='+curMetas[ssids.indexOf(tmpssid)]+'<br/><button onclick="javascript:window.history.back();">Back</button></p></center><a href="http://www.mylyve.com"><img height=62 width=119 src="http://www.digitalfishfun.com/files/LyveLogo.jpeg" style="position:fixed; bottom:42; right:0;"></img></a><a href="http://www.mylyve.com/downloads/android"><img height=42 width=119 src="http://www.digitalfishfun.com/files/Gplay.png" style="position:fixed; bottom:0; right:0;"></img></a></body></html>');
    }
    else if (req.url.substring(0,11)=='/mail?ssid=') {
	var mailSsid = req.url.substring(11,req.url.indexOf('&addr='));
	if (ssids.indexOf(mailSsid)==-1) {
	    ssids.push(mailSsid);
	    curShows.push("http://www.placehold.it/350x150?text=Please+Wait");
	    curMetas.push("Please wait for your host to select an image!");
	}
	var addr = req.url.substring(req.url.indexOf('&addr=')+6,req.url.lenght);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<script>document.location.href="mailto:'+addr+'?subject=Lyve%20viewe\
r%20session%20invite&body=The%20link%20to%20your%20session%20is:%0D%0Ahttp://ww\
w.digitalfishfun.com:8080/vie?ssid='+mailSsid+'";</script><h1>Success!</h1><button onclick="javascript:window.history.back();">Back</button>');
    }
    else {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Error 400: Bad request');
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
