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
            if(this.props.squares[r][c][0]===null) return false;

            return isHintSquare || this.props.squares[r][c][0]===this.props.squares[this.props.selectedr][this.props.selectedc][0];
        }
        return isHintSquare;
    }

    renderSquare(r, c) {
        var classes = "square";

        if(this.props.squares[r][c][1] === "f") classes += " fixedSquare";
        else if(this.props.squares[r][c][1] === "e") classes += " errorSquare";
        else if(this.props.selectedr===r && this.props.selectedc===c) classes += " selectedSquare";
        else if(this.isHintSquare(r,c)) classes += " hintSquare";

        if(r===2 || r===5) classes += " bottomBorder";
        if(c===2 || c===5) classes += " rightBorder";

        return (
            <button 
                key={r*9 + c} 
                onClick={() => this.props.onClick(r, c)} 
                className={classes}>
                {this.props.squares[r][c][0]}
            </button>
        );
    }
  
    render() {
        var element = [];
        for(var r=0; r<9; r++){
            var row = [];
            for(var c=0; c<9; c++){
                row.push(this.renderSquare(r,c));
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

        this.state = {
            squares: this.initBoard(30), 
            selectedr: null,
            selectedc: null,
            emptyCount: 81,
            hintMode: false,
            message: ""
        };
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
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = 'e';
            } else {
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = null;                
            }

            this.setState({
                emptyCount: this.emptyCount-1,
                message: this.state.emptyCount===0? "Game Complete": ""
            });
        } else { //error?
            this.setState({message:""});
        }
    }

    switchMode() {
        this.setState({
            hintMode: !this.state.hintMode
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

    initBoard(level) {
        var board = [];
        for(var r=0; r<9; r++){
            var row = [];
            for(var c=0; c<9; c++) row.push([null, null]);
            board.push(row);
        }
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
                    onClick={(r,c) => this.clickBoard(r, c)}
                />
            </div>
            <br/>

            <InputPad onClick={(i)=>this.clickPad(i)}/>
            <button onClick={() => this.clickPad(null)} className="bigButton">Erase</button>
            <button onClick={() => this.switchMode()} className="bigButton">Switch Mode</button> 
            <br/>
            <p>{this.state.message}</p>
        </div>
      );
    }
}
  
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================

  


  
