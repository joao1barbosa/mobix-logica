const timePerLine = [];
let time;
let timer;

//A função verificar se o valor passado pelo usuário é válido (número inteiro e maior que 5) e apresenta mensagem com o erro correspondente
function isNumber(num){
   if (Number(num) === parseInt(num)){
    if(parseInt(num) < 5){
        console.log("Error: Não é possível construir uma Ampulheta com este tamanho!");
        return false;
    }else{
        return parseInt(num);
    }
   }else{
    console.log("Error: Valor digitado é inválido!");
    return false;
   }
}

//Função que enumera a quantidade de "grãos" por linha e o total de grãos
function controlTimePerLine(size){
    for(i=(size-4);i>=0; i-= 2){
        timePerLine.push(i);
    }

    time = timePerLine.reduce(function(total, acc){
        return total+acc;
    });
}

function timerControl(size){ //Função que controla a queda dos "grãos" a cada intervalo de tempo
    if(!(size === false)){

        controlTimePerLine(size);

        timer = setInterval(function () {
            console.clear();
            drawHourglass(size);
        }, 300); //intervalo de tempo (em milisegundos) para cada "grão" cair
    }
}

//Função que desenha a linha superior e inferior da Ampulheta
function drawEndLine(size){
    let line = "";
    for(i=0;i<size;i++){
        line += "-";
    }

    console.log(line);
}

//Função que desenha a Ampulheta
function drawHourglass(size){

        console.log("n = " + size);
        drawEndLine(size);//Desenha linha superior
        let cont = 0;
    
        let cornerWidth = 0; //Largura entre a moldura da ampulheta e sua lateral 
        let middleWidth = size - 4; //Largura interna da ampulheta
        let cornerWidthLine;//String com o espaço equivalente à variável cornerWidth
        
        while(middleWidth >= 0){ //Repete o bloco do código até a largura interna da Ampulheta não existir (parte superior até o meio exato da Ampulheta)
            
            cornerWidthLine = "";
            for(i=0;i<cornerWidth; i++){//Define qual será o espaço entre a moldura da Ampulheta e sua lateral nesta linha
                cornerWidthLine += " ";
            }
    
            let line = "";
            let j = 0;

            while(j<middleWidth){//Define qual será o espaço interno da Ampulheta nesta linha
                for(k=0; k<timePerLine[cont]; k++) { // 
                    line += "*";
                    j++;
                }
                for(k=0; j<middleWidth; k++){
                    line += " ";
                    j++;
                }
            }
    
            line = "|" + cornerWidthLine + "\\" + line + "/" + cornerWidthLine + "|"; //Monta como será a linha atual da Ampulheta
    
            console.log(line);//Desenha a linha atual da Ampulheta

    
            //Contadores dos tamanhos dos espaços na ampulheta
            cornerWidth++; 
            middleWidth -= 2;
            cont++;
        }
        
        //Cria uma linha a mais na Ampulheta se o tamanho for ímpar (apenas uma melhoria visual);
        if(size % 2 === 1){
            console.log("|" + cornerWidthLine + " - " + cornerWidthLine + "|");
        }
    
        
        while(cornerWidth >= 1){//Desenha a parte inferior da Ampulheta 
            //Contadores dos tamanhos dos espaços na ampulheta
            cornerWidth--;
            middleWidth += 2;
            cont--;
    
            cornerWidthLine = "";
            for(i=cornerWidth;i > 0; i--){//Define qual será o espaço entre a moldura da Ampulheta e sua lateral nesta linha
                cornerWidthLine += " ";
            }
    
            let line = "";
            let j = 0;
            
            while(j<middleWidth){//Define qual será o espaço interno da Ampulheta nesta linha
                for(k=0; k<timePerLine[cont]; k++) { // 
                    line += " ";
                    j++;
                }
                for(k=0; j<middleWidth; k++){
                    line += "*";
                    j++;
                }
            }
    
            line = "|" + cornerWidthLine + "/" + line + "\\" + cornerWidthLine + "|";//Monta como será a linha atual da Ampulheta
    
            console.log(line);//Desenha a linha atual da Ampulheta
        }

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
    
        drawEndLine(size); //Desenha linha inferior

        time--;
        if(time === -1){
            clearInterval(timer);
        }
}


const readLineSync = require("readline-sync");
const n = readLineSync.question("Digite o tamanho da Ampulheta: "); 

timerControl(isNumber(n));
