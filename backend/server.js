const http = require('http')
const app = require('./app')
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

app.get('/',(req,res)=>{
    res.send('Hello world');
})

server.listen(process.env.PORT || 3000);