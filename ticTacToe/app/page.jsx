"use client";

import { useState } from "react";
import Board from "./board";
import calculateCoords from "./utils/calculateCoords";

export default function page() {
    const [currentMove, setCurrentMove] = useState(0);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [order, setOrder] = useState("ascending");
    const actualSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setCurrentMove(newHistory.length - 1);
        setHistory(newHistory);
    }

    function jumpTo(move) {
        setCurrentMove(move);
        // setHistory([...history.slice(0, currentMove + 1)]);
    }

    function sortHistory() {
        if (order === "ascending") {
            setOrder("descending");
        } else {
            setOrder("ascending");
        }
        moves = history.map((squares, move, arr) => {
            renderList(squares, move, arr);
        });
    }

    function renderList(squares, index, arr) {
        let move = index;
        if (order !== "ascending") {
            move = arr.length - 1 - index;
        }
        if (move === currentMove) {
            return <li key={move}>{`You are at move º${move}`}</li>;
        }
        let description = undefined;
        if (move > 0) {
            const coords = calculateCoords(squares, move, arr);
            description = "Go to move nº" + move + ` (${coords[0]},${coords[1]})`;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    }

    let moves = history.map((squares, move, arr) => {
        return renderList(squares, move, arr);
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={actualSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <button onClick={sortHistory}>Sort</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
