

export function initBoard(level) {
    var board = [];
    for(var r=0; r<9; r++){
        var row = [];
        for(var c=0; c<9; c++) row.push([null, null]);
        board.push(row);
    }

    //sample board
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

    return board;
}
