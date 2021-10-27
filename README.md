# metron-test
After cloning the project run the following to launch the twitter api web socket server:
```
cd server
yarn install
yarn run dev
```

To launch the client server:
```
cd ../client
yarn install
yarn start
```

Note: occassionally a 420 error (Exceeded connection limit for user) causes the server to crash. Please relaunch the server and refresh the client if this happens
