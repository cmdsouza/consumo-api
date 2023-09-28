import { Box, Card, CardContent,Grid,Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Item = {
  id: string;
  channel: string;
};

type Data = {
  items: Item[];
};

function ChannelType() {
  const {
    data: repositories,
  } = useFetch<Data>("http://localhost:5000/data");

  // Objeto para rastrear as contagens de marcas de cartão
  const channelTypeCount: { [key: string]: number } = {};

  // Contagem das marcas de cartão
  repositories?.items.forEach((item) => {
    const channelType = item.channel;
    if (channelTypeCount[channelType]) {
      channelTypeCount[channelType]++;
    } else {
      channelTypeCount[channelType] = 1;
    }
  });

  // Função para transformar os dados em um array no formato especificado
  const transformDataToJSON = () => {
    const jsonData = Object.keys(channelTypeCount).map((channelType) => ({
      name: channelType,
      value: channelTypeCount[channelType],
    }));

    return jsonData;
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#F00",
    "#0F0",
    "#00F",
  ];

  var numero = -1;
  function sortearCor() {
    numero++;
    return numero;
  }

  class PieChartchannelType extends PureComponent {
    render() {
      return (
        <Box>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                    data={transformDataToJSON()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {transformDataToJSON().map((item) => (
                        <Cell
                        key={`cell-${item.name}`}
                        fill={COLORS[sortearCor() % COLORS.length]}
                        />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                    align="left"
                    verticalAlign="middle"
                    layout="vertical"
                    iconSize={10}
                    iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
      );
    }
  }

  return (
    <>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="#1976d2" fontWeight={"bold"} gutterBottom>
              Canal usado nas transações
            </Typography>
            <PieChartchannelType />
          </CardContent>
        </Card>
    </>
  );
}

export default ChannelType;
