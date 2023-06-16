## Name:
API Example

## Description:
Example of new REST APIs built on top of VTEX IO.

Exposed routes:
```
"routes": {
  "updateInventory": {
    "path": "/v1/inventory/skus/:refId/warehouses/:warehouseId",
    "public": true
  }
}
```

_Note: The behaviour of this API is the same as the [Update inventory by SKU and warehouse API](https://developers.vtex.com/docs/api-reference/logistics-api#put-/api/logistics/pvt/inventory/skus/-skuId-/warehouses/-warehouseId-) with the only difference that you need to use the SKU Reference ID instead of the SKU ID_

## Proof points:
- External API calls
- Build new REST APIs

## How to demo:

1. Clone/Download this repository and open it with a code editor of your choice, eg. VSCode

2. Open the terminal and login to your VTEX account

```
vtex login {{account}}
```

3. Create a new development workspace or use an existing one

```
vtex use {{workspace}}
```

4. Add the account name as the vendor on `manifest.json` file

```
{
  "name": "api-wrapper-example",
  "vendor": "{{account}}",
  "version": "0.0.1",
  "title": "API Example",
  "description": "Example of new REST APIs built on top of VTEX IO.",
  "mustUpdateAt": "2018-01-04",
  ...
  ...
}
```

5. Link the project

```
vtex link
```

6. After the linking, open Postman and make some API calls

```
PUT
https://{{workspace}}--{{account}}.myvtex.com/v1/inventory/skus/:refId/warehouses/:warehouseId

Request Body:
{
  "unlimitedQuantity": false,
  "dateUtcOnBalanceSystem": "null",
  "quantity": 106
}
```
