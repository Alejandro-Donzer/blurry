window.onload = () => {
  var slidersDivElement = document.getElementById("sliders_div");
  var contentElement = document.getElementById("content");
  var blurElement = document.getElementById("blur");

  var sliders = [];
  sliders.push(new Slider("b", "Blur (px)", 1, 70, 20));
  sliders.push(new Slider("cl", "Content left (%)", 0, 100, 50));
  sliders.push(new Slider("ct", "Content top (%)", 0, 100, 50));
  sliders.push(new Slider("ch", "Content height (%)", 10, 100, 40));
  sliders.push(new Slider("cw", "Content width (%)", 1, 85, 60));
  sliders.push(new Slider("ctx", "Content translate x (%)", -100, 100, -50));
  sliders.push(new Slider("cty", "Content translate y (%)", -100, 100, -50));

  sliders.forEach(item => {
    var spanElement = document.createElement("span");
    spanElement.textContent = item.value;

    var pElement = document.createElement("p");
    pElement.textContent = item.label;
    pElement.appendChild(spanElement);
    slidersDivElement.appendChild(pElement);

    var sliderElement = document.createElement("input");
    sliderElement.id = item.id;
    sliderElement.type = "range";
    sliderElement.min = item.min;
    sliderElement.max = item.max;
    sliderElement.value = item.value;
    sliderElement.style.width = item.max + "%";
    sliderElement.step = 0.1;
    sliderElement.className = "slider";
    sliderElement.oninput = () => {
      let value = sliderElement.value;
      spanElement.textContent = value;

      switch (sliderElement.id) {
        case "b":
          blurElement.style.webkitFilter = `blur(${value + "px"})`;
          blurElement.style.filter = `blur(${value + "px"})`;
          break;
        case "cl":
          contentElement.style.left = value + "%";
          translateBlur(blurElement);
          break;
        case "ct":
          contentElement.style.top = value + "%";
          translateBlur(blurElement);
          break;
        case "ch":
          contentElement.style.height = value + "%";
          translateBlur(blurElement);
          break;
        case "cw":
          contentElement.style.width = value + "%";
          translateBlur(blurElement);
          break;
        case "ctx":
          let cty = document.getElementById("cty").value + "%";
          contentElement.style.transform = `translate(${value + "%"}, ${cty})`;
          translateBlur(blurElement);
          break;
        case "cty":
          let ctx = document.getElementById("ctx").value + "%";
          contentElement.style.transform = `translate(${ctx}, ${value + "%"})`;
          translateBlur(blurElement);
          break;
      }
    };
    slidersDivElement.appendChild(sliderElement);
  });
};

function translateBlur(blur) {
  let ct = Number(document.getElementById("ct").value);
  let cty = Number(document.getElementById("cty").value);
  let ch = Number(document.getElementById("ch").value);
  let cl = Number(document.getElementById("cl").value);
  let ctx = Number(document.getElementById("ctx").value);
  let cw = Number(document.getElementById("cw").value);
  let x = getTranslateValue(cl, ctx, cw);
  let y = getTranslateValue(ct, cty, ch);
  blur.style.transform = `translate(${x}, ${y})`;
}

function getTranslateValue(a, b, c) {
  return -1 * (a + (b / 100) * c) + "%";
}

class Slider {
  constructor(id, label, min, max, value) {
    this.id = id;
    this.label = label + ": ";
    this.min = min;
    this.max = max;
    this.value = value;
  }
}
