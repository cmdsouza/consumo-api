import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import NumbersIcon from '@mui/icons-material/Numbers';
import { useFetch } from "../../../hooks/useFetch";

type Item = {
  id: string;
  grossAmount: number;
};

type Data = {
  items: Item[];
};



function TopSells() {
  const {
    data: repositories,
    error,
    isFetching,
  } = useFetch<Data>("http://localhost:5000/data");

  const sortedRepositories = repositories?.items.sort(
    (a, b) => b.grossAmount - a.grossAmount
  );
  const top3Repositories = sortedRepositories?.slice(0, 3);

  const data = top3Repositories?.map((item) => {
    return {
      name: item.id,
      value: item.grossAmount,
    };
  });
  
  if (isFetching) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Houve um erro ao realizar a requisição</p>;
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="#00AEED"
            fontWeight={"bold"}
            gutterBottom
          >
            Top 3 vendas
          </Typography>
          <List sx={{ width: "100%" }}>
            {data.map((item) => (
              <ListItem key={item.name} sx={{ padding: "2.4px !important", borderBottom: "1px solid #C4E0FB" }}>
                <ListItemIcon>
                  <NumbersIcon sx={{ color: "#00AEED", fontSize:"45px", marginLeft:"2%" }}/>
                </ListItemIcon>
                <ListItemText primary={"R$ " + item.value} secondary={"Venda " + item.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default TopSells;