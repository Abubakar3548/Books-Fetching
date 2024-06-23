import express from 'express';
import mysql from 'mysql'
import cors from 'cors'

const app = express()

//To connect to mysql db
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "test"

});
//app.use express.json allow us to send any json fill using client
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    
    res.json("Hello this is from Backend, we are good to go!")
});

app.get("/books", (req, res)=>{
    const sql = "SELECT * FROM books";
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
         return res.json(data)   
        // if(err) console.log(err);
        // console.log("abubakar")
    });
    
});
app.post("/books", (req, res)=>{
    const sql ="INSERT INTO books (`title`, `description`,  `price`, `cover`) VALUES (?)" 
    const values =[
        // "title from backend",
        // "description from backend",
        // "cover pic from backend",
        //how we can send data as a user
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover


        ];
    db.query(sql,[values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully!")
        // console.log(err)
    })
})
//To delete book we come to backend..
//params represent this url
app.delete("/books:id", (req, res)=>{
    const bookId = req.params.id;
    const sql = "DELETE FROM books WHERE id =?"
    db.query(sql, [bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully!")
    });

});


app.put("/books:id", (req, res)=>{
    const bookId = req.params.id;
    const sql = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id =?" ;
    const values=[
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ]
    db.query(sql, [...values, bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully!")
    });

});



//in oder to run my express, i have to listening in port number.
app.listen(5000, ()=>{
    console.log('Connect to backend side without any problem23445')
});
