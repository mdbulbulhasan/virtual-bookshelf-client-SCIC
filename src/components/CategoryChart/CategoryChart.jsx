import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const CategoryChart = ({books}) => {
    // Prepare category-wise count data
  const categoryData = [
    { name: "Fiction", value: books.filter((b) => b.book_category === "Fiction").length },
    { name: "Non-Fiction", value: books.filter((b) => b.book_category === "Non-Fiction").length },
    { name: "Fantasy", value: books.filter((b) => b.book_category === "Fantasy").length },
  ];
    return (
      <div className="w-full h-80 p-4 rounded-lg ">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Book Categories
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
};

export default CategoryChart;