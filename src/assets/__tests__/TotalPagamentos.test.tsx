import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TotalPagamentos from '../components/CardsInfo/TotalPagamentos';

describe("TotalPagamentos", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><TotalPagamentos /></BrowserRouter>)

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  })
})