export const isValidSudoku = (arraySolution) => {
    for (var y = 0; y < 9; ++y) {
        for (var x = 0; x < 9; ++x) {
            var value = arraySolution[y][x];
            if (value) {
                if(value === ''){
                    return false;
                }
                // Check the line
                for (var x2 = 0; x2 < 9; ++x2) {
                    if (x2 != x && arraySolution[y][x2] == value) {
                        return false;
                    } 
                }
                // Check the column
                for (var y2 = 0; y2 < 9; ++y2) {
                    if (y2 != y && arraySolution[y2][x] == value) {
                        return false;
                    } 
                }
                // Check the square
                var startY = Math.floor(y/3)*3;
                for (var y2 = startY; y2 < startY + 3; ++y2) {
                    var startX = Math.floor(x/3)*3;
                    for (x2 = startX; x2 < startX + 3; ++x2) {
                        if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

export const newRandomSudoku = () => {
    return [[]];
}