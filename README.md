# Live example
I've hooked this repository to a [Vercel project](https://front-end-assessment-nine.vercel.app).
There's no API signature in there so rate limits will happen sooner than later.

# Setup
```bash
git clone vaevictis/front-end-assessment
cd front-end-assessment
npm install
```
set a [github token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for authenticating your requests. It's not necessary per se as this project hits public API endpoints, but the rate limiting will happen fast, notably because of the performance note below.

# Start development
`npm start`

## Notes
### Library choices
- For the sake of speed, I ended up using Octokit, a Github library that abstracts calls to its APIs. I could have used axios or (my personal preference) the now browser-standard `fetch` function.
- I've also used Material UI in order to get basic styles straight out of the box for my search field and results table. Nothing particularly fancy, and I've made some comments in the code around the pros and cons of this choice.

### Vulnerabilities
- There are 6 vulnerabilities identified on initial app dependency install. They are known false positives as per [Dan Abramov's post](https://overreacted.io/npm-audit-broken-by-design/)
- Octokit is throwing warnings which are also [false positives](https://github.com/octokit/plugin-throttling.js/issues/583)

### Performance
There's an obvious n+1 performance issue with my current Forkers network request architecture which would quickly become a bottleneck.
I end up looping and making an extra API request for every gist. As I'm  fetching all the gists (as per instructions) for a given user and I then request the forks for each gist, this generates a large amount of extra queries for any user having more than a handful of gists.

Solutions could be:
- migrate the requests to the GraphQL github API, which would allow getting all the data in one swift move.
- Actually display the gist results paginated, and only fetch the Forks for each new paginated set load.

### Switch to GraphQL
Through the use of Github's excellent [graphQL Explorer](https://docs.github.com/en/graphql/overview/explorer), I came up quickly with this schema which would get me the data I need in one single request:

```json
query {
  user (login: "gaearon") {
    gists (first: 10, orderBy: {field: CREATED_AT, direction: DESC} ) {
      edges {
        node {
          id,
          isPublic,
          description,
          files {
            encodedName
            encoding
            extension
            name
            size
            text
          },
          forks(first: 3) {
            edges {
              node {
                id,
                description,
                name,
                owner {
                  id,
                  login,
                  avatarUrl,
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Other improvements
- The API calls could be moved into an APIs module and have functions imported in the components where they are needed. It would be a good approach if I started having more components doing various network requests.

- In order to better secure a Github API token or any other secret, it should only be served from a potential backend server.

- I do not have extensive Typescript experience, and I've ended up declaring all the payload-returning API calls with a return type of `any`. It's a bit of an anti-pattern when the type is actually known and documented (albeit would be very large to describe manually). Github provides types for its APIs, so the obvious next step would be to import those.

### Testing strategy
As there was nothing specified around writing tests in the instructions, I didn't spend much time on that.
I still ended up writing a simple static text check for the sake of having the test suite running against my code.

I've also added a mostly commented-out spec in `forksTableCell.test.js`, to give a sense of a component-level testing strategy I'd employ:
- Render a component in test context
- Mock an API call
- Ensure component has correctly rendered the data

The main issue I encountered was around the mocking of Octokit. Ultimately, in order to correctly test this app I would probably get rid of Octokit and get back to a native `fetch` approach for the API calls, which is much simpler to mock, notably because it's much more documented.

Finally, there would always be a conversation around End to End testing. I've worked with Selenium in the past, I think it's functional but a bit of a heavy toolset to setup. I've also had success with Cypress in the past.
