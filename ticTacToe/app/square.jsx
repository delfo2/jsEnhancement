export default function Square({ value, onSquareClick, winner, isDrawn }) {
    return (
        <button
            className={`square ${winner ? "square-winner" : ""} ${
                isDrawn ? "square-drawn" : ""
            }`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
