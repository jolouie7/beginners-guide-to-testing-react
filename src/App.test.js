import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import mockResponse from "./__mocks__/subreddit-reactjs-response.json";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// TODO: use test.each https://jestjs.io/docs/en/api#testeachtablename-fn-timeout to DRY up code for how it works and about links.

function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe("Header", () => {
  test('how it works: link points to the correct page', () => {
    //During tests we wrap the App inside a MemoryRouter
    setup();
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
    setup();
    const link = screen.getByRole("link", { name: /about/i })
    // screen.debug(link);
    userEvent.click(link);
    expect(
      screen.getByRole("heading", { name: /about/i })
    ).toBeInTheDocument();
  });

  test('"Logo": link points to the correct page', () => {
    setup();
    const link = screen.getByRole("link", { name: /logo.svg/i })
    // screen.debug(link);
    userEvent.click(link);
    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  })
});

// 1.The user enters a value in the form's input and submits.
// 2.The app shows a loading message while it's waiting for the data.
// 3.When the response arrives the data is rendered.
describe("Subreddit form", () => {
  test('loads posts that are rendered on the page', async () => {
    fetch.once(JSON.stringify(mockResponse));
    setup();
    // get the input field and change the input value
    const subredditInput = screen.getByLabelText("r /");
    userEvent.type(subredditInput, "reactjs");

    // get the button and click it
    const submitButton = screen.getByRole("button", { name: /search/i })
    userEvent.click(submitButton);
    expect(
      screen.getByText(/is loading/i)
    ).toBeInTheDocument();

    // When the response arrives the data is rendered
    const numberOfTopPosts = await screen.findByText(/number of top posts:/i);
    expect(
      await screen.findByText(/number of top posts: 25/i)
    ).toBeInTheDocument();

    screen.debug(numberOfTopPosts)
  })
})