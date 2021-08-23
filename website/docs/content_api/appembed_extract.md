---
id: appembed_extract
title: AppEmbed Data Extractor
sidebar_label: AppEmbed Data Extractor
---

The AppEmbed Data Extractor provides access to AppEmbed related content regardless of its nesting level.

The `extractAppEmbedData` API accepts `RichContent` object, and exposes the available AppEmbed data as array:

```ts
 extractAppEmbedData = (content: RichContent) => {
  type: PRODUCT | EVENT | BOOKING;
  id?: string;
  url?: string;

  bookingData?: {
    durations?: string;
  }

  eventData?: {
    scheduling?: string;
    location?: string;
  }
 }[]
```
