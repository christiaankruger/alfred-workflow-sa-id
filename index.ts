import * as alfy from 'alfy';
import { randomSAId } from './generator';

const input = alfy.input;
const random = randomSAId(parseFloat(input) || undefined);

alfy.output([
  {
    title: random.formatted,
    subtitle: `${random.age} year old ${
      random.gender === 0 ? 'female' : 'male'
    } | ${random.result}`,
    // Allows us to pass it to the clipboard
    arg: random.result
  }
]);
