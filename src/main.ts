import "./style.css";
import { PerlinFactory } from "./perlin-factory.ts";

const factory = new PerlinFactory();

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

if (!canvas) {
  throw Error();
}

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const ctx = canvas.getContext("2d")!;

// Variables
let red = 255;
let green = 255;
let blue = 255;
let alpha = 1;

let frequency = 7;
let octaves = 8;
let resolution = 256;

// Input handling
const redInput = document.querySelector<HTMLInputElement>("#red-input")!;
const greenInput = document.querySelector<HTMLInputElement>("#green-input")!;
const blueInput = document.querySelector<HTMLInputElement>("#blue-input")!;
const alphaInput = document.querySelector<HTMLInputElement>("#alpha-input")!;
const freqInput = document.querySelector<HTMLInputElement>("#freq-input")!;
const octaveInput = document.querySelector<HTMLInputElement>("#octave-input")!;
const resolutionInput = document.querySelector<HTMLInputElement>("#resolution-input")!;

function getEventValue(e: Event) {
  const target = e.target as HTMLInputElement;
  const value = Number(target.value);
  return value;
}

redInput.addEventListener("change", (e) => {
  red = getEventValue(e);
  repaint();
});
blueInput.addEventListener("change", (e) => {
  blue = getEventValue(e);
  repaint();
});
greenInput.addEventListener("change", (e) => {
  green = getEventValue(e);
  repaint();
});
alphaInput.addEventListener("change", (e) => {
  alpha = getEventValue(e);
  repaint();
});
freqInput.addEventListener("change", (e) => {
  frequency = getEventValue(e);
  repaint();
});
octaveInput.addEventListener("change", (e) => {
  octaves = getEventValue(e);
  repaint();
});
resolutionInput.addEventListener("change", (e) => {
  resolution = getEventValue(e);
  repaint();
});

function repaint() {
  const noiseMap = factory.getNormalNoiseMap(resolution, resolution, octaves, frequency, 4);

  const sx = WIDTH / resolution;
  const sy = HEIGHT / resolution;
  canvas!.width = canvas!.width

  for (let x = 0; x < noiseMap.length; x++) {
    const row = noiseMap[x];
    for (let y = 0; y < row.length; y++) {
      const [r, g, b, a] = row[y];

      ctx.fillStyle = `rgba(${r * red}, ${g * green}, ${b * blue}, ${a * alpha})`;
      ctx.fillRect(x * sx, y * sy, sx, sy);
    }
  }
}

repaint();
