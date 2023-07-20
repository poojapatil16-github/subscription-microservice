# Project Name

Subscription Management Microservices


## Description

The Subscription Management Microservices is a set of microservices built using Nest.js and TypeORM. It includes a User Management Service and Subscription Management Service, providing endpoints for user registration, login, and subscription management.



## Installation
1. Clone the repository.

```bash
git clone https://github.com/your-username/subscription-management-microservices.git
```

2. Install dependencies.

```bash
cd subscription-management-microservices/user-management-service
npm install

cd ../subscription-service
npm install
```
3. Set up the database connection by configuring the TypeORM settings in app.module.ts.

```bash
// user-management-service/app.module.ts

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your-database-username',
      password: 'your-database-password',
      database: 'userManagement',
      entities: [User, Subscription, Partner, Service],
      synchronize: true,
    }),
    // Other imports...
  ],
  // Other module configurations...
})
export class AppModule {}

```

## Configuration

Ensure that you have running MongoDB databases with the names subscriptionManagement, and appropriate credentials. Update the TypeORM settings in app.module.ts files to match your database configurations.

Please ensure you have RabbitMq installed and running for this project.
Please make changes in rabbitMQ service for rabbitMq url changes.

## Usage

Start the microservices.

```bash
npm run start
```
By default, the service runs on http://localhost:4000.


# Endpoints

The following endpoints are available:
Below endpoints are not guarded.

1. POST /subscription/subscribe: Subscribe to a service.

Request Body:
```bash
{
  "email": "test@mail.com",
  "partnerCode": "Partner1",
  "serviceCode": "Service1"
}
```

2. POST /subscription/unsubscribe: Unsubscribe from a service.

Request Body:

```bash
{
  "email": "test@mail.com",
  "partnerCode": "Partner1",
  "serviceCode": "Service1"
}
```


## License

[MIT](https://choosealicense.com/licenses/mit/)