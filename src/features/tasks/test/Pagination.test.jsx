import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Pagination from "../components/Pagination";

describe("Pagination", () => {
  const setCurrentPage = vi.fn();

  it("renders pagination info", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
        totalItems={50}
        pageSize={10}
      />,
    );

    expect(screen.getByText("Showing 1 to 10 of 50 tasks")).toBeInTheDocument();
  });

  it("renders page numbers", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "1",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "5",
      }),
    ).toBeInTheDocument();
  });

  it("calls setCurrentPage when page clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "3",
      }),
    );

    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it("calls previous button", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "‹",
      }),
    );

    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls next button", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "›",
      }),
    );

    expect(setCurrentPage).toHaveBeenCalledWith(4);
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "‹",
      }),
    ).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "›",
      }),
    ).toBeDisabled();
  });

  it("shows ellipsis when totalPages greater than 5", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("shows last page button when totalPages greater than 5", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "10",
      }),
    ).toBeInTheDocument();
  });

  it("clicking last page button works", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        setCurrentPage={setCurrentPage}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "10",
      }),
    );

    expect(setCurrentPage).toHaveBeenCalledWith(10);
  });

  it("does not show ellipsis when totalPages is 5", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });

  it("renders page size dropdown", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        setCurrentPage={setCurrentPage}
        pageSize={20}
      />,
    );

    expect(screen.getByDisplayValue("20 / page")).toBeInTheDocument();
  });

  it("calculates last page range correctly", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        setCurrentPage={setCurrentPage}
        totalItems={42}
        pageSize={10}
      />,
    );

    expect(
      screen.getByText("Showing 41 to 42 of 42 tasks"),
    ).toBeInTheDocument();
  });

  it("highlights current page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        setCurrentPage={setCurrentPage}
      />,
    );

    const currentPageButton = screen.getByRole("button", {
      name: "3",
    });

    expect(currentPageButton).toHaveClass("bg-[#2563EB]");
  });
});
