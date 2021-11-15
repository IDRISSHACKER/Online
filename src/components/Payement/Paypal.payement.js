import React,{useRef, useEffect} from "react";
import ReactDOM from "react-dom"


export default function PaypalPayement({order}) {

  const paypal = useRef()

  useEffect(()=>{
    window.paypal.Buttons({
      createOrder : (data, actions) =>{
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "Achats de produits sur online",
              amount: {
                value: order,
              },
            },
          ],
        });
      },
      onApprove : async (data, actions) => {
        const order = await (actions.order.capture())
      },
      onError : (err) => {
        alert(err)
      }
    }).render(paypal.current)
  }, [])

  return <div>
      <div ref={paypal}></div>
    </div>
}