
const modalWin = (game) => {

	var btnStart = document.querySelector('.js-start'),
	modalWin = document.querySelector('.js-modal');

	btnStart.addEventListener('click', () => {

		modalWin.classList.add('close');

		game.start();

		

	});

}



export default modalWin;
