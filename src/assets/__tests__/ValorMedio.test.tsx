import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ValorMedio from '../components/CardsInfo/ValorMedio';

describe("ValorMedio", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><ValorMedio /></BrowserRouter>)

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  })
})