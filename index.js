// Creating a range out of 2 inputs.
const range = (start = 0, end = 0) => {
  const size = end - start + 1;
  return [...Array(size).keys()].map((i) => i + start);
};

// Removing exclude numbers from include numbers.
const includeExclude = (inc, exc) => {
  const includeArr = inc.sort((a, b) => a - b);
  const excludeArr = exc.sort((a, b) => a - b);

  let includeRes = [];
  let excludeRes = [];

  includeArr.forEach((numRange) => {
    numRange.forEach((number) =>
      !includeRes.includes(number)
        ? includeRes.push(number)
        : console.log("skipped duplicate")
    );
  });

  excludeArr.forEach((numRange) => {
    numRange.forEach((number) =>
      !excludeRes.includes(number)
        ? excludeRes.push(number)
        : console.log("skipped duplicate")
    );
  });

  return includeRes.filter((number) => {
    return !excludeRes.includes(number);
  });
};

// Setting up some frontend for data representation.
let include = "";
let exclude = "";
const includeInput = document.getElementById("input-include");
const excludeInput = document.getElementById("input-exclude");
const button = document.getElementById("btn");
const output = document.getElementById("output");

const bindInclude = (e) => {
  include = e.target.value;
};

const bindExclude = (e) => {
  exclude = e.target.value;
};

// Translate input string to a range of numbers.
const translateToRange = (input) => {
  if (input !== "") {
    try {
      input = input.split(" ");
      return input.map((rangeToBe) => {
        rangeToBe = rangeToBe.split("-");
        return range(parseInt(rangeToBe[0]), parseInt(rangeToBe[1]));
      });
    } catch {
      alert("Please enter in the correct format");
      return [];
    }
  } else {
    return [];
  }
};

// Getting the final array of numbers.
const getResult = () => {
  const includeRange = translateToRange(include);
  const excludeRange = translateToRange(exclude);

  return includeExclude(includeRange, excludeRange).sort((a, b) => a - b);
};

// Pasting to the output div.
const pasteOutput = () => {
  output.innerHTML = "";
  const result = document.createElement("p");

  const t0 = performance.now();
  result.innerText = getResult();
  const t1 = performance.now();

  const timer = document.getElementById("timer");
  timer.innerText = `Calculation executed in ${(t1 - t0) / 1000} seconds`;

  output.appendChild(result);
};

// Main function for adding eventlisteners and readability.
const main = () => {
  includeInput.addEventListener("change", bindInclude);
  excludeInput.addEventListener("change", bindExclude);
  button.addEventListener("click", pasteOutput);
};

main();
