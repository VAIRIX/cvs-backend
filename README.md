![Build integration](https://github.com/VAIRIX/cvs-backend/actions/workflows/build-integration.yml/badge.svg?branch=dev)

## Vairix - CVs (Internal)

#### 1. Add required files

Place the following files in the directory: `src/config/env/`:

- `development.env`
- `google_cloud_credentials.json`

_Please ask to your Technical lead or your teammates for the files._

#### 2. Run docker-compose to run the application in your local environment:

To run docker-compose, you will need to have `Docker` and `docker-compose` installed on your system. Once you have both of these tools installed, you can use the following steps to run docker-compose:

Open a terminal window and navigate to the root directory of the project.

Run the following command to build and start all the services defined in your docker-compose.yml file:

`$ docker-compose --env-file src/config/env/development.env up`

This command will build the images for each service, if they do not already exist, and then start the services. The output of each service will be displayed in the terminal.
