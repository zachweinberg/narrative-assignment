import { NextPage } from "next";
import { useRouter } from "next/router";
import BuyOrderForm from "../../../components/BuyOrderForm";

const EditBuyOrderPage: NextPage = () => {
  const router = useRouter();

  const buyOrderID = parseInt(router.query.buyOrderID as string);

  return <BuyOrderForm editMode={true} buyOrderID={buyOrderID} />;
};

export default EditBuyOrderPage;
