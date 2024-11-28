import { Getinbox } from '../src/index';

delete process.env.GETINBOX_API_KEY;

const fetchMock = jest.fn() as jest.Mock<ReturnType<typeof fetch>>;
global.fetch = fetchMock as unknown as typeof fetch;

describe('Getinbox', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should throw error if apiKey is not set', () => {
      expect(() => new Getinbox()).toThrow();
      expect(() => new Getinbox({})).toThrow();
      expect(() => new Getinbox({ apiKey: '' })).toThrow();
    });

    it('should succeed with apiKey or envVar set', () => {
      expect(() => new Getinbox({ apiKey: 'test' })).not.toThrow();
      process.env.GETINBOX_API_KEY = 'test';
      expect(() => new Getinbox()).not.toThrow();
      delete process.env.GETINBOX_API_KEY;
    });
  });

  it('should have all expected public sdk namespaces', () => {
    const getinbox = new Getinbox({ apiKey: 'test' });
    expect(typeof getinbox.emails).toBe('object');
  });

  describe('emails', () => {
    it('should have all expected email methods', () => {
      const getinbox = new Getinbox({ apiKey: 'test' });
      expect(typeof getinbox.emails.find).toBe('function');
      expect(typeof getinbox.emails.verify).toBe('function');
    });

    describe('find', () => {
      it('should find email', async () => {
        fetchMock.mockResolvedValueOnce(
          new Response(JSON.stringify({ email: 'john.doe@gmail.com' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          })
        );
        const getinbox = new Getinbox({ apiKey: 'test' });
        const res = await getinbox.emails.find({
          name: 'John Doe',
          company: 'gmail.com',
        });
        expect(res.email).toBe('john.doe@gmail.com');
      });

      it('should throw error if request fails', async () => {
        const errorMessage = 'Request failed';
        fetchMock.mockResolvedValueOnce(
          new Response(JSON.stringify({ message: errorMessage }), {
            status: 400,
          })
        );
        const getinbox = new Getinbox({ apiKey: 'test' });
        await expect(
          getinbox.emails.find({
            name: 'John Doe',
            company: 'gmail.com',
          })
        ).rejects.toThrow(errorMessage);
      });
    });

    describe('verify', () => {
      it('should verify email', async () => {
        fetchMock.mockResolvedValueOnce(
          new Response(JSON.stringify({ isValid: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          })
        );
        const getinbox = new Getinbox({ apiKey: 'test' });
        const res = await getinbox.emails.verify({
          email: 'john.doe@gmail.com',
        });
        expect(res.isValid).toBe(true);
      });

      it('should throw error if request fails', async () => {
        const errorMessage = 'Request failed';
        fetchMock.mockResolvedValueOnce(
          new Response(JSON.stringify({ message: errorMessage }), {
            status: 400,
          })
        );
        const getinbox = new Getinbox({ apiKey: 'test' });
        await expect(
          getinbox.emails.verify({
            email: 'john.doe@gmail.com',
          })
        ).rejects.toThrow(errorMessage);
      });
    });
  });
});
