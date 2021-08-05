import {
  createNodeExtension,
  createMarkExtension,
  createGenericExtension,
} from './extensionCreators';
const createConfig = () => ({ name: 'test' });
describe('Tiptap Extension Creators', () => {
  it('"createNodeExtension" should add "node" type', () => {
    const x = createNodeExtension({ createConfig });
    expect(x).toStrictEqual({ createConfig, type: 'node' });
  });
  it('"createMarkExtension" should add "mark" type', () => {
    const x = createMarkExtension({ createConfig });
    expect(x).toStrictEqual({ createConfig, type: 'mark' });
  });
  it('"createGenericExtension" should add "extension" type', () => {
    const x = createGenericExtension({ createConfig });
    expect(x).toStrictEqual({ createConfig, type: 'extension' });
  });
});
