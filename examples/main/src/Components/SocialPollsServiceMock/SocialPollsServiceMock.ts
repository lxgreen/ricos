import { merge } from 'lodash';
import { poll, voters } from './poll-mocks-data';

export class SocialPollsServiceMock {
  fetchPoll(_pollId) {
    return Promise.resolve(poll);
  }

  createPoll(question) {
    return Promise.resolve(merge(poll, question));
  }

  updatePoll(question) {
    return Promise.resolve(merge(poll, question));
  }

  vote(_pollId, optionId) {
    const { count, options } = poll;
    const pollCount = count + 1 || 1;
    const updatedOptions = options.map(option =>
      option.id === optionId
        ? { ...option, count: option.count + 1, rating: ((option.count + 1) / pollCount) * 100 }
        : option
    );
    const updatedPoll = { ...poll, count: pollCount, options: updatedOptions };
    return Promise.resolve(updatedPoll);
  }

  unvote(_pollId, optionId) {
    const { count, options } = poll;
    const pollCount = count - 1 || 1;
    const updatedOptions = options.map(option =>
      option.id === optionId
        ? { ...option, count: option.count - 1, rating: ((option.count - 1) / pollCount) * 100 }
        : option
    );
    const updatedPoll = { ...poll, count: pollCount, options: updatedOptions };
    return Promise.resolve(updatedPoll);
  }

  getVoters(_pollId, _optionId, _params) {
    return Promise.resolve(voters);
  }
}
