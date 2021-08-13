## Notes

1. You will need to setup the `.env` file before running the server. To get VAPID keys run `npx web-push generate-vapid-keys`.
2. `yarn dev` Spins up the server with nodemon.
3. `yarn start` Meant for deployed services to use.

- The routes are simple, with a sub / unsub route and sanity GET `/` route.
- Database methods are also simple with just a basic insert / delete / fetchAll.
- Notification dir is for Push Notification management.
