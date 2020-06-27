import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// TODO: use test.each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout to DRY up code for how it works and about links.

describe("Header", () => {
  test('how it works: link points to the correct page', () => {
    console.log(name)
    //During tests we wrap the App inside a MemoryRouter
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    // getByRole should be your go-to query.
    // we are getting a link but there are multiple links, so we have to specify a name option with a regex value
    const link = screen.getByRole("link", { name: /how it works/i })
    // screen.debug(link);
    userEvent.click(link);
    expect(
      screen.getByRole("heading", { name: /how it works/i })
    ).toBeInTheDocument();
  });

  test('about: link points to the correct page', () => {
    console.log(name)
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /about/i })
    // screen.debug(link);
    userEvent.click(link);
    expect(
      screen.getByRole("heading", { name: /about/i })
    ).toBeInTheDocument();
  });

  test('"Logo": link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /logo.svg/i })
    // screen.debug(link);
    userEvent.click(link);
    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  })
  
});