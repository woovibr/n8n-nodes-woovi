# Woovi API — Rotas (extraídas de https://developers.woovi.com/en/api)

Este documento lista as rotas da API Woovi (v1) com: título da rota, método, descrição e payload (path/query/body/headers). Tradução e organização em português.

> Observações gerais
>
> - Base URL (produção): https://api.woovi.com/
> - Sandbox: https://api.woovi-sandbox.com/
> - Cabeçalhos comuns: `Authorization` (AppID) — muitas rotas exigem AppID na autenticação.

---

## Sumário

- Account
- Account Register
- Application
- Cashback Fidelity
- Charge
- Charge Refund
- Company
- Customer
- Dispute
- Installments
- Partner (request access)
- Payment (request access)
- Pix Key
- Pix QR Code
- Transactions
- Refund
- PSP
- Receipt
- Subaccount
- Subscription
- CobR
- Transfer
- Webhook
- Decode
- Fraud Validation
- Invoice
- Statement

---

## Account

### Get an Account

- Método: GET
- Path: /api/v1/account/{accountId}
- Descrição: Recupera uma conta pela ID
- Payload:
  - Path params: `accountId` (string) — ID da Account
  - Query: —
  - Body: —
  - Headers: `Authorization: <AppID>`

### Get a list of Accounts

- Método: GET
- Path: /api/v1/account
- Descrição: Lista contas da empresa
- Payload: headers `Authorization`

### Create a new Account

- Método: POST
- Path: /api/v1/account
- Descrição: Cria um novo bank account para a companhia (requer feature habilitada)
- Payload:
  - Body (application/json): objeto `companyBankAccount` — ex: `{ "companyBankAccount": { "accountId": "string", "isDefault": true } }`
  - Headers: `Authorization`

### Withdraw from an Account

- Método: POST
- Path: /api/v1/account/{accountId}/withdraw
- Descrição: Realiza saque da Account (valor em centavos)
- Payload:
  - Path: `accountId`
  - Body: `{ "value": 7000 }`
  - Headers: `Authorization`

---

## Account Register

### Delete an account registration

- Método: DELETE
- Path: /api/v1/account-register/{id}
- Descrição: Deleta registro de conta em status PENDING
- Payload: path `id` (taxID), headers `Authorization`

### Update an existing account registration

- Método: PATCH
- Path: /api/v1/account-register/{id}
- Descrição: Atualiza documentos/representantes de um registro em PENDING
- Payload: body (application/json) com campos como `documents`, `representatives`, `businessDescription`, etc.; headers `Authorization`

### Get account register by Tax ID

- Método: GET
- Path: /api/v1/account-register?taxID={taxID}
- Descrição: Recupera registro por Tax ID
- Payload: query `taxID`, headers `Authorization`

### Register a new account

- Método: POST
- Path: /api/v1/account-register
- Descrição: Cria novo registro de conta (officialName, tradeName, taxID, billingAddress, representantes...)
- Payload: body (application/json) com campos obrigatórios `officialName`, `tradeName`, `taxID`, `billingAddress`; headers `Authorization`

---

## Application

### Delete an application

- Método: DELETE
- Path: /api/v1/application
- Descrição: Desativa uma aplicação (set isActive=false)
- Payload: headers `Authorization`

### Create a new application

- Método: POST
- Path: /api/v1/application
- Descrição: Cria uma aplicação para a companhia (retorna clientId/clientSecret/appID)
- Payload: body `{ "accountId": "...", "application": { "name": "Test API", "type": "API" } }`, headers `Authorization`

---

## Cashback Fidelity

### Get cashback balance by taxID

- Método: GET
- Path: /api/v1/cashback-fidelity/balance/{taxID}
- Descrição: Valor do cashback exclusivo que ainda falta receber pelo usuário
- Payload: path `taxID`, headers `Authorization`

### Create or get cashback

- Método: POST
- Path: /api/v1/cashback-fidelity
- Descrição: Cria ou retorna cashback existente para um taxID
- Payload: body `{ "taxID": 11111111111, "value": 100 }`, headers `Authorization`

---

## Charge (Cobranças / Pix/OpenPix)

### GET Qr Code image (charge)

- Método: GET
- Path: /openpix/charge/brcode/image/{id}.png
- Descrição: Retorna imagem PNG do QR Code para charge
- Payload: path `id`, query `size` (opcional), headers `Authorization`

### GET base64 QR image

- Método: GET
- Path: /api/image/qrcode/base64/{id}
- Descrição: Retorna QR Code em base64
- Payload: path `id`, query `size` (opcional), headers `Authorization`

### Delete a charge

- Método: DELETE
- Path: /api/v1/charge/{id}
- Descrição: Deleta uma charge por ID ou correlation ID
- Payload: path `id`, headers `Authorization`

### Edit expiration date of a charge

- Método: PATCH
- Path: /api/v1/charge/{id}
- Descrição: Atualiza expiresDate de uma charge (ISO 8601)
- Payload: body `{ "expiresDate": "2021-04-01T17:28:51.882Z" }`, path `id`, headers `Authorization`

### Get one charge

- Método: GET
- Path: /api/v1/charge/{id}
- Descrição: Retorna detalhes da charge
- Payload: path `id`, headers `Authorization`

### Get a list of charges

- Método: GET
- Path: /api/v1/charge
- Descrição: Lista charges, com filtros
- Payload: query params: `start`, `end`, `status`, `customer`, `subscription`; headers `Authorization`

### Create a new Charge

- Método: POST
- Path: /api/v1/charge
- Descrição: Cria uma nova charge (muito configurável: customer, value, correlationID, expiresIn/date, splits, cashback, etc.)
- Payload:
  - Query: `return_existing` (boolean, torna idempotente)
  - Body (application/json) obrigatórios: `correlationID` (string), `value` (number, centavos)
  - Outros campos opcionais: `type`, `comment`, `expiresIn`, `expiresDate`, `customer` (obj), `ensureSameTaxID`, `daysForDueDate`, `interests`, `fines`, `discountSettings`, `additionalInfo`, `enableCashbackPercentage`, `subaccount`, `splits`, ...
  - Headers: `Authorization`

---

## Charge Refund

### Get all refunds of a charge

- Método: GET
- Path: /api/v1/charge/{id}/refund
- Descrição: Lista reembolsos de uma charge
- Payload: path `id`, headers `Authorization`

### Create a new refund for a charge

- Método: POST
- Path: /api/v1/charge/{id}/refund
- Descrição: Cria refund para uma charge existente
- Payload: body `{ "correlationID": "...", "value": 100, "comment": "..." }`, path `id`, headers `Authorization`

---

## Company

### Get a Company

- Método: GET
- Path: /api/v1/company
- Descrição: Retorna dados da Company ligada ao application
- Payload: headers `Authorization`

---

## Customer

### Get one customer

- Método: GET
- Path: /api/v1/customer/{id}
- Descrição: Retorna cliente por correlation ID ou taxID
- Payload: path `id`, headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/customer/$CUSTOMER_ID" \
  -H "Authorization: $WOOVI_APP_ID"
```

**Exemplo JavaScript (fetch)**

```js
const res = await fetch(
  `${process.env.WOOVI_BASE_URL}/api/v1/customer/${customerId}`,
  {
    method: 'GET',
    headers: {
      Authorization: process.env.WOOVI_APP_ID,
    },
  },
);
const data = await res.json();
```

### Get list of customers

- Método: GET
- Path: /api/v1/customer
- Descrição: Lista clientes
- Payload: headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/customer" \
  -H "Authorization: $WOOVI_APP_ID"
```

### Create a new Customer

- Método: POST
- Path: /api/v1/customer
- Descrição: Cria novo cliente. `name` é obrigatório e pelo menos um entre `taxID`, `email` ou `phone` deve ser informado. `address` é opcional, mas se enviado todos os campos (exceto `complement`) são obrigatórios.
- Payload:
  - Body (application/json):
    - `name` (string) — obrigatório
    - Pelo menos um: `taxID` (string), `email` (string), `phone` (string)
    - `correlationID` (string) — opcional
    - `address` (objeto) — opcional

**Exemplo curl**

```bash
curl -X POST \
  "$WOOVI_BASE_URL/api/v1/customer" \
  -H "Authorization: $WOOVI_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "taxID": "12345678900",
    "email": "john@example.com",
    "phone": "+5511999999999",
    "correlationID": "customer-123",
    "address": {
      "zipcode": "01234-567",
      "street": "Rua das Flores",
      "number": "123",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "country": "BR",
      "complement": "Apto 101"
    }
  }'
```

**Exemplo JavaScript (fetch)**

```js
const body = {
  name: 'John Doe',
  taxID: '12345678900',
  email: 'john@example.com',
  phone: '+5511999999999',
  correlationID: 'customer-123',
  address: {
    zipcode: '01234-567',
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    country: 'BR',
    complement: 'Apto 101',
  },
};

const res = await fetch(`${process.env.WOOVI_BASE_URL}/api/v1/customer`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.WOOVI_APP_ID,
  },
  body: JSON.stringify(body),
});
const data = await res.json();
```

### Update a Customer

- Método: PATCH
- Path: /api/v1/customer/{correlationID}
- Descrição: Atualiza cliente existente pelo `correlationID`. Apenas campos enviados no body serão atualizados.
- Payload: path `correlationID`, body com campos a atualizar

**Exemplo curl**

```bash
curl -X PATCH \
  "$WOOVI_BASE_URL/api/v1/customer/customer-123" \
  -H "Authorization: $WOOVI_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }'
```

---

## Dispute (Disputa)

### Upload new evidence

- Método: POST
- Path: /api/v1/dispute/:id/evidence
- Descrição: Faz upload de evidências para disputa
- Payload: body `{ "documents": [ { "url": "...", "correlationID": "...", "description": "..." } ] }`, headers `Authorization`

### Get one dispute

- Método: GET
- Path: /api/v1/dispute/{id}
- Descrição: Retorna disputa pelo endToEndId
- Payload: path `id`, headers `Authorization`

### Get list of disputes

- Método: GET
- Path: /api/v1/dispute
- Descrição: Lista disputas (filtros por start/end)
- Payload: query `start`, `end`, headers `Authorization`

---

## Installments

### Get an Installment

- Método: GET
- Path: /api/v1/installments/{id}
- Descrição: Recupera parcela por globalID ou endToEndId
- Payload:
  - Path params: `id` (string) — globalID ou endToEndId da parcela
  - Query: —
  - Body: —
  - Headers: `Authorization: <AppID>` (obrigatório)

#### Exemplo com cURL

```bash
curl -X GET 'https://api.woovi.com/api/v1/installments/GI_123456789' \
  -H 'Authorization: <AppID>' \
  -H 'Content-Type: application/json'
```

#### Exemplo com Node.js (fetch)

```javascript
const fetch = require('node-fetch');

async function getInstallment(id) {
  const response = await fetch(
    `https://api.woovi.com/api/v1/installments/${encodeURIComponent(id)}`,
    {
      method: 'GET',
      headers: {
        Authorization: '<AppID>',
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();
  return data;
}

// Exemplo de uso com globalID
getInstallment('GI_123456789')
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));

// Exemplo de uso com endToEndId
getInstallment('E12345678912345678901234567890AB')
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Resposta de Sucesso (200 OK)

```json
{
  "installment": {
    "globalID": "GI_123456789",
    "endToEndId": "E12345678912345678901234567890AB",
    "value": 10000,
    "status": "ACTIVE",
    "correlationID": "installment-123",
    "customer": {
      "name": "John Doe",
      "taxID": "12345678900"
    },
    "createdAt": "2025-11-10T10:00:00Z"
  }
}
```

---

## Partner (request access)

### Create a new application to preregistration's company

- Método: POST
- Path: /api/v1/partner/application
- Descrição: Parceiro cria aplicação para suas empresas pre-registradas
- Payload: body `{ "application": {..}, "taxID": {...} }`, headers `Authorization`

### Get preregistration by taxID

- Método: GET
- Path: /api/v1/partner/company/{taxID}
- Descrição: Recupera preregistração via taxID
- Payload: path `taxID`, headers `Authorization`

### List preregistrations

- Método: GET
- Path: /api/v1/partner/company
- Descrição: Lista pre-registrations gerenciadas pelo parceiro
- Payload: headers `Authorization`

### Create a pre registration

- Método: POST
- Path: /api/v1/partner/company
- Descrição: Cria preregistration referenciando parceiro
- Payload: body `preRegistration`, `user`, headers `Authorization`

---

## Payment (request access)

### Approve a Payment Request

- Método: POST
- Path: /api/v1/payment/approve
- Descrição: Aprova uma solicitação de pagamento (PIX)
- Payload: body `{ "correlationID": "..." }`, headers `Authorization`

### Get one Payment

- Método: GET
- Path: /api/v1/payment/{id}
- Descrição: Recupera pagamento por ID ou correlation ID
- Payload: path `id`, headers `Authorization`

### List payments

- Método: GET
- Path: /api/v1/payment
- Descrição: Lista pagamentos
- Payload: headers `Authorization`

### Create a Payment Request

- Método: POST
- Path: /api/v1/payment
- Descrição: Solicita um pagamento (PIX key / QR / Manual)
- Payload: body com `type`, `value`, `destinationAlias`, `destinationAliasType`, `correlationID`, `pixKeyEndToEndId`, `comment`, `metadata`; headers `Authorization`

---

## Pix Key

### Check data from a Pix key

- Método: GET
- Path: /api/v1/pix-keys/{pixKey}/check
- Descrição: Verifica dados públicos de uma pix key
- Payload: path `pixKey`, headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/pix-keys/$PIX_KEY/check" \
  -H "Authorization: $WOOVI_APP_ID"
```

**Exemplo JavaScript (fetch)**

```js
const res = await fetch(
  `${process.env.WOOVI_BASE_URL}/api/v1/pix-keys/${pixKey}/check`,
  {
    method: 'GET',
    headers: {
      Authorization: process.env.WOOVI_APP_ID,
    },
  },
);
const data = await res.json();
```

### Set pix key as default

- Método: POST
- Path: /api/v1/pix-keys/{pixKey}/default
- Descrição: Define pix key como padrão
- Payload: path `pixKey`, headers `Authorization`

**Exemplo curl**

```bash
curl -X POST \
  "$WOOVI_BASE_URL/api/v1/pix-keys/$PIX_KEY/default" \
  -H "Authorization: $WOOVI_APP_ID"
```

**Exemplo JavaScript (fetch)**

```js
const res = await fetch(
  `${process.env.WOOVI_BASE_URL}/api/v1/pix-keys/${pixKey}/default`,
  {
    method: 'POST',
    headers: {
      Authorization: process.env.WOOVI_APP_ID,
    },
  },
);
const data = await res.json();
```

### Delete a Pix key

- Método: DELETE
- Path: /api/v1/pix-keys/{pixKey}
- Descrição: Deleta pix key (não pode deletar a default)
- Payload: path `pixKey`, headers `Authorization`

**Exemplo curl**

```bash
curl -X DELETE \
  "$WOOVI_BASE_URL/api/v1/pix-keys/$PIX_KEY" \
  -H "Authorization: $WOOVI_APP_ID"
```

**Exemplo JavaScript (fetch)**

```js
const res = await fetch(
  `${process.env.WOOVI_BASE_URL}/api/v1/pix-keys/${pixKey}`,
  {
    method: 'DELETE',
    headers: {
      Authorization: process.env.WOOVI_APP_ID,
    },
  },
);
const data = await res.json();
```

### Get all Pix keys

- Método: GET
- Path: /api/v1/pix-keys
- Descrição: Lista pix keys da conta
- Payload: headers `Authorization`

### Create a new Pix key

- Método: POST
- Path: /api/v1/pix-keys
- Descrição: Cria nova pix key
- Payload: body `{ "key": "string", "type": "CNPJ" }`, headers `Authorization`

**Exemplo curl**

```bash
curl -X POST \
  "$WOOVI_BASE_URL/api/v1/pix-keys" \
  -H "Authorization: $WOOVI_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "test-key",
    "type": "EMAIL"
  }'
```

**Exemplo JavaScript (fetch)**

```js
const body = {
  key: 'test-key',
  type: 'EMAIL',
};

const res = await fetch(`${process.env.WOOVI_BASE_URL}/api/v1/pix-keys`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.WOOVI_APP_ID,
  },
  body: JSON.stringify(body),
});
const data = await res.json();
```

### Get tokens data for pix keys

- Método: GET
- Path: /api/v1/pix-keys/tokens
- Descrição: Tokens info (limite/refresh)
- Payload: headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/pix-keys/tokens" \
  -H "Authorization: $WOOVI_APP_ID"
```

**Exemplo JavaScript (fetch)**

```js
const res = await fetch(
  `${process.env.WOOVI_BASE_URL}/api/v1/pix-keys/tokens`,
  {
    method: 'GET',
    headers: {
      Authorization: process.env.WOOVI_APP_ID,
    },
  },
);
const data = await res.json();
```

---

## Pix QR Code (static)

### Get one Pix QrCode static

- Método: GET
- Path: /api/v1/qrcode-static/{id}
- Descrição: Recupera pix qrcode estático por id/correlation/identifier
- Payload: path `id`, headers `Authorization`

### Get list of Pix QrCodes

- Método: GET
- Path: /api/v1/qrcode-static
- Descrição: Lista QrCodes estáticos
- Payload: headers `Authorization`

### Create a new Pix QrCode Static

- Método: POST
- Path: /api/v1/qrcode-static
- Descrição: Cria um Pix QrCode estático (opcionalmente associado a pixKey)
- Payload: body `{ "name": "my-qr-code", "correlationID": "...", "value": 100, "comment": "..." }`, headers `Authorization`

---

## Transactions

### Get a Transaction

- Método: GET
- Path: /api/v1/transaction/{id}
- Descrição: Recupera transação por transaction ID ou endToEndId
- Payload: path `id`, headers `Authorization`

### Get a list of transactions

- Método: GET
- Path: /api/v1/transaction
- Descrição: Lista transações com filtros (start/end/charge/pixQrCode/withdrawal...)
- Payload: query params `start`, `end`, `charge`, `pixQrCode`, `withdrawal`, headers `Authorization`

---

## Refund

### Get one refund

- Método: GET
- Path: /api/v1/refund/{id}
- Descrição: Recupera refund por refund ID ou correlation ID
- Payload: path `id`, headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/refund/$REFUND_ID" \
  -H "Authorization: $WOOVI_APP_ID"
```

### Get list of refunds

- Método: GET
- Path: /api/v1/refund
- Descrição: Lista refunds
- Payload: headers `Authorization`

**Exemplo curl**

```bash
curl -X GET \
  "$WOOVI_BASE_URL/api/v1/refund?limit=20&skip=0" \
  -H "Authorization: $WOOVI_APP_ID"
```

### Create a new refund

- Método: POST
- Path: /api/v1/refund
- Descrição: Cria refund (global)
- Payload: body `{ "transactionEndToEndId": "...", "correlationID": "...", "value": 100, "comment": "..." }`, headers `Authorization`

**Exemplo curl**

```bash
curl -X POST \
  "$WOOVI_BASE_URL/api/v1/refund" \
  -H "Authorization: $WOOVI_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "transactionEndToEndId": "E12345678912345678901234567890AB",
    "correlationID": "refund-123",
    "value": 1000,
    "comment": "Refund requested by customer"
  }'
```

**Exemplo JavaScript (fetch)**

```js
const body = {
  transactionEndToEndId: 'E12345678912345678901234567890AB',
  correlationID: 'refund-123',
  value: 1000,
  comment: 'Refund requested by customer',
};

const res = await fetch(`${process.env.WOOVI_BASE_URL}/api/v1/refund`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.WOOVI_APP_ID,
  },
  body: JSON.stringify(body),
});
const data = await res.json();
```

---

## PSP

### Get list of PSPs

- Método: GET
- Path: /api/v1/psp
- Descrição: Lista Payment Service Providers — filtros `ispb`, `name`, `compe`
- Payload: query params, headers `Authorization`

---

## Receipt

### Get a receipt PDF

- Método: GET
- Path: /api/v1/receipt/{ReceiptType}/{EndToEndId}
- Descrição: PDF de recibo (pix-in, pix-out, pix-refund)
- Payload: path `ReceiptType` (pix-in/pix-out/pix-refund), path `EndToEndId`, headers `Authorization`

---

## Subaccount

### Withdraw from a Sub Account

- Método: POST
- Path: /api/v1/subaccount/{id}/withdraw
- Descrição: Saque parcial de subaccount (em centavos)
- Payload: path `id`, body `{ "value": 1000 }`, headers `Authorization`

### Delete Sub Account

- Método: DELETE
- Path: /api/v1/subaccount/{id}
- Descrição: Deleta subaccount (se balance == 0)
- Payload: path `id`, headers `Authorization`

### Get subaccount details

- Método: GET
- Path: /api/v1/subaccount/{id}
- Descrição: Retorna info da subaccount
- Payload: path `id`, headers `Authorization`

### List subaccounts

- Método: GET
- Path: /api/v1/subaccount
- Descrição: Lista subaccounts
- Payload: headers `Authorization`

### Create/Retrieve a subaccount

- Método: POST
- Path: /api/v1/subaccount
- Descrição: Cria ou retorna subaccount por `pixKey`
- Payload: body `{ "pixKey": "...", "name": "..." }`, headers `Authorization`

### Debit from Sub Account (send to main account)

- Método: POST
- Path: /api/v1/subaccount/{id}/debit
- Descrição: Debita valor da subaccount para conta principal
- Payload: body `{ "value": 50, "description": "" }`, path `id`, headers `Authorization`

### Transfer between subaccounts

- Método: POST
- Path: /api/v1/subaccount/transfer
- Descrição: Transferência interna entre subaccounts
- Payload: body com `value`, `fromPixKey`, `toPixKey`, `correlationID`, headers `Authorization`

---

## Subscription

### Get one installment

- Método: GET
- Path: /api/v1/installments/{id}
- Descrição: Recupera parcela por globalID ou endToEndId
- Payload: path `id`, headers `Authorization`

### Get installments by subscription

- Método: GET
- Path: /api/v1/subscriptions/{id}/installments
- Descrição: Lista parcelas de uma assinatura
- Payload: path `id`, headers `Authorization`

### Cancel a subscription

- Método: PUT
- Path: /api/v1/subscriptions/{id}/cancel
- Descrição: Cancela assinatura
- Payload: path `id`, headers `Authorization`

### Get subscription by id

- Método: GET
- Path: /api/v1/subscriptions/{id}
- Descrição: Recupera assinatura
- Payload: path `id`, headers `Authorization`

### List subscriptions

- Método: GET
- Path: /api/v1/subscriptions
- Descrição: Lista assinaturas
- Payload: headers `Authorization`

### Create a new Subscription

- Método: POST
- Path: /api/v1/subscriptions
- Descrição: Cria nova assinatura (PIX_RECURRING ou RECURRENT)
- Payload: body com `customer`, `value`, `type`, `correlationID`, `frequency`, `pixRecurringOptions`, etc.; headers `Authorization`

### Update next installments value

- Método: PUT
- Path: /api/v1/subscriptions/{id}/value
- Descrição: Atualiza valor das próximas parcelas (quando permitido)
- Payload: path `id`, body com novo valor, headers `Authorization`

---

## CobR (Cobrança – Pix automático)

### Create a new Cobr Manually

- Método: POST
- Path: /api/v1/installments/{id}/cobr
- Descrição: Gera CobR manualmente para parcela
- Payload: path `id`, optional body `{ "value": 0 }`, headers `Authorization`

### Retry cobr manually

- Método: POST
- Path: /api/v1/installments/{id}/cobr/retry
- Descrição: Cria retry manual
- Payload: path `id`, optional body, headers `Authorization`

---

## Transfer (request access)

### Create a Transfer

- Método: POST
- Path: /api/v1/transfer
- Descrição: Transfere valores entre contas
- Payload: body `{ "value": 100, "fromPixKey": "...", "toPixKey": "...", "correlationID": "..." }`, headers `Authorization`

---

## Webhook

### Delete a webhook

- Método: DELETE
- Path: /api/v1/webhook/{id}
- Descrição: Remove webhook
- Payload: path `id`, headers `Authorization`

### List webhooks

- Método: GET
- Path: /api/v1/webhook
- Descrição: Lista webhooks (filtro `url` disponível)
- Payload: query `url`, headers `Authorization`

### Create a new webhook

- Método: POST
- Path: /api/v1/webhook
- Descrição: Cria webhook para evento específico (vários eventos suportados)
- Payload: body `webhook` com `name`, `event`, `url`, `authorization`, `isActive` etc.; headers `Authorization`

### Get webhook IPs

- Método: GET
- Path: /api/v1/webhook/ips
- Descrição: Lista IPs usados para callbacks
- Payload: headers `Authorization`

---

## Decode

### Parse EMV (PIX) QR code

- Método: POST
- Path: /api/v1/decode/emv
- Descrição: Faz parse do EMV/PIX QR e resolve localizações COB/REC quando possível
- Payload: body `{ "emv": "..." }`, headers `Authorization`

---

## Fraud Validation

### Validate pix key fraud markers

- Método: GET
- Path: /api/v1/fraud-validation/pix-key/{pixKey}
- Descrição: Valida indicadores de fraude para uma pix key
- Payload: path `pixKey`, headers `Authorization`

### Validate taxId fraud markers

- Método: GET
- Path: /api/v1/fraud-validation/taxId/{taxId}
- Descrição: Valida indicadores de fraude para um taxId
- Payload: path `taxId`, headers `Authorization`

---

## Invoice

### Cancel an invoice

- Método: POST
- Path: /api/v1/invoice/{correlationID}/cancel
- Descrição: Cancela fatura
- Payload: path `correlationID`, headers `Authorization`

### Get invoices

- Método: GET
- Path: /api/v1/invoice
- Descrição: Lista invoices (filtros start/end/skip/limit)
- Payload: query params, headers `Authorization`

### Create a new invoice

- Método: POST
- Path: /api/v1/invoice
- Descrição: Cria invoice (pode incluir charge, customer ou customerId)
- Payload: body com `description`, `billingDate`, `correlationID`, `charge`, `value`, `customerId` ou `customer` object; headers `Authorization`

### Get invoice PDF

- Método: GET
- Path: /api/v1/invoice/{correlationID}/pdf
- Descrição: Retorna PDF da invoice
- Payload: path `correlationID`, headers `Authorization`

### Get invoice XML

- Método: GET
- Path: /api/v1/invoice/{correlationID}/xml
- Descrição: Retorna XML da invoice
- Payload: path `correlationID`, headers `Authorization`

---

## Statement

### Get statement by company

- Método: GET
- Path: /api/v1/statement
- Descrição: Recupera lançamentos do extrato da conta da empresa
- Payload: query `start`, `end`, `skip`, `limit`, headers `Authorization`

---

## Notas finais

- Este documento foi gerado automaticamente a partir da documentação pública em https://developers.woovi.com/en/api. Para detalhes de schemas e exemplos completos (respostas e request samples), consulte a documentação original ou o OpenAPI YAML disponível na página.
- Se quiser, eu posso:
  - transformar isto em um arquivo resumido por tag com exemplos prontos (curl/JS);
  - gerar um OpenAPI/JSON mais estruturado a partir do YAML público;
  - ou reduzir o conteúdo para incluir apenas endpoints usados pelo seu node `Woovi` no repositório.

---

_Gerado automaticamente a partir da documentação pública da Woovi._
