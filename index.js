const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'myproject'
const client = new MongoClient(url)
const assert = require('assert')

client.connect((err) => {
  assert.equal(null, err)
  console.log('Connected')
  
  const db = client.db(dbName)

  insertDocs(db, () => {
    console.log('inserted')
    findDocs(db, () => {
      client.close()      
    })
  })
})

const insertDocs = (db, callback) => {
  const collection = db.collection('docs')

  collection.insertMany([
    {a:1},{b:2},{c:3}
  ], (err, result) => {
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)

    console.log(result)
    
    callback(result)
  })
}

const findDocs = (db, callback) => {
  const collection = db.collection('docs')

  collection.find({}).toArray((err, docs) => {
    if(err){
      console.log(err)
    }
    assert.equal(err, null)
    console.log('Found the following records')
    console.log(docs)
  })
}


