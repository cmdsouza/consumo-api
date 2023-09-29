import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import PaymentIcon from "@mui/icons-material/Payment";

type Summary = {
  totalQuantity: number;
};

type Data = {
  summary: Summary;
};

function TotalPagamentos() {
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
                          {repositories.summary.totalQuantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          quantidade de pagamentos
                        </Typography>
                    </Grid>
                    <Grid item>
                        <PaymentIcon
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

export default TotalPagamentos;
