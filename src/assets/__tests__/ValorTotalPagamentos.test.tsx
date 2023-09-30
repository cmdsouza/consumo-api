import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ValorTotalPagamentos from '../components/CardsInfo/ValorTotalPagamentos';

describe("ValorTotalPagamentos", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><ValorTotalPagamentos /></BrowserRouter>)

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  })
})