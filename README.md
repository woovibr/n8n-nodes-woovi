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

## API Reference

- [Woovi API](https://developers.woovi.com/docs/apis/api-getting-started)

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

Common events available in the trigger: `OPENPIX:CHARGE_CREATED`, `OPENPIX:CHARGE_COMPLETED`, `OPENPIX:CHARGE_EXPIRED`, `OPENPIX:TRANSACTION_RECEIVED`, `OPENPIX:TRANSACTION_REFUND_RECEIVED`, `OPENPIX:MOVEMENT_CONFIRMED`, `OPENPIX:MOVEMENT_FAILED`, `OPENPIX:MOVEMENT_REMOVED`, and `ALL`.

Tip: select `ALL` to receive every event and branch inside the workflow by inspecting the event payload's `event` field.


## Contributing

1. Fork it (<https://github.com/entria/n8n-nodes-woovi/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'feat(fooBar) Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
