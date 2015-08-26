var dbUser = process.env.DB_USER,
    dbPassword = process.env.DB_PASSWORD,
    dbTestUser = process.env.DB_TEST_USER,
    dbTestPassword = process.env.DB_TEST_PASSWORD;

module.exports = {
    development: {
        baseUrl: 'http://localhost',
        dbUri: 'mongodb://localhost/shopping-list-dev'
    },
    test: {
        baseUrl: 'http://localhost',
        dbUri: 'mongodb://localhost/shopping-list-test'
    },
    smoke: {
        baseUrl: 'https://porcomprar.herokuapp.com',
        dbUri: 'mongodb://' + dbTestUser + ':' + dbTestPassword + '@ds033133.mongolab.com:33133/shopping-list-test'
    },
    production: {
        baseUrl: 'https://porcomprar.herokuapp.com',
        dbUri: 'mongodb://' + dbUser + ':' + dbPassword + '@ds033133.mongolab.com:33133/shopping-list'
    }
};