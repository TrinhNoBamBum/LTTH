const { pool, mssql } = require('../../connect')

module.exports = function () {
    this.getOrder = async function (end) {
        var sql = "select *  from  DonHang"
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

    this.AcceptOrder= async (newdata, end) => {
        var sql = "UPDATE DonHang Set status=@stt Where Id=@id"
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, newdata.Id)
            .input('stt', mssql.NVarChar, newdata.Status)
         
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


    // this.Checkout = async (newdata, end) => {
    //     var sql = "INSERT INTO DonHang (Fullname,Email,Payment,Phonenumber,Address,Totalmoney,Status,Created_At) VALUES(@fullname,@email,@payment,@phonenumber,@adress,@totalmoney,@status,@created_At)";
    //     try {
    //         await pool.connect()
    //         return await pool.request()
    //             .input('fullname', mssql.NVarChar, newdata.Title)
    //             .input('email', mssql.NVarChar, newdata.Title)
    //             .input('payment', mssql.NVarChar, newdata.Title)
    //             .input('phonenumber', mssql.NVarChar, newdata.Title)
    //             .input('address', mssql.NVarChar, newdata.Title)
    //             .input('totalmoney', mssql.NVarChar, newdata.Title)
    //             .input('status', mssql.Int, newdata.Category_Id)
    //             .query(sql, (err, data) => {
    //                 if (err) {
    //                     end(true, null)
    //                 }
    //                 else {
    //                     end(null, newdata)
    //                 }
    //             })
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }

    this.PutProduct = async (newdata, end) => {
        var sql = "UPDATE Product Set Title=@title,Category_Id=@category,Color=@color, Size=@size, Quantity=@quantity, Price=@price Where Id=@id"
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, newdata.Id)
            .input('title', mssql.NVarChar, newdata.Title)
            .input('category', mssql.Int, newdata.Category_Id)
            .input('price', mssql.Int, newdata.Price)
            .input('color', mssql.NVarChar, newdata.Color)
            .input('quantity', mssql.Int, newdata.Quantity)
            .input('size', mssql.NVarChar, newdata.Size)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, null)

                    console.log(err)
                }
                else {
                    end(null, newdata)
                    console.log(newdata)
                }
            })
    }

    this.DeleteProduct = async (newdata, end) => {

        var sql = "DELETE FROM PRODUCT WHERE Id=@id";
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, newdata.Id)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, null)
                    console.log("lỖI CON MẸ NÓ RỒI", err)
                }
                else {
                    end(null, "Xóa sản phẩm thành công")
                }
            })
    }
    this.FindProduct = async (id, end) => {

        var sql = "Select * from Product where Id=@id"
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, id)
            .query(sql, (err, data) => {
                if (err) {

                    end(true, "Không có gì")
                }
                else {
                    end(null, data.recordset)
                }
            })
    }
    //tìm kiếm tất cả

    this.FindAll = async (Infor, end) => {
        var sql = "select p.Id, p.Title, p.Price,p.Photo, p.Updated_At, p.Color,p.Size,p.Description,p.Quantity from product p,Category c where p.Category_Id=c.Id and c.Name like '%'+@name+'%'"
        await pool.connect()
        return await pool.request()
            .input('name', mssql.NVarChar, Infor)
            .query(sql, (err, data) => {
                if (err) {
                    console.log(err)
                    end(true, "Không có gì")
                }
                else {
                    console.log(Infor)
                    end(null, data.recordset)
                }
            })
    }

    this.GetProductByCategory = async (cate, end) => {
        var sql = "select * from Product p where p.Category_Id=@category_id"
        await pool.connect()
        return await pool.request()
            .input('category_id', mssql.Int, cate)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, "Lỗi khi tìm danh mục sản phẩm")

                }
                else {
                    end(null, data.recordset)
                }

            })

    }

    this.PostOrder = async (newdata, end) => {

        var sql = "INSERT INTO DonHang (UserId,Fullname,Email,Payment,Phonenumber,Address,TotalMoney,Status,Note,Created_At,Updated_At) VALUES(@user_Id,@fullname,@email,@payment,@phonenumber,@address,@totalMoney,@status,@note,@created_At,@updated_At)";
        try {
            await pool.connect()
            return await pool.request()
                .input('user_Id', mssql.Int, newdata.User_Id)
                .input('fullname', mssql.NVarChar, newdata.Fullname)
                .input('email', mssql.NVarChar, newdata.Email)
                .input('payment', mssql.NVarChar, newdata.Payment)
                .input('phonenumber', mssql.NVarChar, newdata.Phonenumber)
                .input('address', mssql.NVarChar, newdata.Address)
                .input('totalMoney', mssql.Int, newdata.TotalMoney)
                .input('status', mssql.NVarChar, newdata.Status)
                .input('note', mssql.NVarChar, newdata.Note)
                .input('created_At', mssql.Date, newdata.Created_At)
                .input('updated_At', mssql.Date, newdata.Updated_At)
                .query(sql, (err, data) => {
                    if (err) {
                        end(true, null)
                        console.log(err)
                    }
                    else {
                        end(null, newdata)
                        console.log({ newdata })
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    this.postDetailOrder =async (newdata, end) => {

        var sql = "INSERT INTO Order_Detail (Order_Id,Product_Id,Number) VALUES(@order_Id,@product_Id,@number)";
        try {
            await pool.connect()
            return await pool.request()
                .input('order_Id', mssql.Int, newdata.Order_Id)
                .input('product_Id', mssql.Int, newdata.Product_Id)
                .input('number', mssql.Int, newdata.Number)
                
              
                .query(sql, (err, data) => {
                    if (err) {
                        end(true, null)
                        console.log(err)
                    }
                    else {
                        end(null, newdata)
                        console.log({ newdata })
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    this.GetDetailOrder = async (ProductId, end) => {
        var sql = "select p.Id ,p.Title, p.Photo, o.Number,p.Price from Order_Detail o, Product p where o.Product_Id=p.Id and o.Order_Id=@id"
        await pool.connect()
        return await pool.request()
            .input('id', mssql.Int, ProductId)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, "Lỗi khi Chi tiết đơn hàng")

                }
                else {
                    end(null, data.recordset)
                    console.log( data.recordset)
                }

            })

    }
    this.ThongKe=async (end)=>{
        var sql = "select COUNT(Id) as N'TotalOrder', MONTH(Created_At) as N'Month' from DonHang group by MONTH(Created_At)"
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
    this.TotalMoney=async (end)=>{
        var sql = "select  Count(Id) as TotalOrder, SUM(TotalMoney) as TotalMoney from DonHang "
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