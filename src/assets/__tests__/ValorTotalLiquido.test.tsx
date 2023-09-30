import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ValorTotalLiquido from '../components/CardsInfo/ValorTotalLiquido';

describe("ValorTotalLiquido", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><ValorTotalLiquido /></BrowserRouter>)

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  })
})