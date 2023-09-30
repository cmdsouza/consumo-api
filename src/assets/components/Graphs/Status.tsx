import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import Typography from "@mui/material/Typography";
import NumbersIcon from "@mui/icons-material/Numbers";

type Item = {
  status: string;
};

type Data = {
  items: Item[];
};

function Status() {
  const {
    data: repositories,
    error,
    isFetching,
  } = useFetch<Data>("http://localhost:5000/data");

  // Verifica se há um erro ou se ainda está carregando
  if (error) {
    return (
      <Typography variant="body1" color="error">
        Houve um erro ao realizar a requisição
      </Typography>
    );
  }

  if (isFetching) {
    return <Typography variant="body1">Carregando...</Typography>;
  }

  // Cria um objeto para rastrear os valores únicos e suas contagens
  const statusSellCounts: { [key: string]: number } = {};

  // Percorre os itens e atualize o objeto de contagem
  repositories?.items.forEach((item) => {
    const statusSell = item.status;
    if (statusSell) {
      statusSellCounts[statusSell] = (statusSellCounts[statusSell] || 0) + 1;
    }
  });

  // Cria um array de elementos Typography com os resultados
  const statusSellSummary = Object.keys(statusSellCounts).map((type) => (
    <ListItem
      key={1}
      sx={{ padding: "2.4px !important", borderBottom: "1px solid #C4E0FB" }}
    >
      <ListItemIcon>
        <NumbersIcon
          sx={{ color: "#00AEED", fontSize: "45px", marginLeft: "2%" }}
        />
      </ListItemIcon>
      <ListItemText
        primary={`${statusSellCounts[type]}`}
        secondary={`${type}`}
      />
    </ListItem>
  ));

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
            Status das transações
          </Typography>
          <List sx={{ width: "100%" }}>{statusSellSummary}</List>
        </CardContent>
      </Card>
    </>
  );
}

export default Status;
