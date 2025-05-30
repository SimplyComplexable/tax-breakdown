import React from 'react';
import { Calculator } from "components/Calculator";

const Home = ({}) => (
  <div className="w-full grid justify-items-center">
    <h1 className="py-6 px-12 border-b-2 border-gray-200">Tax Breakdown</h1>
    <Calculator />
  </div>
);

export default Home
