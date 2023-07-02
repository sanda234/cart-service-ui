import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

var burgerPrice;

export default function Cart() {

    const paperStyle={padding:'50px 20px', width:'600px', margin:'20px auto'}
    const[Quantity, setQuantity ]=React.useState('')
    const[Name, setName]=React.useState('')
    const[ContactNumber, setContactNumber]=React.useState('')
    const[Address, setAddress]=React.useState('')

    //get all ingredient details & store those details in 'ingredients'
    const [ingredients, setIngredients] = useState([])
    //const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
      // Fetch data from the API endpoint
      fetch('http://localhost:8000/ingredients')
        .then(res => res.json())
        .then((resultIngredients)=>{
          setIngredients(resultIngredients);
        }
      )
    }, [])

    //insert customer details
    const handleClick=(e)=>{
        e.preventDefault()
        const cart={Address,ContactNumber,Name,Quantity}
        console.log(cart)
        fetch("http://localhost:9191/addCart",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        //convert JS object to jason string
        body:JSON.stringify(cart)
    }).then(()=>{
        // once order confermed successfully display this message
        console.log("Order Confirmed...")
    })
    }
  return (
    
    <Container>

        <Paper elevation={3} style={paperStyle}>
            <h1 >Happy Burger Cart</h1>
            <h1 >.................................</h1>
            <h4 align="left">ORDER DETAILS</h4>

            <h4>Burger Name : Beef Burger</h4>
            <h4>Total Price : RS. 1550</h4>

    <h4 align="left">CUSTOMER DETAILS</h4>

    <Box
      component="form"
        sx={{
        '& > :not(style)': { m: 1, width: 500, maxWidth: '100%'},
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Quantity" variant="standard" 
      value={Quantity}
      onChange={(e)=>setQuantity(e.target.value)}
      />
      <TextField id="standard-basic" label="Customer Name" variant="standard" 
      value={Name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="standard-basic" label="Customer Contact Number" variant="standard" 
      value={ContactNumber}
      onChange={(e)=>setContactNumber(e.target.value)}
      />
      <TextField id="standard-basic" label="Customer Address" variant="standard" 
      value={Address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleClick}>
      Confirm Order
      </Button>
    </Box>
    
    </Paper>
    </Container>
  );
}
