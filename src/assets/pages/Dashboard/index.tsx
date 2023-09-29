import { Box, Grid, Typography } from "@mui/material";
import TotalPagamentos from "../../components/CardsInfo/TotalPagamentos";
import ValorTotalPagamentos from "../../components/CardsInfo/ValorTotalPagamentos";
import ValorTotalLiquido from "../../components/CardsInfo/ValorTotalLiquido";
import ValorMedio from "../../components/CardsInfo/ValorMedio";
import CardBrand from "../../components/Graphs/CardBrand";
import ChannelType from "../../components/Graphs/ChannelType";
import TopSells from "../../components/Graphs/TopSells";
import Status from "../../components/Graphs/Status";

function Dahsboard() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: "1% 1% 0% 1%",
        }}
      >
        <Typography variant="h4" display="block" gutterBottom marginTop="2%" color="#231F20" fontWeight="bold">Dahsboard</Typography>

        <div>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* Primeira linha de cards */}
            <Grid item xs={8} sm={6} md={3}>
              <TotalPagamentos />
            </Grid>

            <Grid item xs={8} sm={6} md={3}>
              <ValorTotalPagamentos />
            </Grid>

            <Grid item xs={8} sm={6} md={3}>
              <ValorTotalLiquido />
            </Grid>

            <Grid item xs={8} sm={6} md={3}>
              <ValorMedio />
            </Grid>

            {/* Segunda linha de cards */}
            <Grid item xs={8} sm={6} md={3}>
              <CardBrand />
            </Grid>

            <Grid item xs={8} sm={6} md={4}>
              <ChannelType />
            </Grid>

            <Grid item xs={8} sm={6} md={3}>
              <TopSells />
            </Grid>

            <Grid item xs={8} sm={6} md={2}>
              <Status />
            </Grid>

          </Grid>
        </div>
      </Box>
    </>
  );
}

export default Dahsboard;
