module.exports = {
  async up (db, client) {
    await db.collection('users').updateMany({}, [
      {
        $set: {
          name: {
            $concat: [
              '$firstName', ' ', '$lastName'
            ]
          }
        }
      }, {
        $unset: [
          'firstName', 'lastName'
        ]
      }
    ])
  },

  async down (db, client) {
    await db.collection('users').updateMany({}, [
      {
        $set: {
          firstName: {
            $substr: [
              '$name',
              0,
              { '$indexOfBytes': ['$name', ' '] }
            ]
          },
          lastName: {
            $substr: [
              '$name',
              { $subtract: [
                { $indexOfBytes: ['$name', ' '] },
                  -1
                ] },
              { $strLenBytes: '$name' },
            ]
          }
        },
      },
      {
        $unset: ['name'],
      }
    ]);
  }
}
