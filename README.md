# mercenari

## Running locally

To start the development server run:

```sh
npm run dev
```

## Node / Python versions

This project is deployed on Cloudflare Pages. Check [Cloudflare Pages tooling
versions](https://developers.cloudflare.com/pages/configuration/build-image/)
docs to decide which Node and Python versions to pin in your environment files.

- Create a `.nvmrc` with the Node version you choose (e.g. `22.16.0`).
- Create a `.python-version` with the Python version you choose (e.g. `3.13.3`).

Keeping those files in the repo helps ensure consistent local and CI
environments.
