var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    urlArray = require('./imageArray.js');

function respond() {
    //get message
    var request = JSON.parse(this.req.chunks[0]);
    //initialize regex array
    var regexArray = new Array(
    /4Head/i,
    /BabyRage/i,
    /DansGame/i,
    /EleGiggle/i,
    /FailFish/i,
    /Kappa/i,
    /KappaClaus/i,
    /KappaPride/i,
    /KappaRoss/i,
    /Keepo/i,
    /KreyGasm/i,
    /MrDestructiod/i,
    /NotLikeThis/i,
    /PogChamp/i,
    /ResidentSleeper/i,
    /WutFace/i);

    //every time a regex is true, pass the true onto the boolean array
    for (var i = 0; i < regexArray.length; i++) {
        if(request.text && regexArray[i].test(request.text)) {
            console.log(regexArray[i] + i);
            this.res.writeHead(200);
            // wait at least 500ms before posting to avoid overpost error
            setTimeout(function() {
                console.log(i);
                postMessage(i);
                console.log('posted!');
            }, 500);
            this.res.end();
        }
    }  
}

function postMessage(num) {
    var url, options, body, botReq;

    url = urlArray[num];
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": url
    };

    console.log(num + " being called");
    console.log('sending ' + url + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

exports.respond = respond;