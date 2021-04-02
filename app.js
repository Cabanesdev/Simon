const startbtn = document.getElementById('Startbtn');
const lightblue = document.getElementById('lightblue');
const violet = document.getElementById('violet');
const orange = document.getElementById('orange');
const green = document.getElementById('green');
const lastLevel = 10;

class Game {
	constructor() {
		this.initialize = this.initialize.bind(this);
		this.initialize();
		this.generateSequence();
		setTimeout(this.nextLevel(), 500);
	}

	initialize() {
		this.nextLevel = this.nextLevel.bind(this);
		this.chooseColors = this.chooseColors.bind(this);
		this.toggleStartBtn();
		this.level = 1;
		this.colors = {
			lightblue,
			violet,
			orange,
			green,
		};
	}

	toggleStartBtn() {
		if (startbtn.classList.contains('hide')) {
			startbtn.classList.remove('hide');
		} else {
			startbtn.classList.add('hide');
		}
	}

	generateSequence() {
		this.sequence = new Array(lastLevel)
			.fill(0)
			.map((n) => Math.floor(Math.random() * 4));
	}

	nextLevel() {
		this.subLevel = 0;
		this.illuminateSequence();
		this.addClickEvents();
	}

	transformNumberToColor(number) {
		switch (number) {
			case 0:
				return 'lightblue';
			case 1:
				return 'violet';
			case 2:
				return 'orange';
			case 3:
				return 'green';
		}
	}

	transformColorToNumber(color) {
		switch (color) {
			case 'lightblue':
				return 0;
			case 'violet':
				return 1;
			case 'orange':
				return 2;
			case 'green':
				return 3;
		}
	}

	illuminateSequence() {
		for (let i = 0; i < this.level; i++) {
			const color = this.transformNumberToColor(this.sequence[i]);
			console.log(color);
			setTimeout(() => this.illuminateColor(color), 1000 * i);
		}
	}

	illuminateColor(color) {
		this.colors[color].classList.add('light');
		setTimeout(() => this.turnOffColor(color), 350);
	}

	turnOffColor(color) {
		this.colors[color].classList.remove('light');
	}

	addClickEvents() {
		this.colors.lightblue.addEventListener('click', this.chooseColors);
		this.colors.violet.addEventListener('click', this.chooseColors);
		this.colors.orange.addEventListener('click', this.chooseColors);
		this.colors.green.addEventListener('click', this.chooseColors);
	}

	deleleClickEvents() {
		this.colors.lightblue.removeEventListener('click', this.chooseColors);
		this.colors.violet.removeEventListener('click', this.chooseColors);
		this.colors.orange.removeEventListener('click', this.chooseColors);
		this.colors.green.removeEventListener('click', this.chooseColors);
	}

	chooseColors(ev) {
		const colorName = ev.target.dataset.color;
		const colorNumber = this.transformColorToNumber(colorName);
		this.illuminateColor(colorName);
		if (colorNumber === this.sequence[this.subLevel]) {
			this.subLevel++;
			if (this.subLevel === this.level) {
				this.level++;
				this.deleleClickEvents();
				if (this.level === lastLevel + 1) {
					this.winTheGame();
				} else {
					setTimeout(this.nextLevel, 1500);
				}
			}
		} else {
			this.lostTheGame();
		}
	}

	winTheGame() {
		swal('Simon Says', 'Congratulations you have won the game', 'success').then(
			this.initialize
		);
	}

	lostTheGame() {
		swal('Simon Says', 'Im sorry you have lost :(', 'error').then(() => {
			this.deleleClickEvents();
			this.initialize();
		});
	}
}
function startGame() {
	window.game = new Game();
}
