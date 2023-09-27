import { useFetch } from "../../hooks/useFetch";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function Item() {
  const { data: repositories, error, isFetching } = useFetch<Data>(
    'http://localhost:5000/data'
  );

  return (
    <>
      {isFetching && <p>Carregando...</p>}
      {error && <p>Houve um erro ao realizar a requisição</p>}

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">MerchantId</TableCell>
            <TableCell align="right">PaymentNode</TableCell>
            <TableCell align="right">CnpjRoot</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {repositories?.items.map((item) => {
                return (
                <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                {item.merchantId}
                </TableCell>
                <TableCell align="right">{item.merchantId}</TableCell>
                <TableCell align="right">{item.paymentNode}</TableCell>
                <TableCell align="right">{item.cnpjRoot}</TableCell>
                <TableCell align="right">{item.date}</TableCell>
                </TableRow>
                );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default Item;
