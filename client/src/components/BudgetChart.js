import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function BudgetChart({ plannedTotal, actualTotal, budgetType }) {
  const data = [
    { name: "Planned", value: plannedTotal || 0 },
    { name: "Actual", value: actualTotal || 0 },
  ];

  const COLORS = ["#36d1dc", "#5b86e5"]; // gradient-like blue shades

  // Calculate profit/loss
  const diff = (plannedTotal || 0) - (actualTotal || 0);
  const status = diff >= 0 ? "Savings" : "Overspent";

  return (
    <div style={{ width: "100%", height: 300, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.8)",
              borderRadius: "10px",
              border: "none",
              color: "#333",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text with Profit/Loss */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h6 style={{ margin: 0, fontSize: "0.8rem", opacity: 0.8 }}>
          {budgetType.charAt(0).toUpperCase() + budgetType.slice(1)}
        </h6>
        <h6 style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>Spent</h6>
        <h4 style={{ margin: 0 }}>
          {actualTotal || 0}/{plannedTotal || 0}
        </h4>
        <h6
          style={{
            margin: 0,
            fontSize: "0.8rem",
            opacity: 0.9,
            color: diff >= 0 ? "rgb(34 0 255);" : "#ff4d4d", // green for savings, red for overspent
          }}
        >
          {status}: {Math.abs(diff)}
        </h6>
      </div>
    </div>
  );
}
