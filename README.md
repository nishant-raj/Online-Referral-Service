# Referral System

## Project setup
```
npm install
```

### To run the server
```
npm run server 
```

### To run the client
```
npm run client
```
- Run both client and server.
- Now open localhost:3000 in browser. You will land-up on the user registration page.

### Project Description

- For backend, I have used Node and Express, for frontend VueJs is being used,  And i have stored data in Local Filestorage.

- All Frontend code present in src/components.
- All the routes for this app is being defined in src/router/index.js
- All backend code is present in src/server.
- All API endpoints is defined in src/server/routes.
- lib/storageHandler conatins handler function to perform CRUD. For this project i have used filestorageHandler.
- Data is being stored in temp/index.json as a JSON Array.

### Assumption
- If a user register with valid referral code then both referrer and referee will get 50 grofer cash.
- A referrer will achieve a milestone if total referral count will be multiple of 5.
- On achieving a milestone referrer will get additional grofer cash of value 100*(milestone).


