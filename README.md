# Project

This is a simple api Built with the Nodejs Framework `Restify`, Relational ORM `Sequelize`. 

Upload csv files considering the format of the template `expenses.csv` inside the folder `uploads`.

It has an endpoint `http://localhost:3000/upload` (You can change the port and host if you prefer, setting the variables process.env.HOST process.env.PORT) to the this expense csv and persist on 2 entities: `Employee` and `Expense`.
The frontend for this project can be found is [This small Reactjs Project] (https://github.com/marcogbarcellos/csv-uploader-react)


## Database

You'll need to have PostgreSql(version 9.5) installed and create a database called `expenses`.
It uses by default the settings: `port 5432, host:localhost, user: postgres, pass:postgres`. It can also be customized setting `process.env` variables which you can take a look on `config/config.js`

## Installation

```
npm install
```

## Usage

```
yarn && yarn start
```

You can either use the [Frontend Project](https://github.com/marcogbarcellos/csv-uploader-react) or a curl command through the terminal to test the uploading :

```
curl -i -X POST -H "Content-Type: multipart/form-data" -F "blob=@/PATH-TO-YOUR_CSV-FILE/YOUR_FILE.csv" -v http://localhost:3000/upload
```

## Things to do(no time for now)

- Unit tests using lab,
- Validations(Csv File),
- Improve bunyan logging,
- Authentication using JWT(access tokens)
	

