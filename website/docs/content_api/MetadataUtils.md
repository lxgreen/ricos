---
id: metadata_utils_api
title: Metadata Utilities
sidebar_label: Metadata Utilities
---

## Metadata Utilities

### `ensureContentId`

Ensure that a given `RichContent` object contains an id by generating one (if not exist) or leaving it as is (if it does).

If no content is provided, an empty content with a new id is generated.

#### Example

```ts
import { ensureContentId } from 'ricos-content/libs/metadata-utils';
import { someContent } from 'somwhere'; // content without ID:

const content1: RichContent = ensureContentId();
// => Empty content with ID

const content2: RichContent = ensureContentId(someContent);
// = `someContent` with newly generated ID

const content3: RichContent = ensureContentId(content2);
// = `content2` (identical)
```

### `extractIdFromContent`

For a given content, it will extract the `id` from it. If not exists, `undefined` will be returned.

#### Example

```ts
import { extractIdFromContent } from 'ricos-content/libs/metadata-utils';
import { someContentWithId } from 'somwhere';
import { someContentWithoutId } from 'somwhere';

const id1: string = extractIdFromContent(someContentWithId);
// = 7bb38a7a-70b7-9cf3-fc80-584205694465

const id2: string = extractIdFromContent(someContentWithoutId);
// => undefined
```

### `createEmptyContent`

Creates an empty, valid `RichContent` object

#### Example

```ts
import { createEmptyContent } from 'ricos-content/libs/createEmptyContent';

const content: RichContent = createEmptyContent();
```

### `duplicate`

Duplicates a `RichContent` object, with a newly generated `id`.

#### Example

```ts
import { duplicate } from 'ricos-content/libs/duplicate';
import { someContent } from 'somewhere';

const content: RichContent = duplicate(someContent);

assert(content.nodes).equals(someContent.nodes);
// => true

assert(content.metadata.version).equals(someContent.metadata.version);
// => true

assert(content.metadata.id).equals(someContent.metadata.id);
// => false
```
