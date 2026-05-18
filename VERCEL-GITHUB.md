# GitHub contributions API

This site deploys on **Netlify**. Serverless setup, environment variables, and verification steps are documented in **[NETLIFY-GITHUB.md](./NETLIFY-GITHUB.md)**.

The client still calls **`/api/github-contributions`**; Netlify rewrites that path to the function (see `netlify.toml`).
