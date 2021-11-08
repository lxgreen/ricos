import { merge, cloneDeep } from 'lodash';
import { poll, votes, voter } from './poll-mocks-data';

export class SocialPollsServiceMock {
  private poll = poll;

  private votes = votes;

  fetchPoll(_pollId) {
    return Promise.resolve(this.poll);
  }

  updatePoll(question) {
    this.poll = merge(this.poll, question);
    return Promise.resolve(this.poll);
  }

  vote(_pollId, optionId) {
    if (optionId) {
      this.votes = cloneDeep(votes);
      const { count, options } = poll;
      const pollCount = count + 1;
      const updatedOptions = options.map(option =>
        option.id === optionId
          ? {
              ...option,
              count: option.count + 1,
              rating: ((option.count + 1) / pollCount) * 100,
              latestVoters: option.latestVoters.concat([poll.createdBy]),
            }
          : { ...option, count: option.count, rating: (option.count / pollCount) * 100 }
      );
      this.poll = { ...this.poll, count: pollCount, options: updatedOptions };
      this.votes[optionId].voters.push(voter);
    }
    return Promise.resolve(this.poll);
  }

  getVoters(_pollId, _optionId, _params) {
    return Promise.resolve(this.votes[_optionId]);
  }
}
