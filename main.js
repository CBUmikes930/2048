const default_color = "#acbff3"

let game_data = []

score = 0

function newGame() {
    // Get the game board (table) element
    let game_board = document.getElementById("game_board")
    // Clear the previous gameboard
    game_board.innerHTML = ""
    game_data = []
    // For the selected number of rows/cols
    for (let i = 0; i < 4; i++) {
        // Create a new row
        row = document.createElement("tr")
        game_data[i] = []
        for (let j = 0; j < 4; j++) {
            // Create a new cell
            col = document.createElement("td")
            // Assign an ID with the given grid coords
            col.setAttribute("id", j + "-" + i)
            col.style.backgroundColor = default_color
            col.style.top = (85 * i) + "px"
            col.style.left = (85 * j) + "px"
            // Add the new cell to the row
            row.appendChild(col)
            game_data[i][j] = 0
        }
        // Add the new row to the game board
        game_board.appendChild(row)
    }

    addNewTile()
    addNewTile()
    score = 0
}

function addNewTile() {
    // Pick a random cell
    let x = Math.floor(Math.random() * 4)
    let y = Math.floor(Math.random() * 4)

    // If the cell already has a tile
    if (game_data[x][y] > 0) {
        // Pick another cell
        addNewTile()
    } else {
        // 10% Chance of being a 4, otherwise, a 2
        let number = Math.floor(Math.random() * 10) == 9 ? 4 : 2
        game_data[x][y] = number
        document.getElementById(y + "-" + x).innerHTML = number
        document.getElementById(y + "-" + x).style.backgroundColor = getColor(number)
        document.getElementById(y + "-" + x).style.color = "#00000000"
        
        let opactiy = 0
        let id = setInterval(frame, 5)
        function frame() {
            if (opactiy >= 255) {
                clearInterval(id)
            } else {
                document.getElementById(y + "-" + x).style.color = "#000000" + opactiy.toString(16)
                opactiy += 10
            }
        }
    }
}

function moveTiles(e) {
    let old_data = game_data.toString()
    switch (e.key) {
        case "w":
            for (let i = 0; i < 4; i++) {
                let col = []
                let did_combine = false
                for (let j = 0; j < 4; j++) {
                    if (col[col.length - 1] == game_data[j][i] && !did_combine) {
                        col[col.length - 1] += game_data[j][i]
                        did_combine = true
                        score += col[col.length - 1]
                        
                        combinedAnimation(document.getElementById(i + "-" + (col.length - 1)))
                    } else if (game_data[j][i] > 0) {
                        col.push(game_data[j][i])
                        did_combine = false
                    }
                }
                for (let j = 0; j < 4; j++) {
                    let number = col[j] ? col[j] : 0
                    game_data[j][i] = number
                    document.getElementById(i + "-" + j).innerHTML = number > 0 ? number : ""
                    document.getElementById(i + "-" + j).style.backgroundColor = getColor(number)
                }
            }
            break
        case "a":
            for (let i = 0; i < 4; i++) {
                let col = []
                let did_combine = false
                for (let j = 0; j < 4; j++) {
                    if (col[col.length - 1] == game_data[i][j] && !did_combine) {
                        col[col.length - 1] += game_data[i][j]
                        did_combine = true
                        score += col[col.length - 1]
                        
                        combinedAnimation(document.getElementById((col.length - 1) + "-" + i))
                    } else if (game_data[i][j] > 0) {
                        col.push(game_data[i][j])
                        did_combine = false
                    }
                }
                for (let j = 0; j < 4; j++) {
                    let number = col[j] ? col[j] : 0
                    game_data[i][j] = number
                    document.getElementById(j + "-" + i).innerHTML = number > 0 ? number : ""
                    document.getElementById(j + "-" + i).style.backgroundColor = getColor(number)
                }
            }
            break
        case "s":
            for (let i = 3; i >= 0; i--) {
                let col = []
                let did_combine = false
                for (let j = 3; j >= 0; j--) {
                    if (col[col.length - 1] == game_data[j][i] && !did_combine) {
                        col[col.length - 1] += game_data[j][i]
                        did_combine = true
                        score += col[col.length - 1]
                        
                        combinedAnimation(document.getElementById(i + "-" + (4 - col.length)))
                    } else if (game_data[j][i] > 0) {
                        col.push(game_data[j][i])
                        did_combine = false
                    }
                }
                let index = 0
                for (let j = 3; j >= 0; j--) {
                    let number = col[index] ? col[index++] : 0
                    game_data[j][i] = number
                    document.getElementById(i + "-" + j).innerHTML = number > 0 ? number : ""
                    document.getElementById(i + "-" + j).style.backgroundColor = getColor(number)
                }
            }
            break
        case "d":
            for (let i = 3; i >= 0; i--) {
                let col = []
                let did_combine = false
                for (let j = 3; j >= 0; j--) {
                    if (col[col.length - 1] == game_data[i][j] && !did_combine) {
                        col[col.length - 1] += game_data[i][j]
                        did_combine = true
                        score += col[col.length - 1]
                        
                        combinedAnimation(document.getElementById((4 - col.length) + "-" + i))
                    } else if (game_data[i][j] > 0) {
                        col.push(game_data[i][j])
                        did_combine = false
                    }
                }
                let index = 0
                for (let j = 3; j >= 0; j--) {
                    let number = col[index] ? col[index++] : 0
                    game_data[i][j] = number
                    document.getElementById(j + "-" + i).innerHTML = number > 0 ? number : ""
                    document.getElementById(j + "-" + i).style.backgroundColor = getColor(number)
                }
            }
            break
        default:
            return
    }
    if (old_data !== game_data.toString()) {
        addNewTile()
        updateScore()
    }
}

function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score
}

function getColor(number) {
    if (number == 0) return default_color
    let comps = [172, 191, 243]

    let x = 1
    while (Math.pow(2, x) !== number) {
        x++
    }

    comps[0] = Math.floor(comps[0] * Math.pow(0.9, x)).toString(16)
    comps[1] = Math.floor(comps[1] * Math.pow(0.9, x)).toString(16)
    comps[2] = (comps[2] - (x * 1)).toString(16)
    return "#" + comps.join("")
}

function combinedAnimation(target) {
    let x = 0
    let scale = 75
    let id = setInterval(frame, 5)
    function frame() {
        if (x >= 180) {
            target.style.height = scale + "px"
            target.style.width = scale + "px"
            clearInterval(id)
        } else {
            let radians = x * Math.PI / 180
            x += 10
            target.style.height = scale * (1 + 0.1 * Math.sin(radians)) + "px"
            target.style.width = scale * (1 + 0.1 * Math.sin(radians)) + "px"
        }
    }
}