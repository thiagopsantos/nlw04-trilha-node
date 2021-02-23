import express from 'express'

const app = express();

app.get('/', (request, response) => {  
  response.json({message: "Hello World - NLW04"});
});

app.post('/', (request, response) => {
  response.json({message: "Os dados foram salvos com sucesso."})
});

app.listen(3333, () => {
  console.log('Server is running')
})
