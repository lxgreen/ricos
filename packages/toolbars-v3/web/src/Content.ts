import EventEmitter from './lib/EventEmitter';

export class Content extends EventEmitter {
  static EVENTS = {
    contentChangeEvent: 'contentChange',
  };

  private constructor(private content) {
    super();
  }

  private resolved = {};

  resolve(contentResolver) {
    if (this.resolved[contentResolver.id]) {
      return this.resolved[contentResolver.id];
    } else {
      this.resolved[contentResolver.id] = contentResolver.resolve(this.content);
    }
    return this.resolved[contentResolver.id];
  }

  update(content) {
    this.content = content;
    this.resolved = {};
    this.emit(Content.EVENTS.contentChangeEvent);
  }

  get value() {
    return this.content;
  }

  isEmpty() {
    return !!this.content;
  }

  static create(content) {
    return new Content(content);
  }
}
