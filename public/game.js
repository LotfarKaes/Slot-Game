const symbols = [
  document.querySelector('#sym-1'),
  document.querySelector('#sym-2'),
  document.querySelector('#sym-3'),
];

const title = document.querySelector('#title');

const button = document.querySelector('#request-button');

const showOutcome = data => {
  title.innerText = data.win;

  for (let i of [0, 1, 2]) {
    let sym = symbols[i];
    let int = data.outcome[i];
    sym.src = `img/Symbol_${int}.png`;
  }
};

const request = () => {
  button.disabled = true;

  fetch('/outcome')
    .then(resp => resp.json())
    .then(data => {
      showOutcome(data);

      if (data.bonus) {
        setTimeout(() => {
          title.innerText = 'Bonus!';
          setTimeout(request, 1000)
        }, 1000)
      } else {
        button.disabled = false;
      }

    })
};
button.onclick = request;