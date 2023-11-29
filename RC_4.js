function rc4_encryption(str,key) {

	key = hexToBinary(key);
    
	var s = [], j = 0, x, res = '',res1='';
	for (var i = 0; i < 256; i++) {
		s[i] = i;
	}
	//KSA
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	//PRGA
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		res += (str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]).toString(16).padStart(2, '0').toUpperCase();
        res1 += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
    res = "Hexadecimal representation: " + res ;
	return res;
}

//used for decryption
function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

//to convert the provided key
function hexToBinary(hex) {
    // Convert hexadecimal to decimal
    let decimal = parseInt(hex, 16);

    // Convert decimal to binary
    let binary = decimal.toString(2);
    
    return binary;
}

//to convert the input if provided an ASCII
function StringtoHex(text){
	let hex = '';

	for(let i = 0; i < text.length ; i++){
		hex += text.charCodeAt(i).toString(16);
	}
	return hex;

}

//same as encryption but hex input and ASCII output 
function rc4_decryption(str,key) {

    str = hexToString(str);
	key = hexToBinary(key);

	var s = [], j = 0, x, res = '',res1='';
	for (var i = 0; i < 256; i++) {
		s[i] = i;
	}
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		
        res1 += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
    res = "ASCII representation: " + res1;
	return res;
}

//generating random key function
function generateRandomHex() {
    const characters = '0123456789ABCDEF';
    let result = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}






