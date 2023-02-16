import "./App.css";
import TooltipInputField from "./components/tooltipInputField/tooltipInputField";
import { Button as ANTDButton, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  .ant-btn-primary {
    background-color: #1e293b;
    box-shadow: none;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    height: 3rem;
  }

  .ant-btn-primary:not(:disabled):hover {
    background-color: #1e293b;
  }
`;

function App() {
  const [marketRisk, setMarketRisk] = useState({
    useFund: 0,
    tradeQuanity: 0,
    minimumTarget: 0,
    targetHitProfit: 0,
    stockLossHitLoss: 0,
  });
  const formik = useFormik({
    initialValues: {
      capital: "",
      stockPrice: "",
      oneTradeRisk: "",
      stopLossPrice: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      capital: Yup.number().required("Capital is required"),
      stockPrice: Yup.number().required("Stock Price is required"),
      oneTradeRisk: Yup.number()
        .required("One Trade Risk is required")
        .min(0)
        .max(100),
    }),
    onSubmit: (values) => {
      const RRR = (+values.capital / 100) * +values.oneTradeRisk;
      const stopLossPrice = (+values.stockPrice/ 100) * +values.oneTradeRisk
      const tradeQuanity = RRR / +stopLossPrice;
      const minimumTarget = +stopLossPrice * 2;
      const profit = tradeQuanity * minimumTarget;
      const stopLoss = +stopLossPrice * tradeQuanity;
      const useFund = tradeQuanity * +values.stockPrice;
      setMarketRisk({
        useFund,
        tradeQuanity,
        minimumTarget,
        targetHitProfit: profit,
        stockLossHitLoss: stopLoss,
      });
    },
  });

  const capitalizeWord = (string: string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col min-h-screen bg-[#f8fafc]">
        <div className="text-3xl my-12 sm:my-0 !mb-8 ">
          Market Risk Calculator
        </div>
        <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center w-2/3">
          <TooltipInputField message={formik.errors.capital}>
            <Form.Item label="Capital" className="text-white">
              <Input
                placeholder="Capital"
                className="focus:outline-none focus:ring-2 focus:ring-[#4096ff] focus:ring-offset-2 focus:ring-offset-slate-50"
                prefix={<>Rs.</>}
                type="number"
                name="capital"
                status={formik.errors.capital ? "error" : ""}
                value={formik.values.capital}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </TooltipInputField>
          <TooltipInputField message={formik.errors.stockPrice}>
            <Form.Item label="Stock Price">
              <Input
                placeholder="Stock Price"
                className="focus:outline-none focus:ring-2 focus:ring-[#4096ff] focus:ring-offset-2 focus:ring-offset-slate-50"
                prefix={<>Rs.</>}
                type="number"
                name="stockPrice"
                status={formik.errors.stockPrice ? "error" : ""}
                value={formik.values.stockPrice}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </TooltipInputField>
          <TooltipInputField message={formik.errors.oneTradeRisk}>
            <Form.Item label="One Trade Risk">
              <Input
                placeholder="One Trade Risk"
                className="focus:outline-none focus:ring-2 focus:ring-[#4096ff] focus:ring-offset-2 focus:ring-offset-slate-50"
                suffix={<>%</>}
                status={formik.errors.oneTradeRisk ? "error" : ""}
                name="oneTradeRisk"
                type="number"
                value={formik.values.oneTradeRisk}
                onChange={formik.handleChange}
              />
            </Form.Item>
          </TooltipInputField>
        </div>
        <Button>
          <ANTDButton type="primary" onClick={() => formik.handleSubmit()}>
            Calculate Risk
          </ANTDButton>
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4">
          {Object.entries(marketRisk).map(([key, value]) => {
            return (
              <div className="my-1 bg-[#0000001a] py-3 px-6 rounded-md text-sm">
                {capitalizeWord(key)}: {value}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed left-0 top-0 p-2 text-center w-full bg-slate-200">
        <span className="text-xs">Welcome to Tradevity</span>
      </div>
    </>
  );
}

export default App;
