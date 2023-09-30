import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";

// Define a estrutura dos dados recebidos do JSON
type Summary = {
  totalAverageAmount: number;
};

// Define a estrutura do Summary, que recebrá os dados do JSON
type Data = {
  summary: Summary;
};

function formatCurrency(number: number | bigint) {
  // Formata o número como moeda
  const formattedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formattedNumber;
}

function ValorMedio() {
  // Utiliza a função useFetch para buscar dados da URL que retorna o JSON
  const {
    data: repositories,
    error,
    isFetching,
  } = useFetch<Data>("http://localhost:5000/data");

  return (
    <>
      {isFetching && <p>Carregando...</p>}
      {error && <p>Houve um erro ao realizar a requisição :(</p>}
      {repositories?.summary && (
        <Card>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  component="div"
                  color="#00AEED"
                >
                  {formatCurrency(repositories.summary.totalAverageAmount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  valor médio
                </Typography>
              </Grid>
              <Grid item>
                <SafetyDividerIcon
                  style={{
                    fontSize: "50px",
                    color: "#00AEED",
                    position: "relative",
                    top: "5px",
                    left: "5px",
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ValorMedio;
