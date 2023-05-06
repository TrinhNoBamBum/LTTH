const { pool, mssql } = require('../../connect')
module.exports = function () {
    this.PostCart = async (newdata, end) => {
        var sql = "EXEC AddCart @masp=@product_id , @quantity=@quantity,@user_id=@user_id";
        try {
            await pool.connect()
            return await pool.request()
                .input('product_id', mssql.Int, newdata.Product_Id)
                .input('quantity', mssql.Int, newdata.Quantity)
                .input('user_id',mssql.Int,newdata.User_Id)
                .query(sql, (err, data) => {
                    if (err) {
                        end(true, null)                   
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


    this.GetCart= async (Id,end)=>{
        var sql="Select c.Quantity_Cart, p.Title,p.Photo,p.Price,p.Id from Product p, Cart c where p.Id=c.Product_Id and c.UserId=@id"
        try {
            await pool.connect()
            return await pool.request()
            .input('id',mssql.Int,Id)
            .query(sql, (err, data)=>{
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

    this.DeleteCart= async (id, end)=>{
     
        var sql="DELETE FROM Cart WHERE Product_Id=@id";
        await pool.connect()
        return await pool.request()
        .input('id',mssql.Int,id.Id)
        .query(sql,(err,data)=>{
            if(err){
                end(true,null)
            }
            else {
                console.log(id)
                end(null,"Xóa sản phẩm thành công,")
            }
        })
    }

    this.PutCart = async (newdata, end) => {
        var sql = "UPDATE Cart Set Title=@title,Category_Id=@category Where Id=@id"
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, newdata.Id)
            .input('title', mssql.NVarChar, newdata.Title)
            .input('category', mssql.Int, newdata.Category_Id)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, null)
                }
                else {
                    end(null, newdata)
                }
            })
    }
    this.DeleteAllCart=async (newdata, end)=>{
        var sql="delete from cart";
        await pool.connect()
        return await pool.request()
        .query(sql,(err,data)=>{
            if(err){
                end(true,null)
            }
            else {
             
                end(null,"Xóa sản phẩm thành công,")
            }
        })
    }
}