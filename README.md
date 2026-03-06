# mercenari.org

## Running locally

To install dependencies run:

```sh
npm ci --include=dev
```

To start the development server run:

```sh
npm run dev
```

## Node / Python versions

This project is deployed on Cloudflare Pages. Check [Cloudflare Pages tooling
versions](https://developers.cloudflare.com/pages/configuration/build-image/)
docs to decide which Node and Python versions to pin in your environment files.

- Node version in [`.nvmrc`](.nvmrc)
- Python version in [`.python-version`](.python-version)

Keeping these files up to date ensures fast builds.
