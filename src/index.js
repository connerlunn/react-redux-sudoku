import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {isValidSudoku} from './sudoku';

//Redux Code
const defaultState = {
    grid: [[]]
};

const reducer = (state = defaultState, action) => {
    if (action.type === "NUM-CHANGE") {
        let newgrid = Object.assign([...state.grid], {
            [action.y]: Object.assign([...state.grid[action.y]], {
              [action.x]: action.value
            })
          })
        return {
            grid: newgrid
        };
    } else if (action.type === 'SET-BOARD'){
        return{
            grid: action.grid
        };
    } else {
        return state;
    }
};

const store = createStore(reducer);

const setBoardAction = (board) => {
    return {
        type: 'SET-BOARD',
        grid: board
    }
};

const numChangeAction = (psx,psy,val) => {
    return {
      type: 'NUM-CHANGE',
      x: psx,
      y: psy,
      value: val,
    }
};

const mapStateToProps = (state) => {
    return { grid: state.grid };
};

const mapDispatchToProps = (dispatch) => {
    return {
        numChange: (x,y,val) => dispatch(
            numChangeAction(x,y,val)
        )
    }
}

//React Code
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.posx,
            y: this.props.posy,
            isGiven: this.props.isGiven,
        };
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        var val = this.props.grid[this.state.y][this.state.x]
        if (val < 9 & val !== '') {
            this.props.numChange(
                this.state.x,
                this.state.y,
                val + 1,
            )
        } else if (val === 9) {
            this.props.numChange(
                this.state.x,
                this.state.y,
                '',
            )
        } else if (val === '') {
            this.props.numChange(
                this.state.x,
                this.state.y,
                1,
            )
        }
    }

    render() {
        if (this.state.isGiven) {
            return (
                <td className="isGiven">
                    {this.props.grid[this.state.y][this.state.x]}
                </td>
            );
        } else {
            return (
                <td>
                    <button className='cell-button' onClick={this.clicked}>
                        {this.props.grid[this.state.y][this.state.x]}
                    </button>
                </td>
            );
        }
    }
}

const Celll = connect(mapStateToProps, mapDispatchToProps)(Cell);

class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var grid = store.getState().grid
        grid = grid.map(
            (row, y) => {
                return row.map(
                    (item, x) => {
                        if(item === '') {
                            //store.dispatch(numChangeAction(x,y,''))
                            return <Celll posx={x} posy={y} isGiven={false}/>
                        } else {
                            return <Celll posx={x} posy={y} isGiven={true}/>
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
            ['', 6,'', 3,'','', 8,'', 4],
            [5 , 3, 7,'', 9,'','','',''],
            ['',4,'','','',6,3,'',7],
            ['',9,'','',5,1,2,3,8],
            ['','','','','','','','',''],
            [7,1,3,6,2,'','',4,''],
            [3,'',6,4,'','','',1,''],
            ['','','','',6,'',5,2,3],
            [1,'',2,'','',9,'',8,'']];

        store.dispatch(setBoardAction(puzzle))
    }
    
    // returns true if arraySolution is valid, false otherwise
    checkSolution() {
        const valid = isValidSudoku(store.grid)
        console.log(valid)
    }

    render() {
        this.fetchSudoku()
        return ( 
            <div >
                <h1>React/Redux Sudoku</h1>
                <Grid />
                <div className='inline'>
                    <button onClick={this.fetchSudoku} className='bottomButtons'>New Sudoku</button>
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