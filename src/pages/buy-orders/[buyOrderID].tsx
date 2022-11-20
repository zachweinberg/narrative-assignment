import { NextPage } from "next";
import { useRouter } from "next/router";
import BuyOrderDetail from "../../components/BuyOrderDetail";

const BuyOrderDetailPage: NextPage = () => {
  const router = useRouter();

  const buyOrderID = parseInt(router.query.buyOrderID as string);

  return router.isReady ? <BuyOrderDetail buyOrderID={buyOrderID} /> : null;
};

export default BuyOrderDetailPage;
