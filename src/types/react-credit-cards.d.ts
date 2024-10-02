declare module "react-credit-cards" {
  import * as React from "react";

  interface ReactCreditCardProps {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
    focused?: string;
  }

  const Cards: React.FC<ReactCreditCardProps>;
  export default Cards;
}
