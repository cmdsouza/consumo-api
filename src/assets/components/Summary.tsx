import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';

type Summary = {
  totalQuantity: number;
  totalAmount: number;
  totalNetAmount: number;
  totalAverageAmount: number;
  initialDate: string;
  finalDate: string;
};

type Data = {
  summary: Summary;
};

function formatCurrency(number: number | bigint) {
  // Formate o número como moeda
  const formattedNumber = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);

  return formattedNumber;
}

function Summary() {
  const {
    data: repositories,
    error,
    isFetching,
  } = useFetch<Data>("http://localhost:5000/data");

  return (
    <div>
      {isFetching && <p>Carregando...</p>}
      {error && <p>Houve um erro ao realizar a requisição :(</p>}

      <div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {repositories?.summary && (
            <>
              <Grid
                item
                xs={8}
                sm={6}
                md={3}
                key={repositories.summary.totalQuantity}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          component="div"
                          color="#1976d2"
                        >
                          {repositories.summary.totalQuantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          pagamentos
                        </Typography>
                      </Grid>
                      <Grid item>
                        <PaymentIcon style={{
                            fontSize: '50px',
                            color: '#1976d2',
                            position: 'relative',
                            top: '5px',
                            left: '5px',
                          }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                item
                xs={8}
                sm={6}
                md={3}
                key={repositories.summary.totalAmount}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          component="div"
                          color="#1976d2"
                        >
                          {formatCurrency(repositories.summary.totalAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          total em pagamentos
                        </Typography>
                      </Grid>
                      <Grid item>
                        <AddCircleIcon style={{
                            fontSize: '50px',
                            color: '#1976d2',
                            position: 'relative',
                            top: '5px',
                            left: '5px',
                          }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                item
                xs={8}
                sm={6}
                md={3}
                key={repositories.summary.totalNetAmount}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          component="div"
                          color="#1976d2"
                        >
                          {formatCurrency(repositories.summary.totalNetAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          total líquido
                        </Typography>
                      </Grid>
                      <Grid item>
                        <WaterDropIcon style={{
                            fontSize: '50px',
                            color: '#1976d2',
                            position: 'relative',
                            top: '5px',
                            left: '5px',
                          }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                item
                xs={8}
                sm={6}
                md={3}
                key={repositories.summary.totalAverageAmount}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          component="div"
                          color="#1976d2"
                        >
                          {formatCurrency(repositories.summary.totalAverageAmount)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          valor médio
                        </Typography>
                      </Grid>
                      <Grid item>
                        <SafetyDividerIcon style={{
                            fontSize: '50px',
                            color: '#1976d2',
                            position: 'relative',
                            top: '5px',
                            left: '5px',
                          }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Summary;