module.exports = {
  async up(db, client) {
    await db.collection('users').dropIndex('name_1');
  },

  async down(db, client) {
    //
  }
};
