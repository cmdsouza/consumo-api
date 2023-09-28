import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";

type Summary = {
    totalAverageAmount: number;
};

type Data = {
  summary: Summary;
};

function formatCurrency(number: number | bigint) {
  // Formate o número como moeda
  const formattedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formattedNumber;
}

function ValorMedio() {
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
                          color="#FF8042"
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
                            color: "#FF8042",
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
