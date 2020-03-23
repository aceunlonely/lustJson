const util = require('./util')

/*
lust.LJ.isArray: 是否是数组对象一员
lust.LJ.object: lustJson
lust.LJ.index:  数组对象中的位置 0 开始，非数据对象没有该属性
lust.LJ.dotTree lustJson所有在的树位置 如： key1.key2[3]
lust.LJ.fJson  父json对象
lust.LJ.fKey  object所在父json的键值
lust.LJ.key   objcet所属的key 值 ，只有 出现在 lust在kv中的v时  及    xxx : "???" 这种情况时  ？？？ 代表lust
lust.LJ.isKey ： lust是否是 kv 中的 k
*/

/**
 *  找到所有的lust
 * @param {*} json 
 * @param {*} dotTree 
 * @param {*} fJson 
 * @param {*} fKey 
 * @param {*} sxg 
 * @param {*} options  { findOne : false}  需要找1个时采用findOne： true
 * */
var getLusts = async (json, dotTree, fJson, fKey, sxg, options) => {
    if (!json) return []
    if (!sxg) return []
    var lustArray = new Array()
    //json must be arry or json
    if (util.Type.isArray(json)) {
        for (var i = 0; i < json.length; i++) {
            var arrayOne = json[i]

            if (util.Type.isString(arrayOne)) {
                var r = {}
                r.LJ = r.LJ || {}
                r.LJ.isKey = false
                r.LJ.isArray = true
                r.LJ.object = json
                r.LJ.index = i
                r.LJ.dotTree = dotTree ? (dotTree + "[" + i + "]") : ('[' + i + ']'),
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = null
                if (sxg.isLustForString && sxg.getLustForString && await sxg.isLustForString(arrayOne, options,r)) {
                    r.value= await sxg.getLustForString(arrayOne, options,r)
                    lustArray.push(r)
                }
            } else if (util.Type.isObject(arrayOne)) {
                var r = {}
                r.value = arrayOne
                r.LJ = r.LJ || {}
                r.LJ.isArray = true
                r.LJ.isKey = false
                r.LJ.object = json
                r.LJ.index = i
                r.LJ.dotTree = dotTree ? (dotTree + "[" + i + "]") : ('[' + i + ']'),
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = null
                //if is lust， return lust
                if (sxg.isLustForObject && await sxg.isLustForObject(arrayOne, options,r)) {
                    if (sxg.getLustForObject) {
                        r.value = await sxg.getLustForObject(arrayOne, options,r) || arrayOne
                    }
                    lustArray.push(r)
                }
                else {
                    var r = await getLusts(arrayOne, (dotTree ? (dotTree + "[" + i + "]") : ('[' + i + ']')), json, i, sxg, options)
                    if (r != null)
                        lustArray = lustArray.concat(r)
                }
            } else if (util.Type.isArray(arrayOne)) {
                var r = await getLusts(arrayOne, (dotTree ? (dotTree + "[" + i + "]") : ('[' + i + ']')), json, i, sxg, options)
                if (r != null)
                    lustArray = lustArray.concat(r)
            }
            else {
                var r = {}
                r.LJ = r.LJ || {}
                r.LJ.isKey = false
                r.LJ.isArray = true
                r.LJ.object = json
                r.LJ.index = i
                r.LJ.dotTree = dotTree ? (dotTree + "[" + i + "]") : ('[' + i + ']'),
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = null
                //others
                if (sxg.isLustForOthers && sxg.getLustForOthers && await sxg.isLustForOthers(arrayOne, options,r)) {
                    r .value= await sxg.getLustForOthers(arrayOne, options,r)
                    lustArray.push(r)
                }
            }
            //find one
            if (options && options.findOne && lustArray.length > 0) {
                return lustArray
            }
        }
    }
    else if (util.Type.isObject(json)) {
        //util.type.isArray(json)
        for (var key in json) {
            // name: '???(string)[rue]这里填写你的名字'
            var value = json[key]
            // '???': null
            var r ={}
            r.LJ = r.LJ || {}
            r.LJ.isKey = true
            r.LJ.key = key
            r.LJ.object = json
            r.LJ.dotTree = (dotTree ? (dotTree + ".???") : "???")
            if (sxg.isLustForKV && await sxg.isLustForKV(key, value, options,r)) {
                r.value = await sxg.getLustForKV(key, value, options,r)
                lustArray.push(r)
            }
            // is String
            else if (util.Type.isString(value)) {
                var r = {}
                r.LJ = r.LJ || {}
                r.LJ.isKey = false
                r.LJ.isArray = false
                r.LJ.object = json
                r.LJ.index = i
                r.LJ.dotTree = dotTree ? (dotTree + "." + key) : key
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = key
                if (sxg.isLustForString && sxg.getLustForString && await sxg.isLustForString(value, options,r)) {
                    r.value = await sxg.getLustForString(value, options,r)
                    lustArray.push(r)
                }
            }
            // is Array
            else if (util.Type.isArray(value)) {
                var r = await getLusts(value, (dotTree ? (dotTree + "." + key) : key), json, key, sxg, options)
                if (r != null)
                    lustArray = lustArray.concat(r)
            }
            else if (util.Type.isObject(value)) {
                //if is lust， return lust
                var r = {}
                r.value= value
                r.LJ = r.LJ || {}
                r.LJ.isArray = false
                r.LJ.isKey = false
                r.LJ.object = json
                r.LJ.index = 0
                r.LJ.dotTree = dotTree ? (dotTree + "." + key) : key
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = key
                if (sxg.isLustForObject && await sxg.isLustForObject(value, options,r)) {
                    if (sxg.getLustForObject) {
                        r .value= await sxg.getLustForObject(value, options,r) || value
                    }
                    lustArray.push(r)
                }
                else {
                    var r = await getLusts(value, (dotTree ? (dotTree + "." + key) : key), json, key, sxg, options)
                    if (r != null)
                        lustArray = lustArray.concat(r)
                }
            } else {
                //others
                var r = {}
                r.LJ = r.LJ || {}
                r.LJ.isKey = false
                r.LJ.isArray = false
                r.LJ.object = json
                r.LJ.index = i
                r.LJ.dotTree = dotTree ? (dotTree + "." + key) : key
                r.LJ.fJson = fJson
                r.LJ.fKey = fKey
                r.LJ.key = key
                if (sxg.isLustForOthers && sxg.getLustForOthers && await sxg.isLustForOthers(value, options,r)) {

                    r.value = await sxg.getLustForOthers(value, options,r)
                    lustArray.push(r)
                }
            }
            if (options && options.findOne && lustArray.length > 0)
                return lustArray
        }
    }
    return lustArray
}

/**
 * 填充lustInfo
 * @param {*} cr 
 */
var fillOneLustInfo = function (cr, lustInfo) {
    if (lustInfo.LJ.isKey) {
        lustInfo.LJ.object[cr.key] = cr.value
    }
    else {
        if (lustInfo.LJ.isArray) {
            lustInfo.LJ.object.splice(lustInfo.LJ.index, 0, cr.value)
        }
        else {
            lustInfo.LJ.object[lustInfo.LJ.key] = cr.value
        }
    }

    if (!cr.isKeepLust) {
        //console.log(lustInfo)
        if (lustInfo.LJ.isArray) {
            //lustInfo.fJson[lustInfo.fkey] = 
            lustInfo.LJ.object.splice(lustInfo.LJ.index + 1, 1)
        }
        else if (lustInfo.LJ.isKey) {
            delete lustInfo.LJ.object[lustInfo.LJ.key]
        }
    }
}

/**
 * satify one lust
 * @param {*} lustInfo 
 */
var satifyOneLust = function (lustInfo, sxg, options) {
    return new Promise(function (r, j) {
        const cycle = function (lastData) {
            if (!sxg.getInputOneLustValue) {
                throw new Error("lustJson: your sxg must implement the exports methods: getInputOneLustValue")
            }
            if (!sxg.validateOneLustInfo) {
                throw new Error("lustJson: your sxg must implement the exports methods: validateOneLustInfo")
            }
            var dataOrPromise = sxg.getInputOneLustValue(lustInfo, lastData, options)
            //inputHandler
            const inputHandler = data => {
                const validateHandler = cr => {
                    //cr like:
                    /* 
                        isPass
                        isKeepLust
                        value
                        key
                    */
                    if (cr.isPass) {
                        fillOneLustInfo(cr, lustInfo)
                        r()
                    }
                    else {
                        //stdin.writeLine(cr.message + "\r\n")
                        cycle(data)
                    }

                    // if(cr.isPass)
                    // {
                    //     if(!cr.isUpdate){
                    //         stdin.writeLine("add success:" + lustInfo.dotTree + " continue to add?\r\nyes/no:(no) ")         
                    //         stdin.readLine().then(data1=>{ 
                    //             if(data1 == "true" || data1 == "yes" || data1 == "y" || data1=="Y"
                    //                 || data1 == "t"){
                    //                 // if continue ,will keep ???
                    //                 r()
                    //             }
                    //             else{
                    //                 //console.log(lustInfo)
                    //                 if(lustInfo.isArray){
                    //                     //lustInfo.fJson[lustInfo.fkey] = 
                    //                     lustInfo.object.splice(lustInfo.index+1,1) 
                    //                 }
                    //                 else if(lustInfo.isKey){
                    //                     delete lustInfo.object[lustInfo.key]
                    //                 }
                    //                 r()
                    //             }
                    //         })

                    //     }
                    //     else
                    //     {
                    //         r()
                    //     }
                    // }
                }
                var vResultOrPromise = sxg.validateOneLustInfo(data, lustInfo, lastData, options)
                if (vResultOrPromise.then) {
                    vResultOrPromise.then(vResult => {
                        validateHandler(vResult)
                    })
                }
                else {
                    validateHandler(vResultOrPromise)
                }

                //var cr =lust.checkAndUpdateValueByLustInfo(data,lustInfo,lastData)

            }
            if (dataOrPromise.then) {
                dataOrPromise.then(data => {
                    inputHandler(data)
                })
            }
            else {
                inputHandler(dataOrPromise)
            }
        }
        //start main logic
        cycle()
    })
}


/**
 * 获取lustJson值
 * @param {*} lustJson 欲望json
 * @param {*} sxg 性感女孩 解决器
 * @param {*} options 选择项
 */
var get = function (lustJson, sxg, options) {
    if (sxg.prelude) {
        sxg.prelude(options)
    }
    //deep copy json
    var iJson = Object.assign({}, lustJson)
    return new Promise(function (r, j) {

        //serial
        var cylceAllLustSerial = async (options) => {
            var firstLustInfo = await getLusts(iJson, null, null, null, sxg, options)
            if (firstLustInfo.length > 0) {
                firstLustInfo = firstLustInfo[0]
                if (sxg.beforeSatifyOneLust) {
                    var pOrNot = sxg.beforeSatifyOneLust(firstLustInfo, options)
                    //判断是否是promise
                    if (pOrNot && pOrNot.then) {
                        pOrNot.then(data => {
                            satifyOneLust(firstLustInfo, sxg, options).then(() => {
                                if (sxg.afterSatifyOneLust) {
                                    sxg.afterSatifyOneLust(firstLustInfo, options)
                                }
                                cylceAllLustSerial(options)
                            }, j)
                        }, j)
                    }
                    else {
                        satifyOneLust(firstLustInfo, sxg, options).then(() => {
                            if (sxg.afterSatifyOneLust) {
                                sxg.afterSatifyOneLust(firstLustInfo, options)
                            }
                            cylceAllLustSerial(options)
                        })
                    }
                }
                else {
                    satifyOneLust(firstLustInfo, sxg, options).then(() => {
                        if (sxg.afterSatifyOneLust) {
                            sxg.afterSatifyOneLust(firstLustInfo, options)
                        }
                        cylceAllLustSerial(options)
                    }, j)
                }

            }
            else {
                if (sxg.afterSatifyAllLust) {
                    var pOrNot = sxg.afterSatifyAllLust(iJson, options)
                    //这边是是否重新make的逻辑，可扩展其他方式
                    if (pOrNot) {
                        if (pOrNot.then) {
                            pOrNot.then(result => {
                                if (result.isRemakeLustJson) {
                                    iJson = Object.assign({}, lustJson)
                                    cylceAllLustSerial(options)
                                }
                                else {
                                    r(iJson)
                                }
                            }, j)
                        }
                        else {
                            if (pOrNot.isRemakeLustJson) {
                                iJson = Object.assign({}, lustJson)
                                cylceAllLustSerial(options)
                            }
                            else {
                                r(iJson)
                            }
                        }
                    }
                    else
                        r(iJson)
                }
                else {
                    r(iJson)
                }
            }
            return
        }
        //parallel
        var cylceAllLustParallel = async (options) => {
            var lustInfos = await getLusts(iJson, null, null, null, sxg, options)
            if (lustInfos.length > 0) {
                util.promiseAllArray(lustInfos, ele => {
                    return new Promise((rr, jj) => {
                        if (sxg.beforeSatifyOneLust) {
                            var pOrNot = sxg.beforeSatifyOneLust(ele, options)
                            //判断是否是promise
                            if (pOrNot && pOrNot.then) {
                                pOrNot.then(data => {
                                    satifyOneLust(ele, sxg, options).then(() => {
                                        if (sxg.afterSatifyOneLust) {
                                            sxg.afterSatifyOneLust(ele, options)
                                        }
                                        rr()
                                    }, jj)
                                }, jj)
                            } else {
                                satifyOneLust(ele, sxg, options).then(() => {
                                    if (sxg.afterSatifyOneLust) {
                                        sxg.afterSatifyOneLust(ele, options)
                                    }
                                    rr()
                                }, jj)
                            }
                        } else {
                            satifyOneLust(ele, sxg, options).then(() => {
                                if (sxg.afterSatifyOneLust) {
                                    sxg.afterSatifyOneLust(ele, options)
                                }
                                rr()
                            }, jj)
                        }
                    })
                }, () => {
                    cylceAllLustParallel(options)
                }, j)
            }
            else {
                //here no lust now , redo logic
                if (sxg.afterSatifyAllLust) {
                    var pOrNot = sxg.afterSatifyAllLust(iJson, options)
                    //这边是是否重新make的逻辑，可扩展其他方式
                    if (pOrNot) {
                        if (pOrNot.then) {
                            pOrNot.then(result => {
                                if (result.isRemakeLustJson) {
                                    iJson = Object.assign({}, lustJson)
                                    cylceAllLustParallel(options)
                                }
                                else {
                                    r(iJson)
                                }
                            }, j)
                        }
                        else {
                            if (pOrNot.isRemakeLustJson) {
                                iJson = Object.assign({}, lustJson)
                                cylceAllLustParallel(options)
                            }
                            else {
                                r(iJson)
                            }
                        }
                    }
                    else
                        r(iJson)
                }
                else {
                    r(iJson)
                }
            }
            return
        }

        //是否串行 is Serial 默认并行
        if (options.serial) {
            options = Object.assign({}, options)
            options.findOne = true
            cylceAllLustSerial(options)
        }
        else {
            //并行lust
            options = Object.assign({}, options)
            options.findOne = false
            cylceAllLustParallel(options)
        }
    });
}


// exports.checkSxg = (sxg,isCheckAll) =>{
//     if(!sxg.prelude && isCheckAll){
//         throw new Error("sxg should implement prelude")
//     }
//     if(!sxg.prelude && isCheckAll){
//         throw new Error("sxg should implement prelude")
//     }
// }

exports.get = get //function(lustJson,resolver,resolverConf){console.log("get")}

