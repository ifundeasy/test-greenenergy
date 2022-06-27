# README

## Installation
```sh
npm install
```

## Test
```sh
npm test
```

## Service demo
Turn on web service
```sh
npm start
# for developement
npm run start:dev
```

On terminal
```sh
curl -X POST \
  'localhost:3000' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '[
  { "productId": 1, "qty": 2 },
  { "productId": 2, "qty": 2 },
  { "productId": 3, "qty": 2 },
  { "productId": 4, "qty": 1 },
  { "productId": 5, "qty": 1 }
]' && echo
```