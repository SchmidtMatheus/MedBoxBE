import { Injectable } from '@nestjs/common';
import { ConfigsService } from './configs/configs.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigsService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async defuzzify(temperatura): Promise<number> {
    const FuzzySet = /** @class */ (function () {
      function FuzzySet(name, min, midMin, midMax, max) {
        this.name = name;
        this.min = min;
        this.midMin = midMin;
        this.midMax = midMax;
        this.max = max;
      }
      return FuzzySet;
    })();

    const objetoBanco = await this.configService.findOne(2);
    const { temperature, offset } = objetoBanco;

    const temperatureSets = [
      new FuzzySet(
        'very low',
        temperature,
        temperature,
        temperature,
        temperature + 0.15 * offset,
      ),
      new FuzzySet(
        'low',
        temperature + 0.15 * offset,
        temperature + 0.3 * offset,
        temperature + 0.3 * offset,
        temperature + 0.45 * offset,
      ),
      new FuzzySet(
        'medium',
        temperature + 0.45 * offset,
        temperature + 0.6 * offset,
        temperature + 0.6 * offset,
        temperature + 0.75 * offset,
      ),
      new FuzzySet(
        'hot',
        temperature + 0.75 * offset,
        temperature + 0.9 * offset,
        temperature + 0.9 * offset,
        temperature + offset,
      ),
      new FuzzySet(
        'very hot',
        temperature + offset,
        temperature + offset,
        temperature + offset,
        temperature + offset,
      ),
    ];

    const pwmSets = [
      new FuzzySet('fan off', 102, 102, 123.85, 123.85),
      new FuzzySet('low speed', 123.85, 145.7, 145.7, 167.55),
      new FuzzySet('medium speed', 167.55, 189.4, 189.4, 211.25),
      new FuzzySet('fast speed', 211.25, 233.1, 233.1, 255),
      new FuzzySet('fan on max', 255, 255, 255, 255),
    ];

    const tempSet = temperatureSets.find(function (set) {
      return temperatura >= set.min && temperatura <= set.max;
    });

    if (tempSet === undefined) {
      if (temperatura < temperature) {
        console.log(temperatura);
        return 0;
      } else {
        return 255;
      }
    }

    const index = temperatureSets.indexOf(tempSet);
    const pwmSet = pwmSets[index];
    const pwm = (pwmSet.min + pwmSet.midMin + pwmSet.midMax + pwmSet.max) / 4;

    console.log('temperatura:', temperatura);
    console.log('pwm:', pwm);
    return Math.round(pwm);
  }
}
