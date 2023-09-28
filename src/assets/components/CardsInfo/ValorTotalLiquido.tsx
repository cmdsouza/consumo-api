import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

type Summary = {
    totalNetAmount: number;
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

function ValorTotalLiquido() {
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
                          color="#FFBB28"
                        >
                          {formatCurrency(repositories.summary.totalNetAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          total líquido
                        </Typography>
                    </Grid>
                    <Grid item>
                        <WaterDropIcon
                          style={{
                            fontSize: "50px",
                            color: "#FFBB28",
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

export default ValorTotalLiquido;
