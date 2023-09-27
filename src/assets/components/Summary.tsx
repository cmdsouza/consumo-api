import { useFetch } from "../../hooks/useFetch";

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

function Summary() {
  const { data: repositories, error, isFetching } = useFetch<Data>(
    'http://localhost:5000/data'
  );

  return (
    <div>
      {isFetching && <p>Carregando...</p>}
      {error && <p>Houve um erro ao realizar a requisição :(</p>}
      {repositories?.summary && (
        <ul>
          <li>Quantidade total de pagamentos: {repositories.summary.totalQuantity}</li>
          <li>Valor total dos pagamentos: {repositories.summary.totalAmount}</li>
          <li>Valor total líquido dos pagamentos: {repositories.summary.totalNetAmount}</li>
          <li>Valor médio dos pagamentos: {repositories.summary.totalAverageAmount}</li>
          <li>Data inicial: {repositories.summary.initialDate}</li>
          <li>Data final: {repositories.summary.finalDate}</li>
        </ul>
      )}
    </div>
  );
}

export default Summary;
