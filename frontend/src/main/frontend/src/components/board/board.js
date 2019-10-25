import React from 'react';
import Square from '../square/square.js';
import * as _ from "lodash";
import axios from "axios";
import BackendMessageShower from "../backend-message-shower/backend-message-shower";


class Board extends React.Component {
    X_PLAYER = 'X';
    O_PLAYER = 'O';

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true


        };
    }

    renderSquare(i){
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext? this.X_PLAYER: this.O_PLAYER;
        this.sendBackendLastPlayed(squares[i]);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });

    }

    async sendBackendLastPlayed(squareValue) {
        const response = await axios.post("http://localhost:8080/api/ping/create", {value: squareValue});
        this.setState({backendMessage: response.data.value});
    }


    renderBackendMessage() {
        return <BackendMessageShower
            value={this.state.backendMessage}
        />
    }

    render () {
        const status = `Next Player: ${this.state.xIsNext ? this.X_PLAYER : this.O_PLAYER}`;

        return (
           <div>
               <div className="status">{status}</div>
               <div className="board-row">
                   {this.renderSquare(0)}
                   {this.renderSquare(1)}
                   {this.renderSquare(2)}
               </div>
               <div className="board-row">
                   {this.renderSquare(3)}
                   {this.renderSquare(4)}
                   {this.renderSquare(5)}
               </div>
               <div className="board-row">
                   {this.renderSquare(6)}
                   {this.renderSquare(7)}
                   {this.renderSquare(8)}
               </div>
               <br/>
               <br/>
               <br/>
               <div>
                   {this.renderBackendMessage()}
               </div>
           </div>

        );
    }

    calculateWinner(squares){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        _.forEach(lines, (line) =>{
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
            return false;
        });

    }

}

export default Board;