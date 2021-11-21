const players = (num) => {
    const getNumber = () => num;
    return { num }
}

const board = (() => {
    let boardArray = Array.apply(null, Array(9)).map(function () {})

    //loads in the board and appends it as children to parent
    const parent = document.querySelector(".field")
    const load = () => {
        //resets the board
        boardArray = Array.apply(null, Array(9)).map(function () {})
        const children = Array.from(parent.childNodes)
        children.forEach(child => {
            child.remove()
        })

        //generates a new board
        for(let i=0; i<3; i++){
            const row = document.createElement("div")
            row.classList.add("row")
            for(let j=0; j<3; j++){
                const tile = document.createElement("div")
                tile.classList.add("tile")
                tile.id = 3*i + j
                tile.onclick = function() {
                    game.makeMove(this)
                }
                row.appendChild(tile)
            }
            parent.appendChild(row)
        }
    }

    const changeTile = (tile, symbol) => {
        tile.textContent = symbol
    }

    const changeBoardArray = (id, value) => {
        boardArray[id] = value
    }

    const getBoardArray = () => {
        return boardArray
    }

    return {
        load,
        changeTile,
        changeBoardArray,
        getBoardArray,
    }
})()

const game = (() => {
    board.load()

    const player0 = players(0)
    const player1 = players(1)
    let activePlayer = player0;

    const changePlayer =  () => {
        if(activePlayer === player0) {
            activePlayer = player1
        } else {
            activePlayer = player0
        }
    }

    const makeMove = (tile) => {
        if(tile.textContent == "") {
            if(activePlayer === player0) {
                board.changeTile(tile, "X")
                board.changeBoardArray(tile.id, "X")
            } else {
                board.changeTile(tile, "O")
                board.changeBoardArray(tile.id, "O")
            }
            if(!checkWin()){
                if(board.getBoardArray().indexOf(undefined) == -1) {
                    alert("Its a draw")
                    board.load()
                    activePlayer = player1
                }
            }
            changePlayer()
        }
    }

    const checkWin = () => {
        field = board.getBoardArray()
        //checks for a win on the horizontals
        for(let i=0; i<3; i++){
            if(field[i*3] != undefined) {
                if(field[i*3] == field[i*3+1] && field[i*3+1] == field[i*3+2]){
                    endGame()
                    return true
                }
            }
        }

        //checks for a win on the horizontals
        for(let i=0; i<3; i++){
            if(field[i] != undefined) {
                if(field[i] == field[i+3] && field[i+3] == field[i+6]){
                    endGame()
                    return true
                }
            }
        }

        //checks for the diagoanls
        if(field[0] != undefined) {
            if(field[0] == field[4] && field[4] == field[8]) {
                endGame()
                return true
            }
        }
        if(field[2] != undefined){
            if(field[2] == field[4] && field[4] == field[6]) {
                endGame()
                return true
            }
        }
        return false
    }

    const endGame = () => {
        if(activePlayer === player0) {
            alert("Player 1 has won")
        } else {
            alert("Player 2 has won")
        }
        board.load()
        activePlayer = player1
    }

    return {
        makeMove,
    }
})()