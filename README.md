
# Drive. Challenge

The objective is to build a service that will provide on-demand scheduling of EV test drives to customers.


## Setup the project

Step 1:
In the root of the project folder run:
```
npm run install-all
```
Step 2: In the `server` folder add the following to .env file (these values will be given to you).
```
FIREBASE_CONFIG_API_KEY=""
FIREBASE_CONFIG_AUTH_DOMAIN=""
FIREBASE_CONFIG_PROJECT_ID=""
FIREBASE_CONFIG_STORAGE_BUCKET=""
FIREBASE_CONFIG_MESSAGE_SENDER_ID=""
FIREBASE_CONFIG_APP_ID=""
```


## Run the project

Step 1:
In the root of the project folder run, the following commands in your terminal:
```
npm run dev
```
This will start up the `server` and the client app together.

#### To run the server on its own, run the following commands:
If you are not in the `server` folder, go into it by running:
```
cd server
```
If you are in the server folder:
```
npm start
```

#### To run the `client` application on its own, run the following commands _(not advised as nothing will load)_:
If you are not in the `client` folder, go into it by running:
```
cd client
```
If you are in the server folder:
```
npm run dev
```


## Running the project in a Docker container

To run the project in a Dokcer container run the following command:
```
docker-compose up --build
```
This will start and build the Docker containers based on the configuration defined in the docker-compose.yml
## Running Tests

To run tests, run the following command in the `client` folder _(Note: there are currently no tests for the server application)_

```
  npm test
```

## Improvements _(this is currently a very simple MVP)_

Changes for the future.
* Tests for server files
* More test for client files
* Notifications to person making reservation.
* User login and auth before reservations.
* Initial display screen needs a loading screen/spinner.
* Setup firebase to run locally.
* UI improvements.