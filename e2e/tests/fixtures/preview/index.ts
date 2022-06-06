import example1 from './example1.json';
import example2 from './example2.json';
import example3 from './example3.json';
import example4 from './example4.json';
import example5 from './example5.json';
import example6 from './example6.json';
import example7 from './example7.json';
import example8 from './example8.json';
import example9 from './example9.json';
import example10 from './example10.json';

export const fixtures = {
  example1,
  example2,
  example3,
  example4,
  example5,
  example6,
  example7,
  example8,
  example9,
  example10,
};

const fixturesNames = [
  'Small content', //1
  'Small content + style', //2
  'ReadMore (lines > 3)', //3
  'ReadMore + 1x Image', //4
  'ReadMore + 2x Image', //5
  'ReadMore + 5x Image', //6
  'ReadMore + 5x Image + Text in-between', //7
  'ReadMore + 1x Gif + 5x Image', //8
  'ReadMore + 1x Vid + 1x Gif + 5x Image', //9
  'ReadMore + 2x Vid + 1x Gif + 5x Image', //10
  'Text Fragmentation Example', //11
];

export default fixturesNames;
