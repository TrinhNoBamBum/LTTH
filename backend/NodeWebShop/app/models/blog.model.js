const { pool, mssql } = require('../../connect')
module.exports=function(){
    this.getBlog= async (end)=>{
        var sql = "select top 3 * FROM Blog"
        try {
            await pool.connect()
            const result = await pool.request().query(sql, (err, data) => {
                if (data.recordset.length > 0) {
                    end(null, data.recordset)
                }
                else {
                    end(true, null)
                }
            })
        }
        catch (err) {
            res.status(500).json(err)
        }
        

    }

    }
