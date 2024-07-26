import { Link, useParams } from "react-router-dom";

function  OrderConfirmed(){


    const {id} = useParams();


    return <div align="center">
      <h3 style={{textAlign:"center"}}>Order Confirmation</h3>
      <hr/>
      <h1>Your Order Id: {id} </h1>
      <img src="https://cdn.wallpapersafari.com/67/47/lpYi0F.jpg" border="1" width="50%" height="250" alt="Alternate text" />               
      <hr/>  
      <Link className="btn btn-primary" to="/">Visit home to continue shopping</Link>
       
    </div>;
  };


 export default OrderConfirmed; 