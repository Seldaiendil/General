/**
http.get({
	host: 's18.es.ikariam.com',
	port: 80,
	path: '/index.php?view=city&id=89811'
	,headers: {
		'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
		'Accept-Language': 'es,ru;q=0.8',
		'Cache-Control': 'max-age=0',
		'Connection': 'keep-alive',
		'Cookie': 'PHPSESSID=s6qeuepgoclv39svqk2n8f9s64; ikariam_sorting=a%3A2%3A%7Bs%3A6%3A%22sortBy%22%3Bs%3A8%3A%22donation%22%3Bs%3A5%3A%22order%22%3Bs%3A3%3A%22asc%22%3B%7D; ikariam_BranchOffice=a%3A2%3A%7Bs%3A4%3A%22type%22%3Ba%3A1%3A%7Bi%3A89811%3Bi%3A444%3B%7Ds%3A14%3A%22searchResource%22%3Ba%3A1%3A%7Bi%3A89811%3Bs%3A8%3A%22resource%22%3B%7D%7D; fbcsrf_359942453443=239050142ea58ac4729891b133d3bbf3; ikariam=51652_%241%24nZkFRfH8%24m9NrOWdZxsIqP2F2iEZ.Z%2F; ik_friendlist=position%3D0%3Bpath%3D/%3Bpath=/',
		'Host': 's18.es.ikariam.com',
		'Referer': 'http://s18.es.ikariam.com/index.php?action=loginAvatar&function=login',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1'
	}
}, function(res) {
	console.log("Got response: " + res.statusCode);

	res.on('data', function(data) {
		console.log("RECIVED:\n----------------------------------------------------------------------------\n\n" + data)
	});
}).on('error', function(e) {
	console.log("Got error: " + e.message);
})
*/