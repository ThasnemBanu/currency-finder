"use client";

import { useState } from "react";
import { Select, Row, Col } from "antd";
import { countries } from "./countries";

export default function CurrencyFinderForm() {
  const [currency, setCurrency] = useState("");

  const handleCountryChange = async (value) => {
    try {
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

  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Row gutter={40} justify="left" align="center" span={12} xs={{span: 24}} >
        <Col>
          <h3 style={{ width: 200, textAlign: "left" }}>Country : </h3>
          <Select
            showSearch
            placeholder="Select Country"
            optionFilterProp="children"
            onChange={handleCountryChange}
            filterOption={filterOption}
            options={countries}
            style={{ width: 200 }}
           />
        </Col>
        
        <Col>
          <h3 style={{ width: 200, textAlign: "left" }}>Currency : </h3>
          <span>
            {currency}
          </span>
        </Col>
      </Row>    
    </div>
  );
}
