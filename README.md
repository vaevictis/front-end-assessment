# Setup

```bash
git clone vaevictis/front-end-assessment
cd front-end-assessment
npm install
```

# Start development
`npm start`

## Notes
### Vulnerabilities
- There are 6 vulnerabilities identified on initial app dependency install. They are known false positives as per [Dan Abramov's post](https://overreacted.io/npm-audit-broken-by-design/)
- Octokit is throwing warnings which are also [false positives](https://github.com/octokit/plugin-throttling.js/issues/583)

### Performance
There's an obvious n+1 performance issue with my current Forkers network request architecture which would quickly become a bottleneck.
I end up looping and making an extra API request for every gist after I've unlocked the paginated gists request.
Solutions could be:
- migrate the requests to the GraphQL github API, which would allow getting all the data in one fell swoop.
- Actually display the gist results paginated, and only fetch the Forks for each new paginated set load.
