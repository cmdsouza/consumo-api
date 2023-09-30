import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Footer from '../components/Global/Footer';
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {
  it("should render correctly", () => {
    render(<BrowserRouter><Footer /></BrowserRouter>)

    expect(screen.getByText("2023 | @cmdsouza")).toBeInTheDocument();
  })
})