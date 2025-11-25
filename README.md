# n8n-nodes-woovi

![Woovi N8N logo](img/woovi-n8n.png)

[![NPM Version](https://badge.fury.io/js/n8n-nodes-woovi.svg?style=flat)](https://npmjs.org/package/n8n-nodes-woovi)

[![https://nodei.co/npm/n8n-nodes-woovi.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/n8n-nodes-woovi.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/n8n-nodes-woovi)

n8n nodes for create charges and payments with [Woovi](https://woovi.com)

## How to use

### Community Nodes (Recommended)

1. Go to Settings > Community Nodes.
2. Select Install.
3. Enter `n8n-nodes-woovi` in *Enter npm package name.* field.
4. Agree to the risks of using community nodes: select I understand the risks of installing unverified code from a public source.
5. Select Install.

### Manual installation

To get started install the package in your n8n root directory:

`npm install n8n-nodes-woovi`

### Setup

1. Go to Credentials.
2. Select `Add Credential` button.
3. Select `Woovi API` from the *Search for app* dropdown.
4. Get your Woovi API key from [API Getting Started](https://developers.woovi.com/docs/apis/api-getting-started).
5. Enter your Woovi API key in the *API Key* field.

#### Sandbox (Ambiente de teste)

Se você deseja usar o ambiente de sandbox, abra as credenciais `Woovi API` no n8n e ative `Use Sandbox Environment`. Quando ativado, preencha `API Key (Sandbox)` e `Base URL (Sandbox)` (padrão: `https://api.woovi-sandbox.com/api`). Desative para voltar ao ambiente de produção e preencher `API Key (Production)`.

## API Reference

- [Woovi API](https://developers.woovi.com/docs/apis/api-getting-started)

- All requests require the `Authorization` header with your AppID (set it in the `Woovi API` credential used by the node).

## Using implemented routes in n8n

The package currently implements two primary integrations for n8n:

- Create charge (POST /charge) — available as the `Woovi` node
- Webhook listener for Woovi events — available as the `Woovi Trigger` node

**Implemented endpoints:**

| Endpoint | Method | n8n Node | Required fields / Parameters | Short usage | Example output |
|---|---:|---|---|---|---|
| `/v1/charge` | POST | `Woovi` | `Value` (number, cents) — required; `CorrelationID` (string) — optional | Create a charge (dynamic PIX / payment link). Configure **Woovi API** credentials, set `Value` and optional `CorrelationID`, then execute the `Woovi` node. | `charge.identifier`, `charge.status`, `charge.paymentLinkUrl`, `charge.brCode`, `charge.pixKey`, `expiresIn` |
| `/webhook` (webhook listener) | POST (webhook) | `Woovi Trigger` | `events` (dropdown) — choose a specific event or `ALL` | Receive Woovi events (charge created/completed, transaction received, refunds, movement updates). Add `Woovi Trigger`, choose event(s), enable the workflow to expose the webhook URL, then configure Woovi to post to that URL. | Full event payload in node output JSON (field names depend on event) |
| `/v1/subaccount` | GET | `Woovi` | — | List subaccounts for the company. Use the `resource=subaccount` and `operation=listSubaccounts` in the `Woovi` node. | Array of subaccount objects (id, pixKey, name, balance, ...) |
| `/v1/subaccount/{id}` | GET | `Woovi` | `Subaccount ID` (string) — required | Get a single subaccount's details. Use `resource=subaccount` + `operation=getSubaccount` and provide `Subaccount ID`. | Subaccount object with details (id, pixKey, name, balance, createdAt, ...) |
| `/v1/subaccount` | POST | `Woovi` | `Pix Key` (string) — required (or other identifying fields) ; `Subaccount Name` (string) — optional | Create or retrieve a subaccount by `pixKey`. Use `resource=subaccount` + `operation=createSubaccount`. | Created or existing subaccount object (id, pixKey, name, ...) |
| `/v1/subaccount/{id}/withdraw` | POST | `Woovi` | `Subaccount ID` (string) — required; `Amount` (number, cents) — required | Withdraw (partial) from a subaccount to the main account. Use `operation=withdrawSubaccount`. | Operation result (success/info) |
| `/v1/subaccount/{id}/debit` | POST | `Woovi` | `Subaccount ID` (string) — required; `Amount` (number, cents) — required; `Description` (string) — optional | Debit (move) value from a subaccount to the main account with an optional description. Use `operation=debitSubaccount`. | Operation result (success/info) |
| `/v1/subaccount/{id}` | DELETE | `Woovi` | `Subaccount ID` (string) — required | Delete a subaccount (only allowed if balance == 0). Use `operation=deleteSubaccount`. | Operation result (success/info) |
| `/v1/subaccount/transfer` | POST | `Woovi` | `Value` (number, cents) — required; `From Pix Key` (string) — required; `To Pix Key` (string) — required; `CorrelationID` (string) — optional | Transfer funds between subaccounts. Use `operation=transferSubaccounts` and provide transfer details. | Operation result (success/info) |
| `/v1/subaccount` | GET | `Woovi` | — | List subaccounts for the company. Use the `resource=subaccount` and `operation=listSubaccounts` in the `Woovi` node. | Array of subaccount objects (id, pixKey, name, balance, ...)
| `/v1/subaccount/{id}` | GET | `Woovi` | `Subaccount ID` (string) — required | Get a single subaccount's details. Use `resource=subaccount` + `operation=getSubaccount` and provide `Subaccount ID`. | Subaccount object with details (id, pixKey, name, balance, createdAt, ...)
| `/v1/subaccount` | POST | `Woovi` | `Pix Key` (string) — required (or other identifying fields) ; `Subaccount Name` (string) — optional | Create or retrieve a subaccount by `pixKey`. Use `resource=subaccount` + `operation=createSubaccount`. | Created or existing subaccount object (id, pixKey, name, ...)
| `/v1/subaccount/{id}/withdraw` | POST | `Woovi` | `Subaccount ID` (string) — required; `Amount` (number, cents) — required | Withdraw (partial) from a subaccount to the main account. Use `operation=withdrawSubaccount`. | Operation result (success/info)
| `/v1/subaccount/{id}/debit` | POST | `Woovi` | `Subaccount ID` (string) — required; `Amount` (number, cents) — required; `Description` (string) — optional | Debit (move) value from a subaccount to the main account with an optional description. Use `operation=debitSubaccount`. | Operation result (success/info)
| `/v1/subaccount/{id}` | DELETE | `Woovi` | `Subaccount ID` (string) — required | Delete a subaccount (only allowed if balance == 0). Use `operation=deleteSubaccount`. | Operation result (success/info)
| `/v1/subaccount/transfer` | POST | `Woovi` | `Value` (number, cents) — required; `From Pix Key` (string) — required; `To Pix Key` (string) — required; `CorrelationID` (string) — optional | Transfer funds between subaccounts. Use `operation=transferSubaccounts` and provide transfer details. | Operation result (success/info)
|  `/v1/customer`    | POST |  `Woovi` | `name` (string) — required; **at least one of:** `taxID` (string), `email` (string), or `phone` (string) — required; `correlationID` (string) — optional; `address` (object: { zipcode (string), street (string), number (string), neighborhood (string), city (string), state (string), complement (string), country (string) }) — optional, but if provided all fields except `complement` must be filled | Create a new customer. Use `resource=customer` + `operation=createCustomer` and provide `name` plus at least one identifier (`taxID`, `email`, or `phone`) | Operation result (success/info) 
|  `/v1/customer`  | GET | `Woovi` | — | List customers of the company. Use `resource=customer` + `operation=listCustomers` | Operation result (success/info)
|  `/v1/customer/{id}`  | GET | `Woovi` | `Id` CorrelationID or Tax ID (String) - required | Get a customer of the company. Use `resource=customer` + `operation=getCustomer` and provide a `id` that could be `Tax ID` or `Correlation ID` | Operation result (success/info)
|  `/v1/customer/{id}`    | PATCH |  `Woovi` | `correlationID` (string) — required; `name` (string) — optional; `taxID` (string) — optional; `email` (string) — optional; `phone` (string) — optional; `address` (object: {  zipcode — (string); street — (string); number — (string); neighborhood — (string); city — (string);state — (string);complement — (string);country — (string) }) — optional if not provided | Update an existing customer. Use `resource=customer` + `operation=updateCustomer` and provide fields to update | Operation result (success/info)
|  `/v1/refund`  | GET | `Woovi` | — | List refunds of the company. Use `resource=refund` + `operation=listRefunds` | Operation result (success/info)
|  `/v1/refund/{id}`  | GET | `Woovi` | `Id` Refund ID or Correlation ID (String) - required | Get a refund of the company. Use `resource=refund` + `operation=getRefund` and provide a `id` that could be `Refund ID` or `Correlation ID` | Operation result (success/info)
|  `/v1/refund`    | POST |  `Woovi` | `value` (number) — required; `correlationID` (string) — required; `transactionEndToEndId` (string) required; `comment` (string) optional | Create a new refund. Use `resource=refund` + `operation=createRefund` and provide `value`, `transactionEndToEndId` and `correlationID` at least | Operation result (success/info)
|  `/v1/invoice`  | GET | `Woovi` | `limit` (number) — optional (default: 20); `skip` (number) — optional (default: 0); `start` (string, format: YYYY-MM-DD) — optional; `end` (string, format: YYYY-MM-DD) — optional | List invoices of the company. Use `resource=invoice` + `operation=listInvoices` and optionally filter by date range | Array of invoice objects
|  `/v1/invoice/{correlationID}/cancel`  | POST | `Woovi` | `correlationID` (string) — required | Cancel an invoice. Use `resource=invoice` + `operation=cancelInvoice` and provide the invoice `correlationID` | Operation result (success/info)
|  `/v1/invoice/{correlationID}/pdf`  | GET | `Woovi` | `correlationID` (string) — required | Get invoice PDF. Use `resource=invoice` + `operation=getInvoicePdf` and provide the invoice `correlationID` | PDF file data
|  `/v1/invoice/{correlationID}/xml`  | GET | `Woovi` | `correlationID` (string) — required | Get invoice XML. Use `resource=invoice` + `operation=getInvoiceXml` and provide the invoice `correlationID` | XML file data
|  `/v1/invoice`  | POST | `Woovi` | `billingDate` (string, ISO 8601) — required; `correlationID` (string) — required; **one of:** `charge` (string) OR `value` (number) — required; `description` (string) — optional; `customerId` (string) — optional; `customer` (object with taxID, name, email, phone, address) — optional (if provided, all customer fields are required) | Create a new invoice. Use `resource=invoice` + `operation=createInvoice` and provide required fields | Operation result (success/info)
|  `/v1/installments/{id}`  | GET | `Woovi` | `id` (string) — required (globalID or endToEndId) | Get a single installment's details. Use `resource=installment` + `operation=getInstallment` and provide the installment `id` (either globalID or endToEndId) | Installment object with details (globalID, endToEndId, value, status, ...)
|  `/v1/installments/{id}/cobr`  | POST | `Woovi` | `id` (string) — required (globalID); `value` (number, cents) — optional | Create CobR manually for an installment. Use `resource=installment` + `operation=createInstallmentCobr` and provide the installment `id`. Optionally provide custom `value` in cents, otherwise uses the installment value | Created CobR object with details (globalID, value, brCode, pixKey, status, ...)
|  `/v1/installments/{id}/cobr/retry`  | POST | `Woovi` | `id` (string) — required (globalID) | Manually retry CobR creation for an installment. Use `resource=installment` + `operation=retryInstallmentCobr` and provide the installment `id` | Created CobR object with details (globalID, value, brCode, status, ...)
|  `/v1/subscriptions`  | GET | `Woovi` | — | List all subscriptions of the company. Use `resource=subscription` + `operation=listSubscriptions`. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Array of subscription objects (id, status, value, dayGenerateCharge, customer, ...)
|  `/v1/subscriptions/{id}`  | GET | `Woovi` | `id` (string) — required | Get a subscription's details. Use `resource=subscription` + `operation=getSubscription` and provide the subscription `id`. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Subscription object with details (id, status, value, dayGenerateCharge, customer, ...)
|  `/v1/subscriptions`  | POST | `Woovi` | `value` (number, cents) — required; `type` (PIX_RECURRING or RECURRENT) — required; `correlationID` (string) — required; `customer` (object: name, email, phone, taxID, address) — required; `name` (string) — optional; `comment` (string) — optional; `dayGenerateCharge` (number 1-31, default 5) — optional; `frequency` (WEEKLY, MONTHLY, SEMIANNUALLY, ANNUALLY) — optional; `dayDue` (number >=3, default 7) — optional | Create a new subscription. Use `resource=subscription` + `operation=createSubscription` and provide all required fields including complete customer data with address. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Created subscription object with id and details
|  `/v1/subscriptions/{id}/cancel`  | PUT | `Woovi` | `id` (string) — required | Cancel a subscription. Use `resource=subscription` + `operation=cancelSubscription` and provide the subscription `id`. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Subscription object with status CANCELED
|  `/v1/subscriptions/{id}/value`  | PUT | `Woovi` | `id` (string) — required; `value` (number, cents) — required (must be > 0) | Update the value of future subscription installments (when allowed). Use `resource=subscription` + `operation=updateSubscriptionValue` and provide the subscription `id` and new `value`. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Updated subscription object with new value
|  `/v1/subscriptions/{id}/installments`  | GET | `Woovi` | `id` (string) — required | List all installments for a subscription. Use `resource=subscription` + `operation=listSubscriptionInstallments` and provide the subscription `id`. **⚠️ Note: Subscriptions only work in Woovi production environment (not available in sandbox)** | Array of installment objects (globalID, endToEndId, value, status, ...)
|  `/v1/pix-keys`  | POST | `Woovi` | `pixKey` (string) — optional for EVP; `pixKeyType` (string, CNPJ or EVP) — required | Create a new pix key. Use `resource=pixKey` + `operation=create` and provide `pixKeyType`. For CNPJ type, `pixKey` is required. | Pix Key object (key, type, status, ...)
|  `/v1/pix-keys`  | GET | `Woovi` | — | List all pix keys. Use `resource=pixKey` + `operation=list`. | Array of Pix Key objects and account info
|  `/v1/pix-keys/{pixKey}/check`  | GET | `Woovi` | `pixKey` (string) — required | Check a pix key. Use `resource=pixKey` + `operation=check` and provide the `pixKey`. | Pix Key object (key, type, status, ...)
|  `/v1/pix-keys/{pixKey}/default`  | POST | `Woovi` | `pixKey` (string) — required | Set a pix key as default. Use `resource=pixKey` + `operation=setDefault` and provide the `pixKey`. | Operation result (success/info)
|  `/v1/pix-keys/{pixKey}`  | DELETE | `Woovi` | `pixKey` (string) — required | Delete a pix key. Use `resource=pixKey` + `operation=delete` and provide the `pixKey`. | Operation result (success/info)
|  `/v1/pix-keys/tokens`  | GET | `Woovi` | — | Get tokens data for pix keys. Use `resource=pixKey` + `operation=getTokens`. | Tokens info (limit, refresh)
|  `/v1/qrcode-static`  | POST | `Woovi` | `name` (string) — required; `value` (number, cents) — required; `correlationID` (string) — optional; `comment` (string) — optional; `pixKey` (string) — optional | Create a new static Pix QR code. Use `resource=qrCodeStatic` + `operation=create` and provide required fields. | QR Code object (brCode, qrCodeImage, paymentLinkUrl, ...)
|  `/v1/qrcode-static/{id}`  | GET | `Woovi` | `qrCodeId` (string) — required | Get a static Pix QR code. Use `resource=qrCodeStatic` + `operation=get` and provide the `qrCodeId` (ID, correlation ID, or identifier). | QR Code object (id, name, value, status, ...)
|  `/v1/qrcode-static`  | GET | `Woovi` | `limit` (number) — optional (default: 20); `skip` (number) — optional (default: 0) | List all static Pix QR codes. Use `resource=qrCodeStatic` + `operation=list`. Optionally provide `limit` and `skip` for pagination. | Array of QR Code objects
| `/v1/payment` | POST | `Woovi` | `paymentType` (`PIX_KEY`/`QR_CODE`/`MANUAL`) — required; `value` (number, cents) — required; `correlationID` (string) — required. Optional: `destinationAlias`, `destinationAliasType` (`CPF`,`CNPJ`,`EMAIL`,`PHONE`,`RANDOM`), `pixKeyEndToEndId`, `comment`, `metadata` (JSON object, max 30 keys). | Request a payment (PIX key / QR code / manual). Use `resource=payment` + `operation=create` and provide required fields. | `payment` object with fields like `type`, `value`, `destinationAlias`, `destinationAliasType`, `qrCode` (when `QR_CODE`), `correlationID`, `comment`, `status` |
| `/v1/payment` | GET | `Woovi` | `limit` (number) — optional (default: 20); `skip` (number) — optional (default: 0); `correlationID` (string) — optional; `status` (string) — optional | List payments for the company. Use `resource=payment` + `operation=list` and optionally filter by `correlationID` or `status`. | Array of payment objects |
| `/v1/payment/{id}` | GET | `Woovi` | `id` (string) — required (payment ID or correlationID) | Get a single payment by ID or correlationID. Use `resource=payment` + `operation=get` and provide `id`. | Payment object with details (payment, transaction, destination) |
Note: In the n8n node the `metadata` field is entered as a key/value collection (fixed collection) and will be converted to a JSON object by the node (maximum 30 keys). For `paymentType = QR_CODE` the `value` is optional and the node omits the `value` field when creating a QR code payment.
| `/v1/psp` | GET | `Woovi` | `ispb` (string) — optional; `name` (string) — optional; `compe` (string) — optional | List PSPs (Payment Service Providers). Use `resource=psp` + `operation=list` and optionally filter by `ispb`, `name`, or `compe`. | Array of PSP objects (name, ispb, code, compe) |

Common events available in the trigger: `OPENPIX:CHARGE_CREATED`, `OPENPIX:CHARGE_COMPLETED`, `OPENPIX:CHARGE_EXPIRED`, `OPENPIX:TRANSACTION_RECEIVED`, `OPENPIX:TRANSACTION_REFUND_RECEIVED`, `OPENPIX:MOVEMENT_CONFIRMED`, `OPENPIX:MOVEMENT_FAILED`, `OPENPIX:MOVEMENT_REMOVED`, and `ALL`.

Tip: select `ALL` to receive every event and branch inside the workflow by inspecting the event payload's `event` field.


## Contributing

1. Fork it (<https://github.com/entria/n8n-nodes-woovi/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'feat(fooBar) Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
