

module.exports = class GameOfLife {
    getNeighbours(cell) {
        var neighbours = [];
        if (cell !== undefined && cell !== null && cell.length > 0) {
            var d = [1, 0, -1];
            for (var i in d) {
                for (var j in d) {
                    if (d[i] === 0 && d[j] === 0) {
                        continue;
                    }
                    var c = [cell[0] - d[i], cell[1] - d[j]];
                    neighbours.push(c);
                }
            }
        }
        return neighbours;
    }
}
