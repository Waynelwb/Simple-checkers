/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var boardRows;
var boardColumns;
var current=1;
var maxCellID=63;
var pieces=[];

function getCellID(row, column){
    return column*boardRows+row;
}

function drawGameboard(){
    current=1;
    document.getElementById("board").innerHTML="";
    boardRows=parseInt(document.getElementById("bRows").value);
    boardColumns=parseInt(document.getElementById("bColumns").value);
    document.getElementById("bRows").value=boardRows=(boardRows<8)?8:boardRows;
    document.getElementById("bColumns").value=boardColumns=(boardColumns<2)?2:boardColumns;
    pieces=[];
    maxCellID=boardColumns*boardRows-1;
    for(var i=0;i<boardRows;i++){
        var temp=[];
        for(var j=0;j<boardColumns;j++){
            if(i<=2){
                temp.push(((j+i)%2===0)?0:-1);
            }else if(boardRows-i<=3){
                temp.push(((j+i)%2===0)?0:1);
            }else{
                temp.push(0);
            }
        }
        pieces.push(temp);
    }
    document.getElementById("member1").innerHTML="Wenbo Liu";
    document.getElementById("member2").innerHTML="Yuanquan Mao";
    document.getElementById("member3").innerHTML="Xuda Han";
    var tableElement=document.createElement("table");
    document.getElementById("board").appendChild(tableElement);
    for(var i=0;i<boardRows;i++){
        var trElement=document.createElement("tr");
        tableElement.appendChild(trElement);
        for(var j=0;j<boardColumns;j++){
            var tdElement=document.createElement("td");
            tdElement.setAttribute("id",getCellID(i,j));
            tdElement.className=(i%2-j%2===0)?"black":"white";
            trElement.appendChild(tdElement);
        }
    }
}

function showPieces(){
    for(var i=0;i<boardRows;i++){
        for(var j=0;j<boardColumns;j++){
            document.getElementById(getCellID(i,j)).setAttribute("style","background-image: none");
            if(pieces[i][j]!==0){
                document.getElementById(getCellID(i,j)).setAttribute("style","background-image: url(images/"+((pieces[i][j]===1)?"blackChess":"redChess")+".png)");
            }
        }
    }
}

function randomMove(){
    current*=-1;
    var validMoves=[];
    for(var i=0;i<boardRows;i++){
        for(var j=0;j<boardColumns;j++){
            if(pieces[i][j]===current){
                var validTargets=[];
                for(var m=-1;m<=1;m+=2){
                    if(pieces[i-current]!==undefined&&pieces[j+m]!==undefined){
                        if(pieces[i-current][j+m]===0){
                            validTargets.push([i-current,j+m]);
                        }
                    }
                }
                if(validTargets.length>0){
                    validMoves.push([i,j,validTargets]);
                }
            }
        }
    }
    if(validMoves.length===0){
        alert("No legal moves for "+((current===1)?"black pieces":"red pieces")+"! Please refresh the board!");
    }else{
        var cellIndex=Math.floor((Math.random()*validMoves.length)),
        sourceR=validMoves[cellIndex][0],
        sourceC=validMoves[cellIndex][1],
        source=document.getElementById(getCellID(sourceR,sourceC)),
        targetIndex=Math.floor((Math.random()*validMoves[cellIndex][2].length)),
        targetR=validMoves[cellIndex][2][targetIndex][0],
        targetC=validMoves[cellIndex][2][targetIndex][1],
        target=document.getElementById(getCellID(targetR,targetC));
        pieces[targetR][targetC]=current;
        pieces[sourceR][sourceC]=0;
        target.setAttribute("style",source.getAttribute("style"));
        source.setAttribute("style","background-image: none");
    }
}