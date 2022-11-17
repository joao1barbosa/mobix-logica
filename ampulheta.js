const timePerLine = [];
let totalTime;
let timer;

function isNumber(num){
    return !(isNaN(Number(num)));
}

function isValidValue(num){
    return isNumber(num) && (num >= 5); 
}

function countTimePerLine(size){
    for(i = (size - 4); i >= 0; i -= 2){
        timePerLine.push(i);
    }

    countTotalTime();    
}

function countTotalTime(){
    totalTime = timePerLine.reduce(function(total, acc){
        return total+acc;
    });
}

function timerControl(size){
    countTimePerLine(size);

    timer = setInterval(function () {
        console.clear();
        drawHourglass(size);
    }, 300);
}

function drawEndLine(size){
    let line = "";
    
    for(i = 0; i < size; i++){
        line += "-";
    }

    console.log(line);
}

function drawHourglass(size){

        console.log("n = " + size);

        drawEndLine(size);
        let count = 0;
    
        let cornerWidth = 0;
        let withinWidth = size - 4; 
        
        let cornerWidthLine;
        
        while(withinWidth >= 0){
            
            cornerWidthLine = "";
            for(i = 0; i < cornerWidth; i++){
                cornerWidthLine += " ";
            }
    
            let line = "";
            let count2 = 0;

            while(count2 < withinWidth){
                for(k = 0; k < timePerLine[count]; k++) { // 
                    line += "*";
                    count2++;
                }
                for(k = 0; count2 < withinWidth; k++){
                    line += " ";
                    count2++;
                }
            }
    
            line = "|" + cornerWidthLine + "\\" + line + "/" + cornerWidthLine + "|";
    
            console.log(line);

            withinWidth -= 2;
            cornerWidth++; 
            count++;
        }
        
        //Cria uma linha a mais na Ampulheta se o tamanho for ímpar (apenas uma melhoria visual);
        if(size % 2 === 1){
            console.log("|" + cornerWidthLine + " - " + cornerWidthLine + "|");
        }
    
        
        while(cornerWidth >= 1){
            withinWidth += 2;
            cornerWidth--;
            count--;
    
            cornerWidthLine = "";
            for(i = cornerWidth; i > 0; i--){
                cornerWidthLine += " ";
            }
    
            let line = "";
            let count2 = 0;
            
            while(count2 < withinWidth){
                for(j=0; j < timePerLine[count]; j++) { // 
                    line += " ";
                    count2++;
                }
                for(j=0; count2 < withinWidth; j++){
                    line += "*";
                    count2++;
                }
            }
    
            line = "|" + cornerWidthLine + "/" + line + "\\" + cornerWidthLine + "|";
    
            console.log(line);
        }

        drawEndLine(size);
        
        //Este bloco decrementa a quantidade de grãos restantes 
        contDecres = 0;
        while(true){
            if(timePerLine[contDecres] === 0){
                contDecres++;
            }else{
                timePerLine[contDecres]--;
                break;
            }
        }

        totalTime--;
        if(totalTime === -1){
            clearInterval(timer);
        }
}

function startHourglass(test, size){
    if (test) return timerControl(size);

    console.log("Valor inválido ou muito pequeno para montar a Ampulheta!");
}

const readLineSync = require("readline-sync");
const n = readLineSync.question("Digite o tamanho da Ampulheta: "); 

startHourglass(isValidValue(n), n);
