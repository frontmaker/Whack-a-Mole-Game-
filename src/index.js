import './style/main.scss';



class MoleGame {
    constructor() {


        this.holes = document.querySelectorAll('.hole');
        this.scoreBoard = document.querySelector('.score');
        this.moles = document.querySelectorAll('.mole');
        this.lastHole = '';
        this.score = 0;
        this.timeUp = false;


    }


    randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);

        const hole = this.holes[idx];

        if (hole === this.lastHole) {
            return this.randomHole(holes);
        }

        this.lastHole = hole;

        return hole;
    }

    finish(time) {
        setTimeout(() => {
            this.timeUp = true;
        }, time)
    }


    handleBonk() {


    	this.moles.forEach((mole) => mole.addEventListener('click', function(e) {

    		if (!e.isTrusted) return;

    		updateScore();

    		this.classList.remove('up');

    	}));


    	const updateScore = () => {
    		this.scoreBoard.textContent++;
    	}

    }


    peep() {
        const time = this.randomTime(200, 1000);
        const hole = this.randomHole(this.holes);

        hole.classList.add('up');

        setTimeout(() => {

            hole.classList.remove('up');

            if (!this.timeUp) this.peep();

            this.finish(10000);

        }, time);
    }





    start() {

        this.randomHole(this.holes);
        this.handleBonk();
        this.peep();
    }
}


const game = new MoleGame();

game.start();
