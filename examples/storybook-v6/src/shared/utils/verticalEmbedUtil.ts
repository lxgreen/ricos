import mockProductsData from './mockProductsData';
import mockEventsData from './mockEventsData';
import mockBookingsData from './mockBookingsData';
import { verticalEmbedProviders } from 'wix-rich-content-plugin-vertical-embed';

const { event, booking, product } = verticalEmbedProviders;
const mockDataMap = {
  [event]: mockEventsData,
  [booking]: mockBookingsData,
  [product]: mockProductsData,
};

const mockFetchVerticalEmbed = (vertical: 'event' | 'booking' | 'product') => {
  return Promise.resolve(mockDataMap[vertical]);
};

export class MockVerticalSearchModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Promise<any[]>;

  constructor(verticalType: 'event' | 'booking' | 'product') {
    this.items = mockFetchVerticalEmbed(verticalType);
  }

  search(searchInput: string) {
    return this.items.then(res =>
      res.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
  }
}

export const MockGetIsVisiblePromise = (type, _locale) => {
  if (type === product || type === booking || type === event) {
    return Promise.resolve(true);
  }

  return Promise.resolve(false);
};
