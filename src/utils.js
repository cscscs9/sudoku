
export function checkComplete(board){
    var complete = true;
    for(let r=0; r<9; r++){
        for(let c=0; c<9; c++){
            if(board[r][c][1]==='e') {
                board[r][c][1] = null;
                complete = false;
            } else if (board[r][c][0]===null) complete = false;
        }
    }
    return complete;
}

export function isValidMove(num, board, selectedr, selectedc) {
    if(num===null) return true;

    for(let i=0; i<9; i++){
        if(board[i][selectedc][0]===num && selectedr!==i){
            return false;
        } else if(board[selectedr][i][0]===num && selectedc!==i){
            return false;
        }
    }
    var r = Math.floor(selectedr/3)*3;
    var c = Math.floor(selectedc/3)*3;
    for(let ir=r; ir<r+3; ir++){
        for(let ic=c; ic<c+3; ic++){
            if(board[ir][ic][0]===num && selectedr!==ir && selectedc!==ic){
                return false;
            } 
        }
    }
    return true;
}

export function initBoard(level) {
    var board = [];
    for(let r=0; r<9; r++){
        let row = [];
        for(let c=0; c<9; c++) row.push([null, getNeighbors(r,c)]);
        board.push(row);
    }

    if(!fillCells(board, {r: 0, c: 0})){
        console.log("failed to fill board?");
        sampleBoard(board);
    } 
    let count = 0;
    for(let i=0; i<level; i++){
        board[Math.floor(Math.random()*9)][Math.floor(Math.random()*9)][1] = "f";
    }
    for(let r=0; r<9; r++){
        for(let c=0; c<9; c++){
            if(board[r][c][1]!=="f") board[r][c] = [null, null];
            else count++;
        }
    }
    console.log(count);
    return board;
}

function getNeighbors(r, c){
    var neighbors = [];
    for(let n=0; n<9; n++){
        if(n!==c) neighbors.push([r,n]);
        if(n!==r) neighbors.push([n,c]);
    }

    var rBorder = Math.floor(r/3)*3;
    var cBorder = Math.floor(c/3)*3;
    for(let ir=rBorder; ir<rBorder+3; ir++){
        for(let ic=cBorder; ic<cBorder+3; ic++){
            if(ir!==r && ic!==c) neighbors.push([ir,ic]);
        }
    }
    return neighbors;
}

function nextCell(coord){
    if(coord.r+1 >= 9) return {r:0, c:coord.c+1};
    else return {r:coord.r+1, c:coord.c};
}

function fillCells(board, coord){
    if(coord.c >= 9 || coord.r >= 9) return true; //board filled

    var options = new Set([1,2,3,4,5,6,7,8,9]);
    for(let neighbor of board[coord.r][coord.c][1]){
        if(board[neighbor[0]][neighbor[1]][0]!=null) options.delete(board[neighbor[0]][neighbor[1]][0]);
    }

    while(options.size > 0){
        var value = [...options][Math.floor(Math.random()*options.size)];
        board[coord.r][coord.c][0] = value;
        options.delete(value);

        if(!fillCells(board, nextCell(coord))){ // remove option and try with another value
            board[coord.r][coord.c][0] = null;
        } else return true;
    }

    return false; // no options, backtrack
}

function sampleBoard(board){
    board[0][1]=[8,"f"];
    board[0][7]=[1,"f"];
    board[1][3]=[8,"f"];
    board[1][4]=[9,"f"];
    board[1][5]=[6,"f"];
    board[2][0]=[6,"f"];
    board[2][2]=[7,"f"];
    board[2][3]=[5,"f"];
    board[2][5]=[1,"f"];
    board[2][6]=[3,"f"];
    board[2][8]=[8,"f"];
    board[3][0]=[1,"f"];
    board[3][4]=[6,"f"];
    board[3][8]=[2,"f"];
    board[4][0]=[2,"f"];
    board[4][1]=[9,"f"];
    board[4][3]=[1,"f"];
    board[4][4]=[5,"f"];
    board[4][5]=[8,"f"];
    board[4][7]=[3,"f"];
    board[4][8]=[4,"f"];
    board[5][0]=[7,"f"];
    board[5][4]=[4,"f"];
    board[5][8]=[9,"f"];
    board[6][0]=[5,"f"];
    board[6][2]=[1,"f"];
    board[6][3]=[2,"f"];
    board[6][5]=[4,"f"];
    board[6][6]=[9,"f"];
    board[6][8]=[7,"f"];
    board[7][3]=[7,"f"];
    board[7][4]=[1,"f"];
    board[7][5]=[5,"f"];
    board[8][1]=[7,"f"];
    board[8][7]=[2,"f"];
}