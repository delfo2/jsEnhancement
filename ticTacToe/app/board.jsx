"use client";
import { useState } from "react";
import Square from "./square";
import calculateWinner from "./utils/calculateWinner";

export default function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);

    let winnerSquares;
    let status;
    let isDrawn = false;

    if (winner) {
        status = `Winner:${squares[winner[0]]}`;
        winnerSquares = Array(9)
            .fill(false)
            .map((item, i) => winner.includes(i));
    } else {
        let arrIsFull = true;
        for (const item of squares) {
            if(!item) {
                arrIsFull = false;
            }
        }
        isDrawn = arrIsFull;
        status = arrIsFull ? "Drawn." : `Next player: ${xIsNext ? "X" : "O"}`;
        winnerSquares = Array(9).fill(false);
    }

    function handleClick(i) {
        const squareExists = squares[i];
        const winnerExists = calculateWinner(squares);
        if (squareExists || winnerExists) return;

        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        onPlay(newSquares);
    }

    const board = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            row.push(
                <Square
                    value={squares[index]}
                    key={index}
                    onSquareClick={() => handleClick(index)}
                    winner={winnerSquares[index]}
                    isDrawn={isDrawn}
                />
            );
        }
        board.push(
            <div className="board-row" key={i}>
                {row}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    );
}
