


/**
 * here 
 */
exports.prelude = function(options){
    console.log('hello , here is prelude of serisal')
}

/**
 * 判断字符串是否是Lust
 * is a lust , when string in array:
 *   [ 'xxx' , '???abc'] 
 * 
 * params:
 *  str : the string  isLustForString , like  '???abc'
 *  
 * 
 * returns 
 * true or false
 */
exports.isLustForString = (str,options) =>{
    // here when value start with ??? , is a lust
    //return util.startWith(str,"???")

    // return false means string is never lust
    if(str == "???"){
        return true
    }
    return false
}

/** 
 * get lust where isLustForString
 * params:
 *  str : the string  isLustForString , like  '???abc'
 *  
 * 
 * returns {}
 * the struct of lust, you can define by yourself
 * suggest is 
 *  {
 *      isLust : true,
 *      ...
 *  }
 */
exports.getLustForString = function(str,options){

    return {
        isLust : true,
        hello : "good day"
    }
}

/**
 * ...
 */
exports.isLustForObject = (obj,options) =>{
    return obj.isLust
}

exports.getLustForObject =(obj,options)=>{
    return obj
} 

exports.isLustForKV = (k,v,options)=>{
    return k === "???"
}

exports.getLustForKV = (k,v,options) => {
    var value = v
    if(value && value.isLust){
        var r = value
        return r;
    }
    return null;
}


exports.beforeSatifyOneLust = (lustInfo,options)=>{
    console.log("beforeSatifyOneLust : "  + lustInfo)
}

exports.afterSatifyOneLust = (lustInfo,options) =>{
    console.log("afterSatifyOneLust:" + lustInfo)
}


// here you can return value or a promise
// you should return 
/*
{
    isRemakeLustJson : false
}
*/
exports.afterSatifyAllLust = (lustJson,options) =>{
    return new Promise((r,j) =>{
        // if you check json is not your right json ,you can remake it 
        r({
            isRemakeLustJson : false
        })
    })
    
}

/**
 *  here main method
 *  you can return real value or a promise
 *  the return value is the real value replacing the lust
 */
exports.getInputOneLustValue = (lustInfo,lastData,options) =>{
    
    if(lustInfo.hello == "good day"){
        return "goodDay"
    }
    else{
        return "goodGoodDay"
    }

    // or a promise
}

/**
 *  here is method runs after getInputOneLustValue
 *  param value  is the value getInputOneLustValue returns
 *  here to check the value is ok or not
 *  you should return json like this:
 {
     isPass : true,
     isKeepLust : true,
     value : true,
     key : true
 }
    isPass :  true means validate ok, and excute replace
    isKeepLust : true means not to delete lust, continue add a lust
    value : the value of repalcing lust
    key :  when lust is a kv-lust , your should set the  key 

 */
exports.validateOneLustInfo = (value,lustInfo,lastData,options) =>{
    //kv lust
    if(lustInfo.LJ.isKey){
        return {
            isPass:true,
            isKeepLust: false,
            key: value,
            value :"here is kv lust"
        }
    }else{
        return {
            isPass:true,
            isKeepLust: false,
            value : value
        }
    }

}