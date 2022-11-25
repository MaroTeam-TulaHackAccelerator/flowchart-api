db.createUser(
  {
    user  : 'admin',
    pwd   : 'admin',
    roles : [
      {
        role : 'readWrite',
        db   : 'flowchart-api-db'
      }
    ]
  }
)