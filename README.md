# MessMate

MessMate is a Vite + React hostel food management demo.

## Run locally

```sh
npm ci
npm run dev
```

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys
the app when changes are pushed to `main` or `master`. It sets the Vite base path
from the repository name, so project sites load their assets from the correct
subdirectory. Hash-based routes keep pages such as the dashboard and login
working on GitHub Pages.

In the repository settings, set **Pages > Build and deployment > Source** to
**GitHub Actions**. The deployed URL appears in the workflow run and under
**Settings → Pages**.

The project site URL is <https://sonukumar970.github.io/Messmate/>.