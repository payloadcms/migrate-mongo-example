import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    /**
     * /migrations/20221221120758-update-users-change-name.js
     *
     * Fields being migrated from separate first and last, to single name field
     *
    // {
    //    name: 'firstName',
    //    type: 'text',
    //  },
    // {
    //    name: 'lastName',
    //    type: 'text',
    //  },
     *
     * New field 'name' was populated from the same migration
     */
    {
      name: 'name',
      type: 'text',
      /**
       * /migrations/20221222033714-remove-unique-index.js
       *
       * Removing unique: true requires a migration to delete it from the database once created
       *
       // unique: true,
       */
    },
  ],
};

export default Users;
