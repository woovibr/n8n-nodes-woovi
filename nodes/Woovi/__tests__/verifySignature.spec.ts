import { createHmac, createSign, generateKeyPairSync } from 'crypto';

import { verifyHmacSignature, verifyRsaSignature } from '../verifySignature';

const hmacSecretKey = 'openpix_g98Nj/oCocUi4mBu/AP5avmbLEmk=';

const payload = JSON.stringify({
  event: 'OPENPIX:CHARGE_COMPLETED',
  charge: {
    status: 'COMPLETED',
    value: 10000,
    correlationID: 'abc-123',
  },
});

const rawBody = Buffer.from(payload);

const generateKeyPair = () =>
  generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

const { privateKey, publicKey } = generateKeyPair();

const signWithRsa = (body: string, key = privateKey) => {
  const sign = createSign('sha256');

  sign.update(Buffer.from(body));
  sign.end();

  return sign.sign(key, 'base64');
};

it('should accept a genuine hmac signature in base64', () => {
  const signature = createHmac('sha1', hmacSecretKey)
    .update(rawBody)
    .digest('base64');

  expect(verifyHmacSignature({ hmacSecretKey, rawBody, signature })).toBe(true);
});

it('should accept a genuine hmac signature in hex', () => {
  const signature = createHmac('sha1', hmacSecretKey)
    .update(rawBody)
    .digest('hex');

  expect(verifyHmacSignature({ hmacSecretKey, rawBody, signature })).toBe(true);
});

it('should reject a hmac signature of a tampered body', () => {
  const signature = createHmac('sha1', hmacSecretKey)
    .update(rawBody)
    .digest('base64');

  const tamperedBody = Buffer.from(
    payload.replace('"value":10000', '"value":10000000'),
  );

  expect(
    verifyHmacSignature({ hmacSecretKey, rawBody: tamperedBody, signature }),
  ).toBe(false);
});

it('should reject a hmac signature made with another secret', () => {
  const signature = createHmac('sha1', 'another_secret')
    .update(rawBody)
    .digest('base64');

  expect(verifyHmacSignature({ hmacSecretKey, rawBody, signature })).toBe(
    false,
  );
});

it('should reject a missing hmac signature', () => {
  expect(
    verifyHmacSignature({ hmacSecretKey, rawBody, signature: undefined }),
  ).toBe(false);
});

it('should reject a garbage hmac signature', () => {
  expect(
    verifyHmacSignature({ hmacSecretKey, rawBody, signature: 'not-base64!!' }),
  ).toBe(false);
});

it('should reject a body that only differs in non-ASCII bytes', () => {
  const signedBody = Buffer.from(
    JSON.stringify({ reason: 'Tempo limite de liquidação' }),
  );

  const signature = createHmac('sha1', hmacSecretKey)
    .update(signedBody)
    .digest('base64');

  expect(
    verifyHmacSignature({
      hmacSecretKey,
      rawBody: Buffer.from(JSON.stringify({ reason: 'Tempo limite' })),
      signature,
    }),
  ).toBe(false);
});

it('should accept a genuine rsa signature with a pem key', () => {
  expect(
    verifyRsaSignature({ publicKey, rawBody, signature: signWithRsa(payload) }),
  ).toBe(true);
});

it('should accept a genuine rsa signature with a base64 encoded key', () => {
  expect(
    verifyRsaSignature({
      publicKey: Buffer.from(publicKey).toString('base64'),
      rawBody,
      signature: signWithRsa(payload),
    }),
  ).toBe(true);
});

it('should reject a rsa signature of a tampered body', () => {
  expect(
    verifyRsaSignature({
      publicKey,
      rawBody: Buffer.from(payload.replace('10000', '10000000')),
      signature: signWithRsa(payload),
    }),
  ).toBe(false);
});

it('should reject a rsa signature made with another key', () => {
  const other = generateKeyPair();

  expect(
    verifyRsaSignature({
      publicKey,
      rawBody,
      signature: signWithRsa(payload, other.privateKey),
    }),
  ).toBe(false);
});

it('should reject a missing rsa signature', () => {
  expect(verifyRsaSignature({ publicKey, rawBody, signature: undefined })).toBe(
    false,
  );
});

it('should fail closed on a malformed public key', () => {
  expect(
    verifyRsaSignature({
      publicKey: 'not-a-key',
      rawBody,
      signature: signWithRsa(payload),
    }),
  ).toBe(false);
});
