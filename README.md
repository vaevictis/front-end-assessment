# Setup

```bash
git clone vaevictis/front-end-assessment
cd front-end-assessment
npm install
```

# Start development
`npm start`

## Notes
- There are 6 vulnerabilities identified on initial app dependency install. They are known false positives as per [Dan Abramov's post](https://overreacted.io/npm-audit-broken-by-design/)
- Octokit is throwing warnings which are also [false positives](https://github.com/octokit/plugin-throttling.js/issues/583)
