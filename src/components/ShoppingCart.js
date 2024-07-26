import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function  ShoppingCart(){    

  const [cartArray, setCartArray ] = useState([]); 
  const navigate = useNavigate();
    
  useEffect(() => 
  {     
    checkUserLogin();
      getCartItems();
  }, []);

  function checkUserLogin()
  { 
    let userId = sessionStorage.getItem("USER_ID");
    if(userId == null || userId == undefined)
    {
       // alert("Please Login before viewing items in Cart");
        navigate("/Login");
        return;
    }
  }


  function getCartItems()
  {     
      let userId = sessionStorage.getItem("USER_ID");
      if(userId != null)
      {
      let url = "http://localhost:3500/cart?userName=" + userId; 
      axios.get(url).then( (resData) => 
      {
          setCartArray(resData.data);
      });       
    }
  }


  function  removeCartItem(id)
  {
    // add the logic to delete based on cart id
    let url = "http://localhost:3500/cart/" + id; 
  
    axios.delete(url).then((resData) => 
    {
        getCartItems();
    }); 
  }
 
  let finalTotal = 0;

 function getFinalTotalAmount()
 {
   
    for(let item of cartArray)
    {
      finalTotal = finalTotal + item.total;
    }
    return finalTotal;
 }


 function checkOutButtonClick()
 {
    let orderObj = {};
    orderObj.orderDate = new Date();
    orderObj.UserName = cartArray[0].userName;
    orderObj.totalAmount = finalTotal;

    let url = "http://localhost:3500/orders";

    axios.post(url, orderObj).then((resData)=>
    {
        navigate("/OrderConfirmed/" + resData.data.id);
        
    });
 }

 function deleteCartItems()
 {
     let cartIds = cartArray.map(item => item.id);

     for(let id of cartIds)
     {
        removeCartItem(id);
     }

 }


  let resultArray = cartArray.map((item, index) =>  
      <tr key={index}>
          <td>   {index + 1}  </td>
          <td>   {item.productName}  </td>        
          <td>   {item.unitPrice}  </td> 
          <td>   {item.quantity}  </td> 
          <td>   {item.total}  </td>        
          <td>   
              <a  href="javascript:void(0);" className="btn btn-danger" onClick={() => removeCartItem(item.id)}>Remove</a>               
          </td>
      </tr>
   );

  return (
      <>  <h3 style={{textAlign:"center"}}>Shopping Cart</h3>
          <hr/>
      
          <table align="center" border="2" width="600" cellspacing="0" cellpadding="5">
              <tr>
                  <th>S.No</th>               
                  <th>Product Name</th> 
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>                         
                  <th></th>
              </tr>
              {resultArray}
              <tr>
                <td align="right" colspan="6">Final Total :  {getFinalTotalAmount()}</td>
              </tr>
          </table>

          <hr/>
         <div style={{textAlign:"center"}}> <button className="btn btn-primary" onClick={checkOutButtonClick}>Place Order</button></div>
      </>
  );
}


 export default ShoppingCart; 