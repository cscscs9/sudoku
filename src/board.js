import React from 'react';
import './index.css';

export class Board extends React.Component {
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