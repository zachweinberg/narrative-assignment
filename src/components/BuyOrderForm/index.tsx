// TODO: A lot of logic here is duplicated from BuyOrderDetail component.
// Can clean it up by making one unified component

import { DateTime } from "luxon";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import { createBuyOrder, fetchBuyOrder } from "~/lib/api";
import useGlobalState from "~/lib/global-state";
import { BuyOrder } from "~/lib/types";
import { formatDateFromString, formatDollars } from "~/lib/utils";
import styles from "./BuyOrderForm.module.scss";

interface Props {
  editMode: boolean;
  buyOrderID?: number;
}

const BuyOrderForm: React.FunctionComponent<Props> = ({
  editMode,
  buyOrderID,
}: Props) => {
  const datasets = useGlobalState((state) => state.datasets);
  const countries = useGlobalState((state) => state.countries);
  const router = useRouter();
  const [buyOrder, setBuyOrder] = useState<Omit<BuyOrder, "id"> | null>(null);

  useEffect(() => {
    if (!editMode) {
      setBuyOrder({
        name: "",
        budget: 0,
        countries: [],
        datasetIds: [],
        createdAt: "",
      });
    }

    if (buyOrderID) {
      fetchBuyOrder(buyOrderID).then((buyOrder) => setBuyOrder(buyOrder));
    }
  }, [buyOrderID, editMode]);

  const onSubmit = async () => {
    if (buyOrder.name === "") {
      alert("Please enter a name.");
      return;
    }
    if (buyOrder.budget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    if (buyOrder.countries.length === 0) {
      alert("Please select a country.");
      return;
    }
    if (buyOrder.datasetIds.length === 0) {
      alert("Please select a dataset.");
      return;
    }

    try {
      buyOrder.createdAt = DateTime.local().toISO();
      await createBuyOrder(buyOrder);
      router.push("/buy-orders");
    } catch (err) {
      console.error(err);
      alert("Could not create save buy order.");
    }
  };

  const toggleDataset = (datasetID: number) => {
    let currIDs = buyOrder.datasetIds;

    if (currIDs.includes(datasetID)) {
      currIDs = currIDs.filter((id) => id !== datasetID);
    } else {
      currIDs.push(datasetID);
    }

    setBuyOrder({
      ...buyOrder,
      datasetIds: currIDs,
    });
  };

  const toggleCountry = (countryCode: string) => {
    let currCountries = buyOrder.countries;

    if (currCountries.includes(countryCode)) {
      currCountries = currCountries.filter((c) => c !== countryCode);
    } else {
      currCountries.push(countryCode);
    }

    setBuyOrder({
      ...buyOrder,
      countries: currCountries,
    });
  };

  const CountryBadge = ({ countryCode }: { countryCode: string }) => {
    return (
      <span
        style={{ cursor: "pointer" }}
        className={
          buyOrder.countries.some((c) => c === countryCode)
            ? styles.selectedCountryBadge
            : ""
        }
        onClick={() => toggleCountry(countryCode)}
      >
        {countries[countryCode].name}
      </span>
    );
  };

  if (!buyOrder) return null;

  return (
    <div className={styles.container}>
      <Heading text={editMode ? "Edit Buy Order" : "New Buy Order"} />

      <div className={styles.card}>
        <div className={styles.row}>
          <div>
            <p className="underlined mb-5">Order name</p>
            <Input
              type="text"
              placeholder="Name"
              value={buyOrder.name}
              onChange={(e) =>
                setBuyOrder({ ...buyOrder, name: e.target.value })
              }
            />
          </div>

          {editMode ? (
            <div>
              <p className="underlined mb-5">Date created</p>
              <p>{formatDateFromString(buyOrder.createdAt)}</p>
            </div>
          ) : null}
        </div>

        <div className={styles.row}>
          <div>
            <p className="underlined mb-5">Order budget</p>
            <Input
              type="number"
              placeholder="Budget"
              value={buyOrder.budget}
              onChange={(e) =>
                setBuyOrder({ ...buyOrder, budget: parseInt(e.target.value) })
              }
            />
          </div>

          <div></div>
        </div>

        <div className="mb-20">
          <p className="underlined mb-10">Included datasets</p>
          <div className={styles.datasetsGrid}>
            {datasets.map((dataset) => (
              <div
                className={
                  buyOrder.datasetIds.some((id) => id === dataset.id)
                    ? styles.selectedDataSet
                    : ""
                }
                key={dataset.id}
                onClick={() => toggleDataset(dataset.id)}
              >
                <Image
                  src={dataset.thumbnailUrl}
                  width={40}
                  height={40}
                  alt="Data set image"
                />
                <div>
                  <p className="mb-5">{dataset.label}</p>
                  <p>{formatDollars(dataset.costPerRecord)} per record</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <p className="underlined mb-10">Included countries</p>
          <div className={styles.countryBadges}>
            {Object.keys(countries).map((countryCode) => (
              <CountryBadge key={countryCode} countryCode={countryCode} />
            ))}
          </div>
        </div>

        <Button onClick={onSubmit}>{editMode ? "Save" : "Create Order"}</Button>
      </div>
    </div>
  );
};

export default BuyOrderForm;
