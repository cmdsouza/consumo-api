import { Box, Card, CardContent, Typography } from "@mui/material";
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
  cardBrand: string;
};

type Data = {
  items: Item[];
};

function CardBrand() {
  const { data: repositories } = useFetch<Data>("http://localhost:5000/data");

  // Objeto para rastrear as contagens de marcas de cartão
  const cardBrandCount: { [key: string]: number } = {};

  // Contagem das marcas de cartão
  repositories?.items.forEach((item) => {
    const cardBrand = item.cardBrand;
    if (cardBrandCount[cardBrand]) {
      cardBrandCount[cardBrand]++;
    } else {
      cardBrandCount[cardBrand] = 1;
    }
  });

  // Função para transformar os dados em um array no formato especificado
  const transformDataToJSON = () => {
    const jsonData = Object.keys(cardBrandCount).map((cardBrand) => ({
      name: cardBrand,
      value: cardBrandCount[cardBrand],
    }));

    return jsonData;
  };

  const COLORS = [
    "#6A9DCA",
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

  class PieChartCardBrand extends PureComponent {
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
          <Typography
            sx={{ fontSize: 14 }}
            color="#231F20"
            fontWeight={"bold"}
            gutterBottom
          >
            Transações por bandeira de cartão
          </Typography>
          <PieChartCardBrand />
        </CardContent>
      </Card>
    </>
  );
}

export default CardBrand;