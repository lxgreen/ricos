---
id: translatables_api
title: Translatables
sidebar_label: Translatables
---

## Translatables API

`Translation API` provides methods for translatable fragment extraction and replacement within a `RichContent` instance.

`toTanslatables: (content: RichContent) => Translatable[]`

`translateContent: (content: RichContent, translatables: Translatable[]) => RichContent`

where `Translatable` consists of `text` and some metadata fields required for translation fragment replacement.

For the purpose of translating content, there are 3 stages that you should follow:

1. **Extraction**: getting a `Translatable[]` from a `RichContent` object
2. **Translation**: modifying the `Translatable[]` with translated values
3. **Application**: applying the modified `Translatable[]` array into a `RichContent` object

:::note
Ricos does not provide a Translation service. Hence, stage 2 is up to your implementation
:::

### Example

```ts
import { translateToSpanish } from '3rd-party-translation-service';
import { toTranslatables, translateContent } from 'ricos-content/libs/translate';

function translate(translatables: Translatable[]) {
  return translatables.map(t => ({ ...t, text: translateToSpanish(t.text) }));
}

const english: RichContent = { ... };

const englishChunks: Translatable[] = toTranslatables(english);

const spanishChunks = translate(englishChunks);

const spanish: RichContent = translateContent(english, spanishChunks);
```
