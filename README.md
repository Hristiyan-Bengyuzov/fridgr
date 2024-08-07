# Fridgr

Fridgr is an app consisting of React frontend and ASP.NET web api. The point of the app is to return recipes based on ingredients we have in our fridge so that we can cook something up.

## Client

The client-side of Fridgr is responsible for the user interface and interaction with the server API.

### Folder Structure

- **`__tests__`**: Contains unit tests for the client-side code, using Vitest.
- **`components`**: Houses all the React components used in the application.
- **`services`**: Includes functions for interacting with the server API.
- **`types`**: Contains TypeScript type definitions used across the client code.
- **`guards`**: Implements authentication guards for managing user and guest access.
- **`contexts`**: Manages authentication context and state.
- **`assets`**: Includes images and CSS styles used in the application.
- **`utils`**: Provides utility functions used throughout the client code.

## Server

The server-side of Fridgr handles data management, business logic, and API endpoints.

### Folder Structure

- **`Fridgr.Common`**: Contains global constants used throughout the application.
- **`Fridgr.Data`**: Includes repository definitions, data seeders, and the DbContext for data access.
- **`Fridgr.Data.Models`**: Contains entity definitions for the database.
- **`Fridgr.Services.Data`**: Implements the service layer for interacting with the database.
- **`Fridgr.Services.Mapping`**: Contains custom AutoMapper configuration.
- **`Fridgr.Web.DTOs`**: Provides Data Transfer Objects (DTOs) to facilitate data transfer between the client and server.
- **`webapi`**: Contains controllers and startup configuration for the web API.

### Testing

Unit tests are located in the `__tests__` directory and are implemented using Vitest. To run the tests, use the following command:

```
npx vitest
```
