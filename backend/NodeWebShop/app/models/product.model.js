const { pool, mssql } = require('../../connect')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dkrd2iy0k",
    api_key: "528842643411232",
    api_secret: "o4HMJn57UsGIuByxnSLWfLY2yQk"
  });
  

module.exports = function () {
    this.getAll = async function (end) {
        var sql = "select *  FROM Product"
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


    // this.PostProduct = async (newdata, end) => {
    //     var sql = "INSERT INTO Product (Title,Category_Id) VALUES(@title, @category)";
    //     try {
    //         await pool.connect()
    //         return await pool.request()
    //             .input('title', mssql.NVarChar, newdata.Title)
    //             .input('category', mssql.Int, newdata.Category_Id)
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

    // this.PostProduct = async (newdata, end) => {

    //      cloudinary.uploader.upload("C:/Users/t490/OneDrive/Desktop/webShopThoiTrang/WebShopFashion/public/assets/img/product/", { folder: "ShopFashion" }, (error, result) => {
    //         if (error) {
    //             console.log('Error uploading image to Cloudinary:', error);
    //             return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    //         }
    //         const imageName = result.original_filename; // Tên ảnh trên Cloudinary
    //         const cloudinaryId = result.public_id; // Cloudinary ID của ảnh
    //         //const imagePath = newdata.file.originalname;
    //         var sql = "INSERT INTO Product (Title,Category_Id,Photo,Price,Color,Size,Description,Quantity) VALUES(@title, @category,@photo,@price,@color,@size,@description,@quantity)";
    //         try {
    //             await pool.connect()
    //             return await pool.request()
    //                 .input('title', mssql.NVarChar, newdata.body.Title)
    //                 .input('category', mssql.Int, newdata.body.Category_Id)
    //                 .input('photo', mssql.NVarChar, cloudinaryId)
    //                 // .input('photo', mssql.NVarChar,imagePath )
    //                 .input('price', mssql.Int, newdata.body.Price)
    //                 .input('color', mssql.NVarChar, newdata.body.Color)
    //                 .input('size', mssql.NVarChar, newdata.body.Size)
    //                 .input('description', mssql.NVarChar, newdata.body.Description)
    //                 .input('quantity', mssql.Int, newdata.body.Quantity)
    //                 .query(sql, (err, data) => {
    //                     if (err) {
    //                         end(true, null)
    //                     }
    //                     else {
    //                         end(null, newdata)
    //                     }
    //                 })
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     })
    // }
    this.PostProduct = async (newdata, end) => {
        try {
            const imagePath = newdata.file.originalname;
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(`C:/Users/t490/OneDrive/Desktop/webShopThoiTrang/WebShopFashion/public/assets/img/product/${imagePath}`, { folder: "ShopFashion" }, (error, result) => {
                    if (error) {

                        console.log('Error uploading image to Cloudinary:', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            const imageName = result.original_filename; // Tên ảnh trên Cloudinary
           
            const cloudinaryId = result.public_id; // Cloudinary ID của ảnh
            const index = cloudinaryId.indexOf("/")
            const newStr = cloudinaryId.substring(index + 1)
    
            var sql = "INSERT INTO Product (Title,Category_Id,Photo,Price,Color,Size,Description,Quantity) VALUES(@title, @category,@photo,@price,@color,@size,@description,@quantity)";
            await pool.connect();
            //SỬA RETURN 
            const data = await pool.request()
                .input('title', mssql.NVarChar, newdata.body.Title)
                .input('category', mssql.Int, newdata.body.Category_Id)
                .input('photo', mssql.NVarChar, newStr)
                .input('price', mssql.Int, newdata.body.Price)
                .input('color', mssql.NVarChar, newdata.body.Color)
                .input('size', mssql.NVarChar, newdata.body.Size)
                .input('description', mssql.NVarChar, newdata.body.Description)
                .input('quantity', mssql.Int, newdata.body.Quantity)
                .query(sql, (err, data) => {
                    if (err) {
                        end(true, null)
                    }
                    else {
                        end(null, newdata)
                        console.log(imageName)
                    }
                })
        } catch (error) {
            console.log(error);
            end(true, null);
        }
    }
    
    this.PaginationProduct=async (pageNumber, end) => {
      
        var sql = `SELECT * FROM product ORDER BY id  OFFSET (@pagenumber-1)*20 ROWS FETCH NEXT 20 ROWS ONLY`
        await pool.connect()
        return await pool.request()
            .input('pagenumber', mssql.Int, pageNumber)
            .query(sql, (err, data) => {
                if (err) {
                    end(true, "Loading . . .")

                }
                else {
                    end(null, data.recordset)
                }

            })

    }

    this.ModelComment = async (newdata, end) => {

        var sql = "INSERT INTO DanhGia (User_Id,Product_Id,NoiDung,Image,Star,Day) VALUES(@user_Id,@product_Id,@noidung,@image,@star,@day)";
        try {
            await pool.connect()
            return await pool.request()
                .input('user_Id', mssql.Int, newdata.User_Id)
                .input('product_Id', mssql.Int, newdata.Product_Id)
                .input('noidung', mssql.NVarChar, newdata.NoiDung)
                .input('image', mssql.NVarChar, newdata.Image)
                .input('star', mssql.Int, newdata.Star)
                .input('day', mssql.Date, newdata.Day)
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
    this.getModelComment=async (id, end) => {

        var sql = "select * from NguoiSD n, DanhGia d where n.Id=d.User_Id  and d.Product_Id=@id"
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
    this.getModelCategory= async function (end) {
        var sql = "select SUM(O.Number) as 'SOLUONG' ,P.Category_Id FROM ORDER_DETAIL O ,PRODUCT P  WHERE  O.Product_Id=P.Id group by P.Category_Id"
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




    // this.PostProduct = a





}