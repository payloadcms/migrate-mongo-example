# Migrate Mongo Payload Example

This repo is a working demonstration of using `mongo-migrate` in a Payload CMS project

## In a real world scenario

1. App is developed
2. Tested
3. Goes to production
4. Actual data is created over time
5. App needs to have data changed on fields and collections with existing data

This is a demonstration of what to do at this step.

## Recreating this setup
1. `npx create-payload-app`
2. `cd` to newly created project
3. `yarn add migrate-mongo`
4. `yarn migrate-mongo init`
5. Customize your migrate-mongo-config.js to have the connection string of your mongo database
6. Add script to package.json to make using migrations easier `"migrate": "migrate-mongo"`

See example changes in [Users.ts](src%2Fcollections%2FUsers.ts), changes to name fields left in comments.
See migration [20221221120758-update-users-change-name.js](migrations%2F20221221120758-update-users-change-name.js)

## Workflow for development
1. Make changes to existing Payload collections
2. If a migration to change existing data is necessary:
3. `yarn migrate create update_collection-name_rename_field`, come up with a consistent format & naming convention for migration files
4. Write the `up` and `down` functions to perform the changes needed, test using local data with simulated production data
5. Commit both the migrations and code changes together in a branch and merge it
6. When pulling changes to a new environment (dev, staging, prod) with data, run `yarn migrate up` and `yarn migrate status` to verify

Migrations are only needed when existing data has changed, they are not needed for simply adding a new field or index. Another use-case for migrations is to insert necessary data for applications to function. Suppose you are adding `roles` as a relationship to be defined on User collections which you want stored in the database and consistent across environments, this is one example and there are many more.
