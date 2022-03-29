import mode1pass from '../data/rand.json'
import mode2pass from '../data/paths.json'

const verify=(mode,roll,pass)=>{
    if(mode===1){
        return mode1pass[roll]===pass
    }
    else if(mode===2){
        console.log(mode2pass[roll],pass,pass===mode2pass[roll])
        return mode2pass[roll]===pass
    }
    else{
        return false
    }   
}

const getIntegerFromAlphaNumeric32=alphaNumeric=>{
    if(alphaNumeric>='A' && alphaNumeric<='Z'){
        return alphaNumeric-'A';
    }else{
        return 26+parseInt(alphaNumeric);
    }
}

const convertToBinary=n=>{
    var s="";
    while(n>0){
        s=n%2+s;
        n=Math.floor(n/2);
    }
    while(s.length<5)s="0"+s;
    return s;
}

const decodeAlphaNumeric32=path=>{
    if(!path)return "";
    var decodedPath="";
    for(let i=0;i<path.length;i++){
        const num=getIntegerFromAlphaNumeric32(path[i]);
        decodedPath+=convertToBinary(num);
    }
    return decodedPath;
}

export {verify,decodeAlphaNumeric32};