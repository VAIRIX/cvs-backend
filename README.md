## Vairix - CVs (Internal)

#### 1. Add required files

Place the following files in the root of the project:

- `.env`
- `google_cloud_credentials.json`

_Please ask your Technical lead or your teammates for the files._

#### 2. Run docker-compose to run the application in your local environment:

To run docker-compose, you must have `Docker` and `docker-compose` installed on your system. Once you have both of these tools installed, you can use the following steps to run docker-compose:

Open a terminal window and navigate to the root directory of the project.

Run the following command to build and start all the services defined in your docker-compose.yml file:

`$ docker-compose up`

This command will build the images for each service if they do not exist and start the services. The output of each service will be displayed in the terminal.

Since Docker is building and running the development environment, you don't need to run `$ npm install` in the project directory.
