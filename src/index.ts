import { safeJsonParse } from './utils';

export type GetinboxOptions = {
  /**
   * The API key to use for requests.
   * If preferred, you can also set the `GETINBOX_API_KEY` environment variable instead.
   * Sign up for a free API key at https://www.getinbox.co/signup.
   */
  apiKey?: string;
};

export type FindEmailOptions = {
  /**
   * The person's full name (e.g., 'John Doe').
   * Getinbox will format the name, clean up titles, suffixes and remove emojis, etc.
   */
  name: string;
  /**
   * The company's name (e.g., 'SpaceX').
   * Using the company's website domain (e.g., 'spacex.com') instead of the name provides better accuracy in email finding results.
   */
  company: string;
};

export type FindEmailResponse = {
  email: string;
};

export type VerifyEmailOptions = {
  /**
   * The email address to verify (e.g., 'emusk@spacex.com').
   */
  email: string;
};

export type VerifyEmailResponse = {
  isValid: boolean;
};

export type CheckDisposableOptions = {
  /**
   * The email address to check if it's disposable (e.g., 'emusk@temp-mail.org').
   */
  email: string;
};

export type CheckDisposableResponse = {
  isDisposable: boolean;
};

type _FetchOpts = {
  method: 'GET' | 'POST';
  pathname: `/${string}`;
  body?: Record<string, unknown>;
};

export class Getinbox {
  private readonly _apiKey: string;

  constructor(opts?: GetinboxOptions) {
    const apiKey = opts?.apiKey || process.env.GETINBOX_API_KEY;
    if (!apiKey) {
      throw new Error(
        "The GETINBOX_API_KEY environment variable is missing or empty; either provide it, or instantiate the Getinbox client with an apiKey option, like `new Getinbox({ apiKey: '...' })`."
      );
    }

    this._apiKey = apiKey;
  }

  public emails = {
    find: this._findEmail.bind(this),
    verify: this._verifyEmail.bind(this),
    disposable: this._checkDisposable.bind(this),
  };

  private async _fetch<T>(opts: _FetchOpts) {
    const res = await fetch(`https://www.getinbox.co/api${opts.pathname}`, {
      method: opts.method,
      headers: {
        Authorization: `Bearer ${this._apiKey}`,
        ...(opts.body && { 'Content-Type': 'application/json' }),
      },
      ...(opts.body && { body: JSON.stringify(opts.body) }),
    });
    if (!res.ok) {
      const text = await res.text();
      const error = safeJsonParse<{ message: string }>(text);
      if (error?.message) {
        throw new Error(error.message);
      }
      throw new Error(res.statusText);
    }
    return res.json() as Promise<T>;
  }

  private async _findEmail(options: FindEmailOptions) {
    return this._fetch<FindEmailResponse>({
      method: 'POST',
      pathname: '/v1/emails/find',
      body: {
        name: options.name,
        company: options.company,
      },
    });
  }

  private async _verifyEmail(options: VerifyEmailOptions) {
    return this._fetch<VerifyEmailResponse>({
      method: 'POST',
      pathname: '/v1/emails/verify',
      body: {
        email: options.email,
      },
    });
  }

  private async _checkDisposable(options: CheckDisposableOptions) {
    return this._fetch<CheckDisposableResponse>({
      method: 'POST',
      pathname: '/v1/emails/disposable',
      body: {
        value: options.email,
      },
    });
  }
}

export default Getinbox;
