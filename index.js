

!function(){
    var _Text = window['_STRINGS_']

    var _arr1 = _Text.split(" ")

    var Total = 0
    var ArrFreq = _arr1.map(e=>{
        var tmparr = e.split(",")
        const content = tmparr[0]
        const freq =  parseInt(tmparr[1])
        Total += freq
        return {content,freq}

    })

    console.log("Total",Total)
    console.log("Total",ArrFreq.length)
 
    function getChar(){
        var c =  randInt(Total) 
        const Count = ArrFreq.length
        for (let i = 0; i < Count; i++) {
            c -= ArrFreq[i].freq
            if(c <= 0){
                return ArrFreq[i].content
            }
            
        }
        return ""
    }
    function getStr(len){
        var s = ""
        while(len --){
            s += getChar()
        }
        return s 
    }

    function randStr(){
        return getStr(5 + randInt(20))
    }



    function randInt(max){
        return crypto.getRandomValues(new Uint32Array(1))[0] % (max )
    }

    function genArticle(len,outsize){
        var current = 0
        var result = ""

        var sentenceCount = 0;
        while (1) {
            const newStr = randStr();
            if(newStr.length + current > len){
                outsize.count = current;
                console.log("实际",current)
                result += "。"
                return result
            }

            var isEnd =  0 
            if(sentenceCount > 0){
                isEnd = randInt(100) > 30
                result += (isEnd ? "。":"，")
            }

            sentenceCount += 1
            if(sentenceCount > 1){
                if (randInt(2) == 1 && isEnd ){
                    result += "\n"
                    sentenceCount = 0;
                }
            }
            
            
            result += newStr;
            current += newStr.length

        }

        return result
    }


    function getValue(name){
        var radios = document.getElementsByName(name)
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value
            }
        }
        return ""
    }

    function genBtnClick(){

        var type = getValue("radom-text-style")
        var size = getValue("radom-text-size")

        if(size == "-1"){
            size = document.getElementById('customsize').value
        }

        var nSize = parseInt(size)

        console.log("目标",nSize)
        var outsize = {}
        var content = ""
        if(type == "rich-radom-text"){
            content = genArticle(nSize,outsize)
        }else{
            content = getStr(nSize)
            outsize.count = nSize
        }
        

        var arr = content.split("\n")

        
        var counter = `<b>实际字数:${outsize.count}</b>`

        var arrP = arr.map(function(e){

            return "<p>" + e + "</p>"
        })

        document.getElementById("generated-radom-text").innerHTML = counter + arrP.join("")
       


    }

    document.getElementById("generate-btn").onclick = genBtnClick
 
    
}()