[![getinbox-js](assets/getinbox-readme.png)](https://www.getinbox.co/)

<div align="center">
  <h1>getinbox</h1>
  <a href="https://www.npmjs.com/package/getinbox"><img src="https://img.shields.io/npm/v/getinbox.svg?style=flat&color=brightgreen" target="_blank" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-black" /></a>
  <a href="https://www.getinbox.co/dashboard/api-key" target="_blank"><img src="https://img.shields.io/badge/api_key-free-600dff" /></a>
  <br />
  <hr />
</div>

#### `getinbox` is maintained by [Getinbox](https://www.getinbox.co/) - simple, fast and free online [email finder](https://www.getinbox.co/tools/email-finder) tools.

---

## ✅ **Email finder & verifier for Node.js**

- Find anyone's professional email address with 99% accuracy
- Verify email deliverability without sending test emails
- Detect disposable email addresses
- Double-verifies catch-all mailboxes
- Full TypeScript support with detailed type definitions

## Installation

```bash
npm install getinbox
```

## Quick Start

```typescript
import { Getinbox } from 'getinbox';

// Initialize the client
const getinbox = new Getinbox({
  apiKey: 'your_api_key', // or set GETINBOX_API_KEY env variable
});

// Find an email address
const { email } = await getinbox.emails.find({
  name: 'Elon Musk',
  company: 'spacex.com', // Using domain instead of company name provides better accuracy
});

// Verify an email address
const { isValid } = await getinbox.emails.verify({
  email: 'elon@spacex.com',
});

// Check if email is disposable (temporary)
const { isDisposable } = await getinbox.emails.disposable({
  email: 'test@temp-mail.org',
});
```

## Requirements

- Node.js 14 or later
- TypeScript 4.7 or later (optional)

## API Reference

### Authentication

Sign up for a free API key at 👉 [getinbox.co/dashboard/api-key](https://www.getinbox.co/dashboard/api-key).

You can provide your API key in two ways:

**1. Pass it when initializing the client:**

```typescript
const getinbox = new Getinbox({ apiKey: 'your_api_key' });
```

**2. Set it as an environment variable:**

```bash
export GETINBOX_API_KEY=your_api_key
const getinbox = new Getinbox(); // Will use GETINBOX_API_KEY env variable
```

### Finding Email Addresses

Find someone's email address using their name and company information:

```typescript
const response = await getinbox.emails.find({
  name: 'John Doe', // Full name of the person
  company: 'acme.com', // Company domain (preferred) or name
});

console.log(response.email); // => 'john.doe@acme.com'
```

### Verifying Email Addresses

Verify if an email address exists and is deliverable:

```typescript
const response = await getinbox.emails.verify({
  email: 'john.doe@acme.com',
});

console.log(response.isValid); // => true/false
```

### Checking Disposable Email Addresses

Check if an email address is using a disposable or temporary email service:

```typescript
const response = await getinbox.emails.disposable({
  email: 'john.doe@temp-mail.org',
});

console.log(response.isDisposable); // => true/false
```

## Features in Detail

### Email Finder

- Discovers professional email addresses with 99% accuracy
- Uses advanced pattern matching and verification
- Cleans and formats input data automatically
- Real-time verification of found emails

### Email Verifier

- Validates email existence without sending test emails
- Checks syntax, domain validity, and mailbox existence
- Detects disposable email addresses
- Identifies catch-all domains
- Helps maintain sender reputation by preventing bounces

## Error Handling

The SDK throws descriptive errors for invalid API keys, failed requests, and API errors:

```typescript
try {
  const response = await getinbox.emails.find({
    name: 'John Doe',
    company: 'acme.com',
  });
} catch (error) {
  console.error('Error finding email:', error.message);
}
```

## TypeScript Support

The SDK is written in TypeScript and provides comprehensive type definitions:

```typescript
import {
  GetinboxOptions,
  FindEmailOptions,
  VerifyEmailOptions,
  CheckDisposableOptions,
} from 'getinbox';

// All options are fully typed
const options: FindEmailOptions = {
  name: 'John Doe',
  company: 'acme.com',
};
```

## Types

### GetinboxOptions

| Property | Type     | Description           | Required                     |
| -------- | -------- | --------------------- | ---------------------------- |
| `apiKey` | `string` | Your Getinbox API key | `false` (if set via env var) |

### FindEmailOptions

| Property  | Type     | Description             | Required |
| --------- | -------- | ----------------------- | -------- |
| `name`    | `string` | Full name of the person | `true`   |
| `company` | `string` | Company domain or name  | `true`   |

### VerifyEmailOptions

| Property | Type     | Description             | Required |
| -------- | -------- | ----------------------- | -------- |
| `email`  | `string` | Email address to verify | `true`   |

### CheckDisposableOptions

| Property | Type     | Description                          | Required |
| -------- | -------- | ------------------------------------ | -------- |
| `email`  | `string` | Email address to check if disposable | `true`   |

## License

Distributed under the MIT License. See LICENSE for more information.

## Links

If you need support please contact us at 👉 [support@getinbox.co](mailto:support@getinbox.co)

- [Getinbox Website](https://www.getinbox.co/)
- [API Key Signup](https://www.getinbox.co/dashboard/api-key)
- [OpenAPI Schema](https://www.getinbox.co/api/openapi.json)
