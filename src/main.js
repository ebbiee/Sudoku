import $ from 'jquery'
import {easyPuzzle, mediumPuzzle,hardPuzzle} from './js/logic';
import {easySolution, mediumSolution, hardSolution} from './js/logic';
import {startTimer} from './js/logic'
import { displayPuzzle } from './js/logic';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

const cells = document.querySelectorAll('.sudoku-cell');
const numberButtons = document.querySelectorAll('.sudoku-options button');
const checkPuzzle = $("#checkbtn")
let selectedCell = null;
let currentSolution = [];

function checkSolution() {
    let isCorrect = true;

    cells.forEach((cell, index) => {
        let rowIndex = Math.floor(index / 9); 
        let colIndex = index % 9; 

        const userInput = cell.textContent === '' ? '' : cell.textContent;

        if (userInput !== currentSolution[rowIndex][colIndex]) {
            cell.style.backgroundColor = '#ffcccc'; 
            isCorrect = false;
        } else {
            cell.style.backgroundColor = '#ccffcc';
        }
    });

    if (isCorrect) {
        alert("Congratulations! You solved the puzzle correctly.");
    } else {
        alert("Some numbers are incorrect. Please check again.");
    }
}






cells.forEach(cell => {
    cell.addEventListener('click', () => {
        selectedCell = cell;
    });
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (selectedCell) {
            selectedCell.textContent = button.textContent;
            selectedCell = null;
        }
    });
});
function generatePuzzle() {
    const buttons = $(".easy, .medium, .hard");
    buttons.each(function() {
        $(this).on("click", function () {
            let selectedValue = $(this).attr("data-value");
            let puzzle;
            startTimer();
            if (selectedValue === 'easy') {
                puzzle = easyPuzzle[Math.floor(Math.random() * easyPuzzle.length)];
                currentSolution = easySolution[easyPuzzle.indexOf(puzzle)].map(row => row.split(''));
                console.log(currentSolution)
            } else if (selectedValue === 'medium') {
                puzzle = mediumPuzzle[Math.floor(Math.random() * mediumPuzzle.length)];
                currentSolution = mediumSolution[mediumPuzzle.indexOf(puzzle)].map(row => row.split(''));
            } else if (selectedValue === 'hard') {
                puzzle = hardPuzzle[Math.floor(Math.random() * hardPuzzle.length)];
                currentSolution = hardSolution[hardPuzzle.indexOf(puzzle)].map(row => row.split(''));
            }
            displayPuzzle(puzzle);
        });
    });
}

checkPuzzle.on("click", checkSolution);
generatePuzzle()