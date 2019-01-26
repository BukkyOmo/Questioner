/* eslint-disable func-names */
// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementsByClassName('myBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

for (let i = 0; i < btn.length; i += 1) {
	btn[i].addEventListener('click', () => {
		modal.style.display = 'block';
	});
}

// When the user clicks on <span> (x), close the modal
// eslint-disable-next-line func-names
span.onclick = function () {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
// eslint-disable-next-line func-names
window.onclick = function (event) {
	// eslint-disable-next-line eqeqeq
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
