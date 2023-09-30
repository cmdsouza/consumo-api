import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Sidebar from '../components/Global/Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe("Sidebar", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><Sidebar /></BrowserRouter>)

    expect(screen.getByText("Cielo Bootcamp 2023")).toBeInTheDocument();
  })
})