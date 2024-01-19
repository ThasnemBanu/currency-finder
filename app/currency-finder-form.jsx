"use client";

import { useState } from "react";
import { Flex, Select } from "antd";
import { countries } from "./countries";

export default function CurrencyFinderForm() {
  const [country, setCountry] = useState("Select Country");
  const [currency, setCurrency] = useState("Currency");

  const handleCountryChange = async (value) => {
    try {
      setCountry(value);
      fetch(process.env.NEXT_PUBLIC_DATASTORY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
                query GetCurrency($countryName: String = "${value}") {
                  item(where: {class_id: {_eq: "Country"}, id: {_eq: $countryName}}) {
                    currency: statements(where: {property_id: {_eq: "currency"}}) {
                      object {
                        nameEn
                      }
                    }
                  }
                }
          `,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrency(data.data.item[0].currency[0].object.nameEn);
        });
    } catch (error) {
      console.error("Failed to get currency for : ", value);
      console.error("Error :", error);
    }
  };

  return (
    <div>
      <Flex justify="left" gap="large" align="center">
        <Flex vertical>
          <h3 style={{ width: 200 }}>Country : </h3>
          <Select
            defaultValue={country}
            style={{ width: 200 }}
            onChange={handleCountryChange}
            options={countries}
          />
        </Flex>
        <Flex vertical>
          <h3 style={{ width: 200 }}>Currency : </h3>
          <span style={{ border: "solid 3px black", padding: "4px" }}>
            {currency}
          </span>
        </Flex>
      </Flex>
    </div>
  );
}
