export default function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 4, 8],
        [2, 4, 6],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        const squareExists = squares[a];
        if (
            squareExists &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return line;
        }
    }
    return null;
}
