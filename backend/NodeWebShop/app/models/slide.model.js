const { pool, mssql } = require('../../connect')
module.exports = function () {
    this.GetSlide= async (end)=>{
        var sql="select top 3 * from slide"
        try {
            await pool.connect()
            return await pool.request().query(sql, (err, data)=>{
                if (data.recordset.length > 0) {
                    end(null, data.recordset)
                }
                else {
                    end(true, null)
                }
            })
        }
        catch(err) {
            console.log(err)

        }
    }
}