import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Board} from './board'
import {InputPad} from './input'
import {initBoard, checkComplete, isValidMove} from './utils.js'

//easy: 29-32
//medium: 24-27
//hard: 19-22
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        var difficulty = 35;

        this.state = {
            squares: initBoard(difficulty), 
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

            if(!isValidMove(num,this.state.squares, this.state.selectedr, this.state.selectedc)){
                this.state.errors++;
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = 'e';
                this.forceUpdate(); 
            } else {
                this.state.squares[this.state.selectedr][this.state.selectedc][1] = null;
                if(checkComplete(this.state.squares)){
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

  


  
