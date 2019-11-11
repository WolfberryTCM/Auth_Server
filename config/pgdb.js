const {Pool} = require('pg')

const pool = new Pool({
    user:'hannbial',
    host: 'localhost',
    port:5432,
    database:'tcm'
})

module.exports = {
  query: (text,params,callback) => {
    const start = Date.now()
    return pool.query(text,params,(err,res) => {
      const duration = Date.now() - start
      console.log('executed query',{text,duration,rows:res.rowCount})
      callback(err,res)
    })
  },
  getClient: (callback) => {
    pool.connect((err,client,done) => {
      const query = client.query.bind(client)

      // monkey patch the query method to keep track of the last query executed
      client.query = () => {
        client.lastQuery = arguments
        client.query.apply(client,arguments)
      }

      // set a timeout of 5s, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.log('A client has been checked out for more than 5 seconds!')
        console.log(`The last executed query on this client was: ${client.lastQuery}`)
      },5000)

      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)

        // clear out timeout
        clearTimeout(timeout)

        // set the query method back to its old un-monkey-patched version
        client.query = query
      }

      callback(err,client,done)
    })
  }
}