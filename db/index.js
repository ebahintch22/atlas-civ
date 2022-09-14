/*const { Pool } = require('pg')
const pool = new Pool()
module.exports = {
  query: function (text, params, callback){
    const start = Date.now()
    return pool.query(text, params, function(err, res) {
      const duration = Date.now() - start
      //console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)
    })
  },
}*/


const { Pool } = require('pg')
const config_string = (process.env.USE_SSL == 0 )? {} : 
	{
	  connectionString: process.env.DATABASE_URL,
	  ssl: {
	    rejectUnauthorized: false
	  }
	}

const pool = new Pool( config_string )
module.exports = {
  query: function (text, params, callback){
    console.log( ` Config String = ${ config_string } ` )
    const start = Date.now()
    return pool.query(text, params, function(err, res) {
      const duration = Date.now() - start
      callback(err, res)
    })
  }
}

