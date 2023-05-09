const fs = require("fs")

/// 天龙八部 倚天屠龙记 楚留香
var txt = fs.readFileSync("source.txt").toString()

 
// 统计频率
var arrChar = txt.split("")
 

var map = {}
 
// 4E00-9FA5
arrChar.forEach(element => {
    if (element.charCodeAt(0) >=  0x4E00 && element.charCodeAt(0) <= 0x9FA5){
        var count = map[element]
        if (count == undefined){
            count = 1
        }else{
            count += 1
        }
        map[element] = count
 
    }else if(/[，。]/.test(element) ){
    }else{
        
    }
});

 

var keys = Object.keys(map)
keys = keys.sort((a,b)=>{
    return map[a] > map[b] ? -1 : map[a] < map[b] ? 1 : 0
})

var resultStr = ""
var result = keys.map((e,i)=>{
    resultStr += e +"," + map[e]
    if (i <keys.length -1){
        resultStr += " "
    }
    return {c :e ,f:map[e]}
})


fs.writeFileSync("frequency.txt", resultStr.split(" ").join("\n"))

fs.writeFileSync("frequency.js",  `window["_STRINGS_"] = "${resultStr}"`)


 

console.log("字数：",result.length)

 
