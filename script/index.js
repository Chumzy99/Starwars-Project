const characterName = [...document.querySelectorAll(".name")];
const mainDiv = document.querySelector(".main");
const closeBtn = document.querySelector(".close-btn");
const parent = document.querySelector(".popup");

const renderCharacter = function (results) {
  const html = `
            <div class="parent">
                <div class="popup">
                    <ul class="popup-content">
                    <li><i class="far fa-times-circle close-btn"></i></li>
                    <li>Name: ${results.name}</li>
                    <li>Gender: ${
                      results.gender === "n/a" ? "humanoid" : results.gender
                    }</li>
                    <li>Height: ${results.height} ${"meters"}</li>
                    </ul>
                </div>
            </div>
        `;

  mainDiv.insertAdjacentHTML("afterbegin", html);
};

const renderError = function (error) {
  const errorMessage = `
              <div class="parent">
                  <div class="popup">
                      <ul class="popup-content">
                      <li><i class="far fa-times-circle close-btn"></i></li>
                      <li>${error}</li>
                  </div>
              </div>
          `;

  mainDiv.insertAdjacentHTML("afterbegin", errorMessage);
};

const main = async function () {
  try {
    const response = await fetch(`https://swapi.dev/api/people`);
    if (!response.ok) throw new Error(`Characters Not Found, Server issues`);
    console.log(response);

    const { results } = await response.json();

    characterName.forEach((el) =>
      el.addEventListener("click", function () {
        let inputValue = el.textContent;
        const data = results.filter((el) => el.name === inputValue);
        renderCharacter(data[0]);
      })
    );
  } catch (err) {
    characterName.forEach((el) =>
      el.addEventListener("click", function () {
        renderError(err);
      })
    );
    console.error(err.message);
  }
};
main();

mainDiv.addEventListener("click", function (e) {
  let targetElement = e.target;
  let selector = "i";

  if (targetElement.matches(selector)) {
    e.target.closest("div").parentNode.remove();
  }
});

// const autocorrect = input => {
//     const inputCopy = input.slice().toLowerCase()
//     const words = inputCopy.split(' ');

//     const autoCorrectedSentence = [];

//     words.forEach (el => {
//       if(el.length === 1 && el === 'u')  autoCorrectedSentence.push('your client');
//       if(el.length === 2 && el === 'u.') autoCorrectedSentence.push('your client');
//       if(el.length === 3 && el === 'you') autoCorrectedSentence.push('your client');
//       if(el.length === 4 && el === 'you.') autoCorrectedSentence.push('your client');
//       if(el.startsWith('y') && el.endsWith('u') ) autoCorrectedSentence.push('your client');
//       else autoCorrectedSentence.push(el);
//     })

//     return autoCorrectedSentence.join(' ');
//   };
