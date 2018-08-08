import React from 'react';
import './index.css';

export class InputPad extends React.Component {
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
  