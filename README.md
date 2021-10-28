# metron-test
After cloning the project and cding into the `metron-test` directory, please add a .env file at the root of the server folder with the following env vars:

```
CONSUMER_KEY=your
CONSUMER_SECRET=keys
ACCESS_TOKEN_KEY=go
ACCESS_TOKEN_SECRET=here
```

then run the following commands to launch the twitter api web socket server:
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

I added this Chrome extension to allow Cors https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en. Please install this and activate in the Chrome browser in which you run the client.

Note: occassionally a 420 error (`Exceeded connection limit for user`) causes the server to crash. Please relaunch the server and refresh the client if this happens.


https://user-images.githubusercontent.com/25933535/139146622-aa4f78f5-4fc5-4620-8515-c295deca9dc2.mov



