<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Restaurant Finder Coding Challenge</p>
    <p align="center">

## Pre requisites

- Google AI Studio API key: 
  - Create an api key by visiting this page https://aistudio.google.com/apikey
- Four Square Space API key: 
  - Create a project https://foursquare.com/developers/home
  - Click the project created, then create a `Service API Key`

## Project setup

```bash
$ npm install
```

#### Setup environment variables

- Create a .env file in the root folder of the project. Copy the contents of .env.example into the new .env file.
- Assign the Google API key in the `GOOGLE_API_KEY` variable
- Assign the Four Square Space API key in the `FSS_API_KEY` variable
- Asssign a value to the `AUTH_CODE` variable

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
