"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: { day: string; volume: number }[];
}

export default function TrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="day"
          tick={{ fill: "#7C8499", fontSize: 11, fontFamily: "monospace" }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fill: "#7C8499", fontSize: 11, fontFamily: "monospace" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1F2A47",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 8,
            fontSize: 12,
            color: "#F4F6FB",
          }}
          labelStyle={{ color: "#B8C0D4" }}
          itemStyle={{ color: "#5FCF89" }}
        />
        <Line
          type="monotone"
          dataKey="volume"
          stroke="#5FCF89"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#5FCF89", stroke: "#0F1729", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
