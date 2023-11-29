function a5_1Encrypt(plain,key){

    key = hexToBinary(key);
    
    let reg_x = [];
    let reg_y = [];
    let reg_z = [];

    if (key.length === 64 && /^[01]+$/.test(key)) {
        key_one = key;
        let reg_x_length = 19;
        let reg_y_length = 22;
        let reg_z_length = 23;

        let i = 0;
        while (i < reg_x_length) {
            reg_x.push(parseInt(key[i])); //takes first 19 elements from key
            i = i + 1;
        }
        let j = 0;
        let p = reg_x_length;
        while (j < reg_y_length) {
            reg_y.push(parseInt(key[p])); //takes next 22 elements from key
            p = p + 1;
            j = j + 1;
        }
        let k = reg_y_length + reg_x_length;
        let r = 0;
        while (r < reg_z_length) {
            reg_z.push(parseInt(key[k])); //takes next 23 elements from key
            k = k + 1;
            r = r + 1;
        }
            
    }

    let b = "";
    for (let i = 0; i < plain.length; i++) {
        let binary = plain.charCodeAt(i).toString(2);
        while (binary.length < 8) {
            binary = "0" + binary;
        }
        b = b + binary;
    }
    let binary_values = [];
    for (let k = 0; k < b.length; k++) {
        binary_values.push(parseInt(b[k]));
    }

    let reg_x_temp = [...reg_x];
    let reg_y_temp = [...reg_y];
    let reg_z_temp = [...reg_z];
    let keystream = [];
    let i = 0;
    while (i < binary_values.length) {
        let majority =1;
        if(reg_x_temp[8] +  reg_y_temp[10] + reg_z_temp[10] > 1 ){
            majority = 1;
        }
        else{
            majority = 0;
        }
        
        if (reg_x_temp[8] === majority) {
            let new_val = reg_x_temp[13] ^ reg_x_temp[16] ^ reg_x_temp[17] ^ reg_x_temp[18];
            let reg_x_temp_two = [...reg_x_temp];
            for (let j = 1; j < reg_x_temp.length; j++) {
                reg_x_temp[j] = reg_x_temp_two[j - 1];
            }
            reg_x_temp[0] = new_val;
        }

        if (reg_y_temp[10] === majority) {
            let new_val_one = reg_y_temp[20] ^ reg_y_temp[21];
            let reg_y_temp_two = [...reg_y_temp];
            for (let k = 1; k < reg_y_temp.length; k++) {
                reg_y_temp[k] = reg_y_temp_two[k - 1];
            }
            reg_y_temp[0] = new_val_one;
        }

        if (reg_z_temp[10] === majority) {
            let new_val_two = reg_z_temp[7] ^ reg_z_temp[20] ^ reg_z_temp[21] ^ reg_z_temp[22];
            let reg_z_temp_two = [...reg_z_temp];
            for (let m = 1; m < reg_z_temp.length; m++) {
                reg_z_temp[m] = reg_z_temp_two[m - 1];
            }
            reg_z_temp[0] = new_val_two;
        }

        keystream.push(reg_x_temp[18] ^ reg_y_temp[21] ^ reg_z_temp[22]);
        i = i + 1;
    }
    
    let s = "";
    for (let i = 0; i < binary_values.length; i++) {
        s = s + String(binary_values[i] ^ keystream[i]);
    }
    
    //return result in hex
    let hexResult = '';
    let paddedBinary = s.padStart(Math.ceil(s.length / 4) * 4, '0'); 

    for (let i = 0; i < paddedBinary.length; i += 4) {
        const nibble = paddedBinary.substring(i, i + 4); 

        const hexValue = parseInt(nibble, 2).toString(16).toUpperCase(); 

        hexResult += hexValue; 
    }
    let result = "Hexadecimal Representation: " + hexResult ;
    return result;
}

//used in decryption
function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

//used for the key
function hexToBinary(hex) {
    // Convert hexadecimal to decimal
    let decimal = parseInt(hex, 16);

    // Convert decimal to binary
    let binary = decimal.toString(2);
    
    return binary;
}



//same as encryption but hex input and ASCII output
function a5_1Decrypt(plain,key){
    
    plain = hexToString(plain);
    key = hexToBinary(key);
    

    let reg_x = [];
    let reg_y = [];
    let reg_z = [];

    if (key.length === 64 && /^[01]+$/.test(key)) {
        key_one = key;
        let reg_x_length = 19;
        let reg_y_length = 22;
        let reg_z_length = 23;

        let i = 0;
        while (i < reg_x_length) {
            reg_x.push(parseInt(key[i])); //takes first 19 elements from key
            i = i + 1;
        }
        let j = 0;
        let p = reg_x_length;
        while (j < reg_y_length) {
            reg_y.push(parseInt(key[p])); //takes next 22 elements from key
            p = p + 1;
            j = j + 1;
        }
        let k = reg_y_length + reg_x_length;
        let r = 0;
        while (r < reg_z_length) {
            reg_z.push(parseInt(key[k])); //takes next 23 elements from key
            k = k + 1;
            r = r + 1;
        }
            
    }

    let b = "";
    for (let i = 0; i < plain.length; i++) {
        let binary = plain.charCodeAt(i).toString(2);
        while (binary.length < 8) {
            binary = "0" + binary;
        }
        b = b + binary;
    }
    let binary_values = [];
    for (let k = 0; k < b.length; k++) {
        binary_values.push(parseInt(b[k]));
    }

    let reg_x_temp = [...reg_x];
    let reg_y_temp = [...reg_y];
    let reg_z_temp = [...reg_z];
    let keystream = [];
    let i = 0;
    while (i < binary_values.length) {
        let majority =1;
        if(reg_x_temp[8] +  reg_y_temp[10] + reg_z_temp[10] > 1 ){
            majority = 1;
        }
        else{
            majority = 0;
        }
        
        if (reg_x_temp[8] === majority) {
            let new_val = reg_x_temp[13] ^ reg_x_temp[16] ^ reg_x_temp[17] ^ reg_x_temp[18];
            let reg_x_temp_two = [...reg_x_temp];
            for (let j = 1; j < reg_x_temp.length; j++) {
                reg_x_temp[j] = reg_x_temp_two[j - 1];
            }
            reg_x_temp[0] = new_val;
        }

        if (reg_y_temp[10] === majority) {
            let new_val_one = reg_y_temp[20] ^ reg_y_temp[21];
            let reg_y_temp_two = [...reg_y_temp];
            for (let k = 1; k < reg_y_temp.length; k++) {
                reg_y_temp[k] = reg_y_temp_two[k - 1];
            }
            reg_y_temp[0] = new_val_one;
        }

        if (reg_z_temp[10] === majority) {
            let new_val_two = reg_z_temp[7] ^ reg_z_temp[20] ^ reg_z_temp[21] ^ reg_z_temp[22];
            let reg_z_temp_two = [...reg_z_temp];
            for (let m = 1; m < reg_z_temp.length; m++) {
                reg_z_temp[m] = reg_z_temp_two[m - 1];
            }
            reg_z_temp[0] = new_val_two;
        }

        keystream.push(reg_x_temp[18] ^ reg_y_temp[21] ^ reg_z_temp[22]);
        i = i + 1;
    }
    
    let s = "";
    for (let i = 0; i < binary_values.length; i++) {
        s = s + String(binary_values[i] ^ keystream[i]);
    }

    return "ASCII representation: " + binaryToString(s);
    
    
}
//used in the encryption
function binaryToString(binary) {
    let str = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8); // Extract a group of 8 bits
        const charCode = parseInt(byte, 2); // Parse the binary value to an integer
        str += String.fromCharCode(charCode); // Convert the integer to its ASCII character
    }
    return str;
}

//generating a random key
function generateRandomHex() {
    const characters = '0123456789ABCDEF';
    let result = '';

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

function StringtoHex(text){
	let hex = '';

	for(let i = 0; i < text.length ; i++){
		hex += text.charCodeAt(i).toString(16);
	}
	return hex;

}

