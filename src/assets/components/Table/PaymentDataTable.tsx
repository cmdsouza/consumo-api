import { useFetch } from "../../../hooks/useFetch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SetStateAction, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Item = {
  id: string;
  merchantId: string;
  paymentNode: number;
  cnpjRoot: number;
  date: string;
  paymentType: string;
  cardBrand: string;
  authorizationCode: string;
  truncatedCardNumber: string;
  grossAmount: number;
  netAmount: number;
  terminal: string;
  administrationFee: number;
  channelCode: number;
  channel: string;
  withdrawAmount: number;
  minimumMDRAmmount: number;
  mdrTaxAmount: number;
  mdrFeeAmount: number;
  status: string;
};

type Data = {
  items: Item[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function converterData(dataOriginal: string | number | Date) {
  const data = new Date(dataOriginal);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  const horas = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  const segundos = data.getSeconds().toString().padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function formatCurrency(number: number | bigint) {
  // Formate o número como moeda
  const formattedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formattedNumber;
}

function Item() {
  const {
    data: repositories,
    error,
    isFetching,
  } = useFetch<Data>("http://localhost:5000/data");

  // Adicione um estado para controlar a abertura/fechamento da Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>();

  // Função para abrir a Modal quando o ícone é clicado
  const handleOpenModal = (item: Item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  // Função para fechar a Modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setOpenModal(false);
  };

  return (
    <>
      {isFetching && <p>Carregando...</p>}
      {error && <p>Houve um erro ao realizar a requisição</p>}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: "1% 1% 0% 1%",
        }}
      >
        <h1>Dados das Transações</h1>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">
                  Estabelecimento
                </StyledTableCell>
                <StyledTableCell align="center">CNPJ</StyledTableCell>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="left">Tipo</StyledTableCell>
                <StyledTableCell align="left">Bruto (R$)</StyledTableCell>
                <StyledTableCell align="left">Líquido (R$)</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repositories?.items.map((item) => {
                return (
                  <StyledTableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.merchantId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.cnpjRoot}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {converterData(item.date)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.paymentType}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.grossAmount}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.netAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Detalhes" placement="left">
                        <InfoIcon
                          sx={{
                            fontSize: "18px",
                            marginTop: "0%",
                            marginBottom: "-10%",
                          }}
                          onClick={() => handleOpenModal(item)} // Chame a função ao clicar no ícone
                        />
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <BootstrapDialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Transação
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {selectedItem && (
            <div>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                fontWeight="bold"
                color="#1976d2"
              >
                Informações
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent="left"
                alignItems="center"
              >
                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.id}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    ID
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.merchantId}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Estabelecimento
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.paymentNode}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Nó
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.cnpjRoot}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    CNPJ
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {converterData(selectedItem.date)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Data
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.paymentType}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Tipo
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.cardBrand}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Bandeira
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.authorizationCode}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Cód. de autorização
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    #### #### #### {selectedItem.truncatedCardNumber}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Nº do cartão
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.grossAmount < 0 ? "#E10050" : "#459451",
                    }}
                  >
                    {formatCurrency(selectedItem.grossAmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Valor bruto
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color: selectedItem.netAmount < 0 ? "#E10050" : "#459451",
                    }}
                  >
                    {formatCurrency(selectedItem.netAmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Valor líquido
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.terminal}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Terminal
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="button"
                display="block"
                gutterBottom
                fontWeight="bold"
                color="#1976d2"
                marginTop="2%"
              >
                Canal e Estado
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent="left"
                alignItems="center"
              >
                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.channelCode}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Cód. do Canal
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {selectedItem.channel}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Canal
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Chip
                    label={selectedItem.status}
                    size="small"
                    style={{
                      marginTop: "-2%",
                      marginBottom: "2%",
                      color: "white",
                      backgroundColor:
                        selectedItem.status !== "Aprovada"
                          ? "#E10050"
                          : "#459451",
                    }}
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    Status
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="button"
                display="block"
                gutterBottom
                fontWeight="bold"
                color="#1976d2"
                marginTop="2%"
              >
                Taxas e Deduções
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent="left"
                alignItems="center"
              >
                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.administrationFee !== 0
                          ? "#E10050"
                          : "black",
                    }}
                  >
                    {formatCurrency(selectedItem.administrationFee)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Administrativa
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.mdrTaxAmount !== 0 ? "#E10050" : "black",
                    }}
                  >
                    {formatCurrency(selectedItem.mdrTaxAmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Imposto MDR
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.mdrFeeAmount !== 0 ? "#E10050" : "black",
                    }}
                  >
                    {formatCurrency(selectedItem.mdrFeeAmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Taxa MDR
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.mdrFeeAmount !== 0 ? "#E10050" : "black",
                    }}
                  >
                    {formatCurrency(selectedItem.minimumMDRAmmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Valor mínimo do MDR
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={8}
                  sm={6}
                  md={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    display="block"
                    gutterBottom
                    fontWeight="bold"
                    style={{
                      color:
                        selectedItem.withdrawAmount !== 0 ? "#E10050" : "black",
                    }}
                  >
                    {formatCurrency(selectedItem.withdrawAmount)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Quantia retirada
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default Item;
