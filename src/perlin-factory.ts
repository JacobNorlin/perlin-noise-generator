import { PerlinNoise } from "./perlin";
import { statistics } from "./util/statistics";

export class PerlinFactory {
  private generateNoiseMap(
    width: number,
    height: number,
    octaves: number,
    frequency: number,
    noiseGenerators: PerlinNoise[]
  ) {
    //width* height size
    const data: number[][][] = [];

    let min = noiseGenerators.map((_) => Infinity);
    let max = noiseGenerators.map((_) => -Infinity);

    let amplitude = 5;

    for (let octave = 0; octave < octaves; octave++) {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (!data[i]) {
            data[i] = [];
            for (let k = 0; k < width; k++) {
              data[i][k] = noiseGenerators.map((_) => 0);
            }
          }

          for (let k = 0; k < noiseGenerators.length; k++) {
            const gen = noiseGenerators[k];
            const noise = gen.noise((i * frequency) / width, (j * frequency) / height);
            data[i][j][k] += noise;
            min[k] = Math.min(min[k], data[i][j][k]);
            max[k] = Math.max(max[k], data[i][j][k]);
          }
        }
      }
      frequency = frequency * 2;
      amplitude = amplitude / 2;
    }

    //Normalize the output
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        for (let k = 0; k < noiseGenerators.length; k++) {
          data[i][j][k] = (data[i][j][k] - min[k]) / (max[k] - min[k]);
        }
      }
    }

    return data;
  }

  public getNormalNoiseMap(
    width: number,
    height: number,
    octaves: number,
    frequency: number,
    dims = 1
  ) {
    const generators: PerlinNoise[] = [];
    for (let i = 0; i < dims; i++) {
      generators.push(new PerlinNoise(() => statistics.sampleNormal(10, 100)));
    }

    return this.generateNoiseMap(width, height, octaves, frequency, generators);
  }

  public getPoissonNoiseMap(
    width: number,
    height: number,
    octaves: number,
    frequency: number,
    dims = 1
  ) {
    const generators: PerlinNoise[] = [];
    for (let i = 0; i < dims; i++) {
      generators.push(new PerlinNoise(() => statistics.samplePoisson(10)));
    }

    return this.generateNoiseMap(width, height, octaves, frequency, generators);
  }
}
