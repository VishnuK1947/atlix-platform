"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  data: { day: string; volume: number }[];
}

export default function TrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8f0e8" />
        <XAxis
          dataKey="day"
          tick={{ fill: "#7a947a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fill: "#7a947a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ background: "#ffffff", border: "1px solid #d4e4d4", borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: "#5c7a5c" }}
          itemStyle={{ color: "#16a34a" }}
        />
        <Line
          type="monotone"
          dataKey="volume"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#16a34a" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
