const express= require ("express")

const app  = express()
app.use(express.json())
const port = 3000




app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/", (req,res)=>{
   
})

app.listen(port,()=>{
    console.log('App running')
})