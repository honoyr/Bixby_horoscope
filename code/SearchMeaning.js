var http = require('http')
var console = require('console')
var config = require('config')

module.exports.function = function searchMeaning (word) {
  
  var searchWordResponse = searchWord(word);
  if (searchWordResponse.length == 0)
    return [];
  var meaningId = searchWordResponse[0].meanings[0].id;
  var db_name = "bixby_jdv";
  var ContactId = 121212;
  var myAPIKEY = 'fa8e615af3mshe43bc1e20b3e43fp1a0bd1jsn5e67a3865edd';

  var params = {
    'id_word': meaningId
  };
  var options = { 
    format: 'json',
    passAsJson: true,
  };
  
  // curl -X POST --include 'https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aries&day=today' \
  // -H 'X-RapidAPI-Host: sameer-kumar-aztro-v1.p.rapidapi.com' \
  // -H 'X-RapidAPI-Key: fa8e615af3mshe43bc1e20b3e43fp1a0bd1jsn5e67a3865edd' \
  // -H 'Content-Type: application/x-www-form-urlencoded'
    var postWord = http.postUrl(config.get('remote.url')" + db_name + "/collections/" + ContactId + '?apiKey=' + myAPIKEY, params, options);
  console.log(postWord)
  
  // If id is "1111", then this makes a GET call to /meanings?ids=1111
  options = { 
    format: 'json',
    query: {
      ids: meaningId
    }
  };
  var response = http.getUrl(config.get('remote.url') + '/meanings', options);
  return response;
}

function searchWord (word) {
  console.log("SearchWord in a dictionary")
  var options = { 
    format: 'json',
     query: {
      search: word
    }
  };
  // If word is "apple", then this makes a GET call to /search?search=apple
  var response = http.getUrl(config.get('remote.url') + '/words/search', options);
  return response;
}
