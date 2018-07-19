import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//easy: 29-32
//medium: 24-27
//hard: 19-22
  
class Board extends React.Component {
    isHintSquare(r, c) {
        var isHintSquare = this.props.selectedr===r || this.props.selectedc===c;

        if(this.props.selectedr!=null){
            if(this.props.squares[r][c][0]===null) return isHintSquare;

            return isHintSquare || this.props.squares[r][c][0]===this.props.squares[this.props.selectedr][this.props.selectedc][0];
        }
        return isHintSquare;
    }

    renderSquare(r, c) {
        var classes = "square";

        var color = {};

        if(this.props.squares[r][c][1] === "e") classes += " errorSquare"; 

        if(this.props.selectedr===r && this.props.selectedc===c){   // selected square
            color = {r: 255, g: 255, b: 5, t: 0.5};
        } else if(this.props.hintMode && this.isHintSquare(r,c)){      //hint square
            color = {r: 180, g: 255, b: 110, t: 0.5};
        } 
        if(this.props.squares[r][c][1] === "f"){    // fixed square
            if(color.r) color = {
                r: (color.r+150)/2,
                g: (color.g+155)/2,
                b: (color.b+135)/2, 
                t: 0.8
            };
            else color = {r: 150, g: 155, b: 135, t: 0.5};
        } else if(!color.r) color = {r: 255, g: 255, b:255, t: 1};

        if(r===2 || r===5) classes += " bottomBorder";
        if(c===2 || c===5) classes += " rightBorder";

        return (
            <button 
                key={r*9 + c} 
                onClick={() => this.props.onClick(r, c)} 
                className={classes}
                style={{background: "rgb("+color.r+","+color.g+","+color.b+","+color.t+")"}}>
                {this.props.squares[r][c][0]}
            </button>
        );
    }
  
    render() {
        var element = [];
        for(var r=0; r<9; r++){
            var row = [];
            for(var c=0; c<9; c++){
                if(this.props.squares[r][c][1] instanceof Array){
                    row.push(this.renderSquare(r,c)); //change to renderPencilledSquare(r,c)
                } else {
                    row.push(this.renderSquare(r,c));
                }
            }
            element.push(<div className="board-row" key={r}> {row} </div>);
        }
        return <div>{element}</div>;
    }
}

// ========================================
  
class InputPad extends React.Component {
    renderSquare(i) {
        return (
            <button key={i} onClick={()=>this.props.onClick(i)} className="smallButton">
                {i}
            </button>
        );
    }

    render() {
        var pad = [];
        for (var i=1; i<=9; i++){
            pad.push(this.renderSquare(i));
        }
        

        return <div className="board-row game-board">{pad}</div>;
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        var difficulty = 35;

        this.state = {
            squares: this.initBoard(difficulty), 
            selectedr: null,
            selectedc: null,
            pencilMode: false,
            hintMode: true,
            message: "",
        };
        this.pressKey= this.pressKey.bind(this);
    }
  
    componentWillMount() {
        document.addEventListener("keydown", this.pressKey, false);
    }
  
  
    componentWillUnmount() {
        document.removeEventListener("keydown", this.pressKey, false);
    }

    pressKey(event) {
        if(event.keyCode===8) this.clickPad(null);
        else if(48<=event.keyCode && event.keyCode<=57) this.clickPad(event.keyCode-48);
    }
  
    clickBoard(r, c) {
        this.setState({
            selectedr: r,
            selectedc: c,
        });
    }

    clickPad(num) {
        if(this.state.selectedr!==null && this.state.squares[this.state.selectedr][this.state.selectedc][1] !== "f"){
            this.state.squares[this.state.selectedr][this.state.selectedc][0] = num;

            if(!this.isValidMove(num)){
                this.state.errors++;
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = 'e';
                this.forceUpdate(); 
            } else {
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = null;
                if(this.checkComplete()){
                    this.setState({
                        message: "Game Complete"
                    });
                } else this.forceUpdate();           
            }
        }
    }

    pencilIn(num){
        console.log("pencilIn");
    }

    switchHintMode() {
        this.setState({
            hintMode: !this.state.hintMode
        })
    }

    switchPencilMode() {
        this.setState({
            pencilMode: !this.state.pencilMode
        })
    }

    isValidMove(num) {
        if(num===null) return true;

        for(var i=0; i<9; i++){
            if(this.state.squares[i][this.state.selectedc][0]===num && this.state.selectedr!==i){
                return false;
            } else if(this.state.squares[this.state.selectedr][i][0]===num && this.state.selectedc!==i){
                return false;
            }
        }
        //check 3-square
        return true;
    }

    checkComplete(){
        var complete = true;
        for(var r=0; r<9; r++){
            for(var c=0; c<9; c++){
                if(this.state.squares[r][c][1]==='e') {
                    this.state.squares[r][c][1] = null;
                    complete = false;
                } else if (this.state.squares[r][c][0]===null) complete = false;
            }
        }
        return complete;
    }

    clearBoard() {
        for(var r=0; r<9; r++){
            for(var c=0; c<9; c++){
                if(this.state.squares[r][c][1]!=='f') {
                    this.state.squares[r][c] = [null,null];
                }
            }
        }
        this.setState({selectedc:null, selectedr:null});
    }

    initBoard(level) {
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
  
    render() {  
      return (
        <div className="game">
            <h1> SUDOKU </h1>
            <br/>
            <div className="game-board">
                <Board
                    squares={this.state.squares}
                    selectedr={this.state.selectedr}
                    selectedc={this.state.selectedc}
                    hintMode={this.state.hintMode}
                    pencilMode={this.state.pencilMode}
                    onClick={(r,c) => this.clickBoard(r, c)}
                />
            </div>
            <br/>

            <InputPad onClick={(i)=> this.state.pencilMode? this.pencilIn(i) : this.clickPad(i)}/>

            <button onClick={() => this.switchHintMode()} className={this.state.hintMode?'bigButton selected':'bigButton'}>
                Hints
            </button> 
            <button onClick={() => this.switchPencilMode()} className={this.state.pencilMode?'bigButton selected':'bigButton'}>
                Pencil
            </button> 
            <button onClick={() => this.clickPad(null)} className="bigButton">
                Erase
            </button>
            <button onClick={() => this.clearBoard()} className='bigButton'>
                Reset
            </button> 
            <br/>
            <p>{this.state.message}</p>
            <br/>
            <button 
                onClick={() => this.setState({
                        squares:this.initBoard(), 
                        message:'', 
                        selectedr: null,
                        selectedc: null
                    })} 
                className='fullButton'>
                New Game
            </button> 
        </div>
      );
    }
}
  
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================

  


  
