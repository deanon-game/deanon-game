function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
  return arr.join('');
}

var randomID = function (name) {
  return shuffle(name.split('')) + Date.now()  
}

module.exports = randomID;