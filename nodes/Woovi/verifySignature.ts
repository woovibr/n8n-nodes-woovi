import {
  BinaryToTextEncoding,
  createHmac,
  createVerify,
  timingSafeEqual,
} from 'crypto';

export const HMAC_SIGNATURE_HEADER = 'x-openpix-signature';

export const RSA_SIGNATURE_HEADER = 'x-webhook-signature';

const HMAC_ENCODINGS: BinaryToTextEncoding[] = ['base64', 'hex'];

const safeEqual = (received: string, expected: string): boolean => {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
};

type VerifyHmacSignatureInput = {
  hmacSecretKey: string;
  rawBody: Buffer;
  signature?: string;
};

export const verifyHmacSignature = ({
  hmacSecretKey,
  rawBody,
  signature,
}: VerifyHmacSignatureInput): boolean => {
  if (!signature) {
    return false;
  }

  return HMAC_ENCODINGS.some((encoding) =>
    safeEqual(
      signature,
      createHmac('sha1', hmacSecretKey).update(rawBody).digest(encoding),
    ),
  );
};

const normalizePublicKey = (publicKey: string): string => {
  const trimmed = publicKey.trim();

  if (trimmed.includes('-----BEGIN')) {
    return trimmed;
  }

  return Buffer.from(trimmed, 'base64').toString('utf-8');
};

type VerifyRsaSignatureInput = {
  publicKey: string;
  rawBody: Buffer;
  signature?: string;
};

export const verifyRsaSignature = ({
  publicKey,
  rawBody,
  signature,
}: VerifyRsaSignatureInput): boolean => {
  if (!signature) {
    return false;
  }

  try {
    const verify = createVerify('sha256');

    verify.update(rawBody);
    verify.end();

    return verify.verify(normalizePublicKey(publicKey), signature, 'base64');
  } catch (error) {
    return false;
  }
};

type WebhookRequest = {
  body?: unknown;
  rawBody?: Buffer | string;
};

export const getRawBody = (req: WebhookRequest): Buffer => {
  const { rawBody } = req;

  if (Buffer.isBuffer(rawBody)) {
    return rawBody;
  }

  if (typeof rawBody === 'string') {
    return Buffer.from(rawBody);
  }

  return Buffer.from(JSON.stringify(req.body ?? {}));
};
