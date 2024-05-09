function getColumnCoord(index) {
    if (typeof index === "number" && index > 0 && index <= 9) {
        const rest = index % 3;
        if (rest === 0) {
            return 3;
        }
        return rest;
    }
    return 0;
}

function getRowCoord(index) {
    if (typeof index === "number" && index >= 0 && index <= 9) {
        const fullNumber = index - (index % 3) + 3;
        const row = fullNumber / 3;
        return row === 0 ? 1 : row;
    }
    return 0;
}
export default function calculateCoords(squares, index, arr) {
    const coords = [];
    const targetIndex = 0 > index - 1 ? 0 : index - 1;
    const lastSquares = arr[targetIndex];
    for (let index = 0; index < squares.length; index++) {
        if (squares[index] !== lastSquares[index]) {
            coords.push(getRowCoord(index));
            coords.push(getColumnCoord(index + 1));
        }
    }
    const coordsAreFull =
        coords &&
        typeof coords[0] === "number" &&
        typeof coords[1] === "number";
    return coordsAreFull ? coords : [0, 0];
}
