## Nest Js Project For KPI

## Development Stack:

- TypeScript
- NestJs
- TypeORM
- PostgreSQL

## Stack explanation

NestJs is the most powerful NodeJs Framework because of:

- Scale ability
- Built-in module structure
- Built-in flexible cli
- Built-in decorators (like @Controller, @Service, etc.)

## Database Tables Structure

## Todos Table

| Properties  | Data Types                  | Default Value | Not NULL |
|-------------|-----------------------------|---------------|----------|
| id          | integer                     |               | yes      |
| name        | character varying           |               | yes      |
| description | character varying           |               | yes      |
| endDate     | timestamp without time zone |               | no       |
| isActive    | boolean                     | true          | yes      |
| createdDate | timestamp without time zone | now           | yes      |
| updatedDate | timestamp without time zone | now           | yes      |


## Users Table

| Properties  | Data Types                  | Default Value | Not NULL |
|-------------|-----------------------------|---------------|----------|
| id          | integer                     |               | yes      |
| name        | character varying           |               | yes      |
| email       | character varying           |               | yes      |
| role        | user_entity_role_enum       | USER          | yes      |
| password    | character varying           |               | yes      |
| createdDate | timestamp without time zone | now           | yes      |
| updatedDate | timestamp without time zone | now           | yes      |