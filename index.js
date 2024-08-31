import express from 'express';
import { loggingMiddleware } from './loggingMiddleware.js';
let cars = [
    { id: 1, model: "tata", make: 2000 },
    { id: 2, model: "maruti", make: 2000 },
    { id: 3, model: "honda", make: 2000 },
    { id: 4, model: "mahindra", make: 2000 },
    { id: 5, model: "toyota", make: 2000 },
    { id: 6, model: "ford", make: 2000 },
  ];

  const port = 4040;
  const hostname = "127.0.0.1";
  const app = express();

  app.use(express.urlencoded({extended:false}));
  app.use(express.json());
  app.use(loggingMiddleware);

  app.get('/product' , async (req, res)=>{
    // res.status(200).json(cars);
    res.status(200);
    res.send(cars);
  });

  app.post('/addProduct' , async (req, res)=>{
      const newCar = req.body;
      cars.push(newCar);
      res.send(cars);
  });

  app.put('/updatedproduct/:id', async (req, res)=>{
    const {id} = req.params;
    const dataToEdit = req.body;

    const updatedCar = cars.map((car)=>{
        return car.id === Number(id) ? dataToEdit : car;
    })
    res.send(updatedCar);
  });

  app.delete('/deletedProduct/:id', async (req, res) =>{
    const {id} = req.params;
    const remaingCars = cars.filter((car)=>{
        return car.id !== Number(id);
    });
    res.send(remaingCars);
  })

  app.listen(port, hostname,()=>{
    console.log("Server  started in port " + port);
  })