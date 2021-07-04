npx sequelize-cli model:create --name Users --attributes name:string,email:string,password:string,user_photo:string,location:string,phone:string,occupation:string,about_me:string

npx sequelize-cli model:create --name Services --attributes user_id:integer,title:string,category:string,description:string,price:numeric,location:string
