const { pool, mssql } = require('../../connect')
module.exports = function () {
    this.getUser = async function (end) {
        var sql = "select * from NguoiSD"
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

    this.register = async function (newdata, end) {
        var sql = "INSERT INTO NguoiSD (Username,Password, Email, PhoneNumber, Address,FullName ) VALUES(@username, @password, @email, @phonenumber,  @address, @fullname)";
        try {
            await pool.connect()
            return await pool.request()
                .input('username', mssql.NVarChar, newdata.Username)
                .input('password', mssql.NVarChar, newdata.Password)
                .input('email', mssql.NVarChar, newdata.Email)
                .input('phonenumber', mssql.NVarChar, newdata.PhoneNumber)
                .input('address', mssql.NVarChar, newdata.Address)
                .input('fullname', mssql.NVarChar, newdata.FullName)
                .query(sql, (err, data) => {
                    if (err) {
                        end(true, null)
                        console.log(err)
                    }
                    else {
                        
                        end(null, newdata)
                    }
                })
               
        }
        catch (err) {
            console.log(err)
        }
    }
    
    //Xóa thông tin người dùng
    this.DeleteInfoUser= async (id, end)=>{
     
        var sql="DELETE FROM NguoiSD WHERE Id=@id";
        await pool.connect()
        return await pool.request()
        .input('id',mssql.Int,id)
        .query(sql,(err,data)=>{
            if(err){
                end(true,null)
                console.log(err)
            }
            else {
                console.log(id)
                end(null,"Xóa người dùng thành công,")
            }
        })
    }

}