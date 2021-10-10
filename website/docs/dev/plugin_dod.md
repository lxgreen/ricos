---
id: plugin_dod
title: Plugin Definition of Done
sidebar_label: Plugin DoD
---

## Motivation

The goal of this doc is to explain the full plugin development cycle, and provide an exhaustive checklist of what should be done to bring a plugin to production-ready state.

## Plugin DoD

### 1. Product and UX/UI

#### Translation Keys

No hard-coded strings should be found in plugin code. Every textual content shall be added to [messages_en.json](https://github.com/wix/ricos/blob/master/packages/common/web/statics/locale/messages_en.json) and used as `t('Translation_Key')`.

#### Reasonable Defaults

The plugin definition should contain the default data that is added to content upon plugin insertion. The defaults should be used by both plugin component in editor, and Builder API method.

#### Accessibility

##### Keyboard Shortcuts

##### Keyboard Navigation

##### ARIA attributes

#### BI Events

The plugin definition should contain relevant BI events for the plugin.

#### Error Handling

##### Resilience

The plugin definition should describe the plugin behavior in case of failure, e.g. content clean up if the file upload fails.

##### Error Messages

###### Reasonable Messages

The error messages should be clear and specific as much as possible.

###### Error Logging

###### Error UI (Toasts, etc)

#### Security Concerns

##### 3rd Party API Keys and Secrets

Some plugins rely on 3rd party services that require authentication (usually, with an API key like Google Maps Service). Such key should not be exposed on client side.

##### Script Injection (HTML user input)

##### Service Abuse (DoS)

Service requests should be throttled and limited.

#### Customization

##### Plugin Configuration (Editor/Viewer)

##### Theming Options

###### Theme API Extension

###### Theme Wiring

### 2. Data Structure and Platformization

#### Plugin Schema

##### Elaboration

Upon new plugin addition, the protobuf schema should be extended without breaking changes. This means, new messages can be added and used in existing messages, while the field indices are not changed/reused (new field should get new unique index).

##### Review

#### Content API

##### Content Builder

##### Translatable API

#### Velo API

##### Velo Builder Methods

##### Velo Package Update

#### Converters

##### fromDraft / toDraft

##### fromHtml / toHtml

##### fromPlainText / toPlainText

##### fromTiptap / toTiptap

### 3. Plugin Components

#### Performant Design Practices

##### Lazy Loading

##### Dynamic Imports & Loadable

#### SSR and SEO

#### Asynchronous Behavior

#### Static Assets

##### SVG

In some cases, SVG files provided by UI designers contain conflicting ids which lead to wrong icons being displayed. Also, sometimes SVG files contain redundant data which may be removed without any effect.

#### 3rd Party Dependencies

##### Pinned vs Latest Version

##### ES5 Compliance

##### Polyfills

#### Build Script Options

#### Editor/Viewer Components

##### Module Structure

##### Tiptap Extensions

#### Toolbars and Settings

### 4. @wix/ricos Integration

#### Services

#### Test in ricos-tpa

### 5. Tests

#### Unit Tests

#### E2E

#### Performance Measurement

##### Bundle Size

##### Time to Display

##### Time to Interactive

### 6. Documentation

#### Docusaurus

##### Code Examples

##### Deploying

#### @wix/ricos Pages

#### Storybook?

### 7. Releasing

#### Submitting a PR

#### Review

#### Minor Release

#### @wix/ricos Release
