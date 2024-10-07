const express=require("express");
const {v4:uuidv4}=require("uuid");

const PORT=3000;
const app=express()
app.use(express.json());


let books=[]

app.get("/",(req,res)=>{
    res.send("This is a book directory")
})

app.get("/books",(req,res)=>{
    res.status(200).json(books);
})

app.get("/books/:isbn",(req,res)=>{
    const {isbn}=req.params;
    const book=books.find(book=>book.isbn===isbn)

    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({message:"Book is not found"});
    }
});


app.post("/books",(req,res)=>{
    const {title,author,publisher,publishedDate,isbn}=req.body;

    if(!title || !author || !isbn){
        return res.status(400).json({message:"Title, author and isbn are required"});
    }
    const newBook={
        id:uuidv4(),
        title,
        author,
        publisher,
        publishedDate,
        isbn
    }
    books.push(newBook);
    res.status(201).json({message:"Book Created",book:newBook});
});

app.put("/books/:isbn",(req,res)=>{
    const {isbn}=req.params;
    const {title,author,publisher,publishedDate}=req.body;

    const bookIndex=books.findIndex(book=>book.isbn===isbn);
     
    if(bookIndex!==-1){
        books[bookIndex]={...books[bookIndex],title,author,publisher,publishedDate};
        res.status(200).json({message:"Book updated",book:books[bookIndex]});
    }
    else{
        res.status(404).json({message:"Book not found"})
    }
});

app.delete("/books/:isbn",(req,res)=>{
    const {isbn}=req.params;
    const bookIndex=books.findIndex(books=>books.isbn===isbn);

    if(bookIndex!==-1){
        books.splice(bookIndex,1);
        res.status(200).json({message:"Book is sucessfully deleted"});
    }
    else{
        res.status(404).json({message:"Book not found"});
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
