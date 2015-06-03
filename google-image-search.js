var express = require("express");
var app = express();
var http = require('http');
var https = require('https');
var server = http.Server(app);
var fs = require("fs");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var path = require('path');

// https://www.google.co.il/search?tbs=sbi:AMhZZiub5WMYPKUTw9LecY5nw4d0GiP0QfFTVQYH1dxEo8fpTqYtQAgYV1ZdIaAfaGTlT5pClm80ndbhSW9V0EFijG-lbU9NIicksQ0g6K4wFcW7XfiIFmxHTuZ4lpLC6aTgZzwz6Xxr6Fzc5II5vxiQVoS8LINJrgzaUikGhhfHZpEV5d9DqczXovluNpT33LZK5UNdPw80wx1UsQD7mslIYs187C_1OqRBmw7-W9BUX44o4ZdbZmFM6h7NZsqAXSrGgtOaDE6EwmLWB_1UzRtT75ro0rALOAp3SppRfHU7Coc3tKfacYYeowEkcIniUE20jfTsjMT5v-ZtwB-dvT6CycQubKagzJZhLgnHLLfvtO2wVpmNr51jc8qzH9egvxNFZl0WZ1R0_1TAb8sFQmrObkYN7DI9enr4cZ6GKz8xkrtF7Dz0LioUPRC5sZRlNG3GHcJkFwtzuaKeFz2x8X1_11PCX6BiSCrULo-ih2eYia2RcOvR7lkvk-sfU5KpBaNRmcmO1N2vFRDNpxacsq0kajihtTl4LFMJ-0HaklSSvF4iVfeKOP-lBydVyUyZQVzjuo8HMksUIfMDbmGeRVOGm50s3114zuVZyuvbowLxc8xAKgMkd-YWNQilnhq_1yNyih3R7HFyPyRC9BqQyHv3imuFOeMcO1QIvFYjWI8XbC-fzRjU2K8rE93IO5JLnjJ6wZN4eHOQNHLuJEHRKjE-Nd1h5DmiZOecfsFZPdyY3NOjTszsA7NhDmf30Bxoh2LsDRpx2A2xz-XbyGyFSDita_1o2vghFL_1XfnVebvnE809b2Ii1A0q4xKLiTVJNaRj9hAg8b1CrbBitDy1Jhs9SwOsW6UpGvQdfvbeIAK8zwqr6QLOmVsubNW0dmyhZq3Ac6ew_1Xg57-5-bwjsKAbVYppYvcXu7cYRjDO4Z0c5EOFPe2SRWkImPOMXbkmeuXz7eFqJ0uUk2hbJyC9yMKoHx6za8g-I8kqDTvHJasBPg7Jsbc7fbpq3FLix8bdwtMRgTmOWZQGCd5vGBYJWMwh82I713Nv8PTwWyn7mbTsq7UYpY3cpjKMeJ4ECTg1uMYedqlsbVow-39Aeb8uUgwpHdyomAMsVySG8SeFKOQpZpM5dwoSpp_1miZ3eRs7iMZSdobvBgTWwRfZIwydeUNz0OnSKpeQRvGWPBHw1DD5uWbkbTi5w6epFA2AfJ5vYPKt-m6lGv-sMRP7B3IabxAdcZeAx_1uZPzYem2EzJg9jphrlsrIaBiYT_1dgMnSu1n7bhiZLruaTe55mJxQtvOxBwtJ0x6XOgu5Aly2a5BQdL3g9AdcIrKN3pmE1MeeT4vQe-_18ARR46ecZCczRJ2lCdi1CluoZYYoyVZjlHpw6tPpI4RZ43C97WVH4s_1-cUv-cu1L-PPOYaHV40evfGKKJgQ-ZI-juRaF0AT8t5ctWJ0mn9Jd-XVggPmTaG4VEzUBlJHst4lDWZy-NJ2ePR2MsF8Lr6Ee1JK4TAqc14V5WjQMzXSPd8I57GGWEQVIZ50hacFBbmHRmvLYCXu2t1rKsenWCkw7v3cqggDLqzOY7HSoixPk9xXd0RHxEpvU1uQaSfTOh01MxSIr-mjQOT0_1&site=search&sa=X&gws_rd=cr,ssl&ei=sAlqVcesC8OiyAPWz4HQAw
//   https://www.google.com/searchbyimage?site=search&sa=X&image_url=http://albums.tapuz.co.il/mfhp-webbuilder/a/4/1/a/2068604024.jpg

var arrString = [];
var imageURL = 'http://www.av.co.il/_Uploads/dbsArticles/Clip(296).jpg';

app.get('/', function(req, res){

  firstReq(imageURL, function (data){
    second(data, function (data1){
      res.end(data1);
    })
  });

});

app.get('/pic', function(req, res){
  
  var imgURL = req.query.img
  var q = req.query.q;
  

  firstReq(imgURL,q, function (data){
    second(data, function (data1){
      res.end(data1);
    })
  });

});




app.use(bodyParser.urlencoded({ extended: false }));






//console.log('https://'+options.hostname+fullPath);

//firstReq(options, second(null));


function second(url, cb)
{
  urlPath = url.substring(('https://www.google.co.il').length);
  //console.log(urlPath);


  var options = {
   hostname: 'www.google.co.il'
   ,port: 443
  // ,path: '/search?tbs=sbi:AMhZZivelqOX9-7G3Y-6ROMPMCFmO90Hkvq6J1Wjx-J7PDs2LKTx40UWwGeC-5bj4BsHXj7fgEVweiFxt5t7Jf7SeW1WTjbyxwAe8liZItlvPYqKuD2oe6mja2jscXIg5igYfgseiscMn-NEAuh2wDPDVfX49GiF3e58VsioBrfwfRn4xbqJTd7YUpbj5npDAWahwCGRzSpctzeIPXfb_1ttB92a2lpYmxmi_1OktictEOR2y5ruOGB1x0B77CeyO5mzSm8yGToe_1r6dLMcaGvVZj2LK_14lzK9SFi6cqN5a6025f8VxlKXvMaPNTokiErg7zaCoRixqpHvjFcpm3ylj6veRm-A4wn0SsFBYls-X2XI1A15bZipCT17rUM4GuxPeC5OzAOF0cEHpjh1LUZQ5czepr2UhKZYgje2JoCjZLIMy_1Zg1o9gqrsPrp2OY6CnR5mwGPA5dQc9Mytmw6sC-l_1U3JjHATvRTsFNbI1XYsS_1sVxGCiO_1SLqBOH9RaNtqtzai5K4iToEhEKMQ2HMcMsWt-xsWy5hT0CTIe_1hcg-MTtBRAQ_1-db5wNuE3rt6Y0qc-s9XF47ByeKk_1aREqqAUmebvwTEz5eZm3Eur5ZBE89nXJrjM1-G1DgAtODVWdGkDLt8juovV8E54f8pRiLscOP38skYmTIzViI5LUjSQGTmyAHvYJDSLHMU7o6pppzy3RandnV_1GCNV1TRCthiwafdObKVlqAguPuC19xYv-rOoIXCFlWGO0jHnD1haShlKKj53T0xpLxDFmyfCTKSmSpwji4f0r47mDDKvLqqtIqeEeI03l9piObkyG9M85e8P6XqqRvYX3_1QZxs_1HSVDPdNgMnBHO6wppgogmViqgzjZTDMmaKpjewN8w8qAHI-4hKpmxGo2MplDBV-NaLXsvmQZzRrB4m_1-6ledNVcdhSAE_1VTeRka2lp3nQUaOjcg3ImJMfvA650YPtt00o1l41GukhirZt23-MkRAHtBiTW2sQkG_1oASsvRNkYSdd7YkUECywzFeiyBkEQ7Xa0tRHbx4VIhXd_1iW_1lAF0MV5DIobi7U_1Oazg7QRx233cvdXR3XFrkVCJz0tkg5Ru6P6TueOQ0RSq7063zWONDNbA0542XvwAH1xxlPYZxp0KxIEtADRNNt5DO9qLfMbwAsNPLQcnc0V-Rc0LGj4cqRq_1a5beFRPzeP0yvXVobgf4kKM9QtNPtqKISsUz7JGwGwshv1_1KbXOGOZ_1r5tpIRFDJSCuR2iUAmqdJu42XtPs2RxN0i_1nU4Qyo46nhzvw_1-y4Tf8ZP0fmRfaqB8NqIKRngSCDOOQdR4lX0kTH2LR2FE_132-OtmKkZYmLTl309-6t51L12ItI4Jg8LUtUiCidrUxgH8-scqUfj7koE_1udrn-B7h4_1q9hnWfB2Fko4uQo-fsaurR_1GZA5xouSzPwX14kPkRw1TocfmCYR-7qK6LL8pyFhhjzXPle-Y9gA5ksxVF8qGQifUA7e9sVwhHuqkrr1duE_1FymG8Y3qEieSr9Cisw38-ECi_1n1fKWxDnwQq32uXsGhD7shoBKmNLIgFJmDbVeQd0XqptCuFIIjeJmsmkFnXBGPdPZ0Zt1Nnh881rYxprk-dFEQZGHjrkPTnVzGwWWhp1CPNkJbuScR2AtyDbz4wXr2tZELpvyGuVPpCbYBvGvkv0P0HgtuIRDPU4-PMHIuKNxjbaIO6zxgx7jiwPTdmUPyV_1j0-LsmR2IsJShcsowxvURitlZ_1VkVWGJXen-DWaQvCKuFJwvMc'
   //,path: fullPath
   ,path: urlPath
   ,method: 'GET'
   ,headers:
   {
     'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36'
   }
 };

 var req = https.request(options, function(res) {

  var resultsUrls = [];
  var googleUrls = [];
  var $;
  var myHTML ='';


  res.on('data', function(d) {
    myHTML += d;
  });

  res.on('end', function() {

    fs.appendFile("lasttry22.html", myHTML, function (err) {
      if (err) return console.log(err);
    });


    $ = cheerio.load(myHTML);

   // Fill result links
   $("#nav > tr > td > a[href]").each(function() {
    var link = $(this);
    var href = link.attr("href");
    googleUrls.push(href);
  });

  // Fill google more page links
  $("li > div > h3 > a[href]").each(function() {
    var link = $(this);
    var href = link.attr("href");
    resultsUrls.push(href);
  });


  console.log('############## PARSER ##############');

/*
  fs.appendFile("google_urls.json", JSON.stringify(googleUrls), function (err) {
    if (err) return console.log(err);

  });
  fs.appendFile("result_urls.json", JSON.stringify(resultsUrls), function (err) {
    if (err) return console.log(err);

  });*/

  console.log(resultsUrls);


  return cb(JSON.stringify(resultsUrls));
});


});

req.end();

req.on('error', function(e) {
  console.error(e);
});
}


function firstReq(imageURL, imageText, cb)
{
  var suffix ='';
  if (imageText)
    suffix = '&q=' + imageText;


var fullPath = '/searchbyimage?site=search&sa=X&image_url=' + imageURL + suffix;

  var options = {
   hostname: 'www.google.co.il'
   ,port: 443
   //,path: '/search?tbs=sbi:AMhZZivelqOX9-7G3Y-6ROMPMCFmO90Hkvq6J1Wjx-J7PDs2LKTx40UWwGeC-5bj4BsHXj7fgEVweiFxt5t7Jf7SeW1WTjbyxwAe8liZItlvPYqKuD2oe6mja2jscXIg5igYfgseiscMn-NEAuh2wDPDVfX49GiF3e58VsioBrfwfRn4xbqJTd7YUpbj5npDAWahwCGRzSpctzeIPXfb_1ttB92a2lpYmxmi_1OktictEOR2y5ruOGB1x0B77CeyO5mzSm8yGToe_1r6dLMcaGvVZj2LK_14lzK9SFi6cqN5a6025f8VxlKXvMaPNTokiErg7zaCoRixqpHvjFcpm3ylj6veRm-A4wn0SsFBYls-X2XI1A15bZipCT17rUM4GuxPeC5OzAOF0cEHpjh1LUZQ5czepr2UhKZYgje2JoCjZLIMy_1Zg1o9gqrsPrp2OY6CnR5mwGPA5dQc9Mytmw6sC-l_1U3JjHATvRTsFNbI1XYsS_1sVxGCiO_1SLqBOH9RaNtqtzai5K4iToEhEKMQ2HMcMsWt-xsWy5hT0CTIe_1hcg-MTtBRAQ_1-db5wNuE3rt6Y0qc-s9XF47ByeKk_1aREqqAUmebvwTEz5eZm3Eur5ZBE89nXJrjM1-G1DgAtODVWdGkDLt8juovV8E54f8pRiLscOP38skYmTIzViI5LUjSQGTmyAHvYJDSLHMU7o6pppzy3RandnV_1GCNV1TRCthiwafdObKVlqAguPuC19xYv-rOoIXCFlWGO0jHnD1haShlKKj53T0xpLxDFmyfCTKSmSpwji4f0r47mDDKvLqqtIqeEeI03l9piObkyG9M85e8P6XqqRvYX3_1QZxs_1HSVDPdNgMnBHO6wppgogmViqgzjZTDMmaKpjewN8w8qAHI-4hKpmxGo2MplDBV-NaLXsvmQZzRrB4m_1-6ledNVcdhSAE_1VTeRka2lp3nQUaOjcg3ImJMfvA650YPtt00o1l41GukhirZt23-MkRAHtBiTW2sQkG_1oASsvRNkYSdd7YkUECywzFeiyBkEQ7Xa0tRHbx4VIhXd_1iW_1lAF0MV5DIobi7U_1Oazg7QRx233cvdXR3XFrkVCJz0tkg5Ru6P6TueOQ0RSq7063zWONDNbA0542XvwAH1xxlPYZxp0KxIEtADRNNt5DO9qLfMbwAsNPLQcnc0V-Rc0LGj4cqRq_1a5beFRPzeP0yvXVobgf4kKM9QtNPtqKISsUz7JGwGwshv1_1KbXOGOZ_1r5tpIRFDJSCuR2iUAmqdJu42XtPs2RxN0i_1nU4Qyo46nhzvw_1-y4Tf8ZP0fmRfaqB8NqIKRngSCDOOQdR4lX0kTH2LR2FE_132-OtmKkZYmLTl309-6t51L12ItI4Jg8LUtUiCidrUxgH8-scqUfj7koE_1udrn-B7h4_1q9hnWfB2Fko4uQo-fsaurR_1GZA5xouSzPwX14kPkRw1TocfmCYR-7qK6LL8pyFhhjzXPle-Y9gA5ksxVF8qGQifUA7e9sVwhHuqkrr1duE_1FymG8Y3qEieSr9Cisw38-ECi_1n1fKWxDnwQq32uXsGhD7shoBKmNLIgFJmDbVeQd0XqptCuFIIjeJmsmkFnXBGPdPZ0Zt1Nnh881rYxprk-dFEQZGHjrkPTnVzGwWWhp1CPNkJbuScR2AtyDbz4wXr2tZELpvyGuVPpCbYBvGvkv0P0HgtuIRDPU4-PMHIuKNxjbaIO6zxgx7jiwPTdmUPyV_1j0-LsmR2IsJShcsowxvURitlZ_1VkVWGJXen-DWaQvCKuFJwvMc'
   ,path: fullPath
   ,method: 'GET'
   ,headers:
   {
     'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36'
   }
  };

  var koko = '';
  var googleURL = '';
  var req2 = https.request(options, function(res) {

    res.on('data', function(d) {
      koko += d;
    });

    res.on('end', function() {
      //console.log("endd !!");

      googleURL = res.headers.location;
      //console.log("res.headers.location: ", googleURL);
      return cb(googleURL);
    });

  });
  req2.end();

  req2.on('error', function(e) {
    console.error(e);
  });
}


server.listen(3000,function(){
  console.log("Started on PORT 3000");
});