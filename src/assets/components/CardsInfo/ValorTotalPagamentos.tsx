import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Define a estrutura dos dados recebidos do JSON
type Summary = {
  totalAmount: number;
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

function ValorTotalPagamentos() {
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
                  {formatCurrency(repositories.summary.totalAmount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  total bruto
                </Typography>
              </Grid>
              <Grid item>
                <AddCircleIcon
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

export default ValorTotalPagamentos;
