import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

//Redux Code

const defaultState = {
    grid: [[]]
};

const reducer = (grid = defaultState, action) => {
    if (action.type === "NUM-CHANGE") {
        return {
            grid: grid[action.y][action.x] = action.value
        };
    }
};

const store = createStore(reducer);

const numChangeAction = (psx,psy,val) => {
    return {
      type: 'NUM-CHANGE',
      x: psx,
      y: psy,
      value: val,
    }
};

//React Code
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.posx,
            y: this.props.posy,
            value: this.props.value,    
            isGiven: this.props.value,
        };
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        var val = this.state.value
        if (val < 9 & val !== '') {
            this.setState({value: val + 1})
        } else if (val === 9) {
            this.setState({value: ''})
        } else if (val === '') {
            this.setState({value: 1})
        }
    }

    render() {
        if (this.state.isGiven) {
            return (
                <td className="isGiven">
                    {this.state.value}
                </td>
            );
        } else {
            return (
                <td>
                    <button className='cell-button' onClick={this.clicked}>
                        {this.state.value} 
                    </button>
                </td>
            );
        }
    }
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var grid = this.props.gridNums
        grid = grid.map(
            (row, y) => {
                return row.map(
                    (num, x) => {
                        if(num === 0) {
                            return <Cell value={''} posx={x} posy={y} />
                        } else {
                            return <Cell value={num} posx={x} posy={y} />
                        }
                    }
                );
            }
        )

        return (
	    <div>
	    <table className='inline' >
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        <tbody>
            <tr>{grid[0]}</tr>
            <tr>{grid[1]}</tr>
            <tr>{grid[2]}</tr>        
        </tbody>
        <tbody>
            <tr>{grid[3]}</tr>
            <tr>{grid[4]}</tr>
            <tr>{grid[5]}</tr>        
        </tbody>
        <tbody>
            <tr>{grid[6]}</tr>
            <tr>{grid[7]}</tr>
            <tr>{grid[8]}</tr>        
        </tbody>
        </table>
	    </div>
	    );
    }
}

class Sudoku extends React.Component {
    constructor(props) {
        super(props);

        this.fetchSudoku = this.fetchSudoku.bind(this);
    }

    fetchSudoku() {
        var puzzle = [
            [0,6,0,3,0,0,8,0,4],
            [5,3,7,0,9,0,0,0,0],
            [0,4,0,0,0,6,3,0,7],
            [0,9,0,0,5,1,2,3,8],
            [0,0,0,0,0,0,0,0,0],
            [7,1,3,6,2,0,0,4,0],
            [3,0,6,4,0,0,0,1,0],
            [0,0,0,0,6,0,5,2,3],
            [1,0,2,0,0,9,0,8,0]];
        return puzzle
    }
    
    // returns true if arraySolution is valid, false otherwise
    /*
    checkSolution() {
        var arraySolution = store.getState()
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
    */

    newSudoku () {
        var newSudoku = this.fetchSudoku()
        //apply changes to board
    }

    render() {
        return ( 
            <div >
                <h1>React/Redux Sudoku App</h1>
                <Grid gridNums={this.fetchSudoku()}  />
                <div className='inline'>
                    <button className='bottomButtons'>New Sudoku</button>
                    <button className='bottomButtons'>Check Solution</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Sudoku />
    </Provider>,
    document.getElementById('root')
);