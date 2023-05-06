const  mssql  = require('mssql/msnodesqlv8')

var config={
    server:"LAPTOP-JORT776T\\SQLEXPRESS",
    user:"sa",
    password:"Trinhkut3",
    database:"fashion",
    driver:"SQL Server",
    option: {
        encrypt:false, 
        enableArithAbort:false
    }

}
const pool= new mssql.ConnectionPool(config)


module.exports={
    pool,
    mssql
   
}