function drawEndLine(size){
    let line = "";
    for(i=0;i<size;i++){
        line += "-";
    }

    console.log(line);
}

function drawMiddle(size){
    drawEndLine(size);

    let corner = 0;
    let middle = Number(size) - 4;
    let cornerLine;
    
    while(middle >= 0){
        
        cornerLine = "";
        for(i=0;i<corner; i++){
            cornerLine += " ";
        }

        let line = "";
        for(i=0;i<middle; i++){
            line += " ";
        }

        line = "|" + cornerLine + "\\" + line + "/" + cornerLine + "|";

        console.log(line);

        corner++;
        middle -= 2;
    }

    if(Number(size) % 2 === 1){
        console.log("|" + cornerLine + " - " + cornerLine + "|");
    }

    while(corner >= 1){
        corner--;
        middle += 2;

        cornerLine = "";
        for(i=corner;i > 0; i--){
            cornerLine += " ";
        }

        let line = "";
        for(i=0;i < middle; i++){
            line += "*";
        }

        line = "|" + cornerLine + "/" + line + "\\" + cornerLine + "|";

        console.log(line);
    }

    drawEndLine(size);
}

const readLineSync = require("readline-sync");
const n = parseInt(readLineSync.question("Digite o tamanho da Ampulheta: ")); 

drawMiddle(n);