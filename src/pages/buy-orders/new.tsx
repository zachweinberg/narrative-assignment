import { NextPage } from "next";
import BuyOrderForm from "../../components/BuyOrderForm";

const CreateBuyOrderPage: NextPage = () => {
  return <BuyOrderForm editMode={false} />;
};

export default CreateBuyOrderPage;
