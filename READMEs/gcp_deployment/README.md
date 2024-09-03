# TLDR

Documenting steps of how to deploy to GCP

## ToC

1. Artifact Registry
2. Cloud Build
3. Cloud Run
4. CICD with Github Actions

## 1. Artifact Registry

- add Dockerfile
  - `touch Dockerfile`
- SMOKE gcloud CLI
  - `gcloud config list`
  - `gcloud services enable compute.googleapis.com`
  - `gcloud compute regions list`
- `gcloud services enable artifactregistry.googleapis.com`
- Create artifact in Artifact Registry
``` template
gcloud artifacts repositories create REPOSITORY \
  --repository-format=docker \
  --location=LOCATION \
  --description="DESCRIPTION" \
  --immutable-tags \
  --async
```
``` ie:
gcloud artifacts repositories create kalygo3-nextjs \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker repository for Kalygo 3.0 web app" \
  --immutable-tags \
  --async
```
- CONFIRM ARTIFACT WAS CREATED: `https://console.cloud.google.com/artifacts?hl=en&project=kalygo-v3`
  - `gcloud artifacts repositories list`

## 2. Cloud Build

- update `next.config.mjs`
  - REFERENCE: https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  ```
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // reactStrictMode: true,
    output: "standalone",
  };
  export default nextConfig;
  ```
- REFERENCE: https://cloud.google.com/build/docs/build-push-docker-image#build_an_image_using_a_build_config_file
- `touch cloudbuild.yaml`
- `gcloud services enable cloudbuild.googleapis.com`
- `gcloud builds submit --region=us-central1 --config cloudbuild.yaml`
  - REFERENCE: https://cloud.google.com/build/docs/locations#restricted_regions_for_some_projects
- CONFIRM IMAGE WAS STORED: `https://console.cloud.google.com/artifacts/docker/kalygo-v3/us-east1/kalygo3-nextjs?hl=en&project=kalygo-v3`

## 3. Cloud Run

- `gcloud services enable run.googleapis.com`
- `gcloud services list --enabled`
- `touch service.yaml`
- `gcloud run services replace service.yaml --region us-east1`
- `touch gcr-service-policy.yaml` <!-- This makes the service accessible on the internet -->
- `gcloud run services set-iam-policy kalygo3-nextjs-service gcr-service-policy.yaml --region us-east1`

## 4. CICD with GitHub Actions

- Create Service Account in GCP project ie: `kalygo-v3` (TODO: find CLI commands for how to do this)
  - https://console.cloud.google.com/iam-admin/serviceaccounts?hl=en&project=kalygo-v3
  - I created one called `kalygo3-sa`
- Add permissions to Service Account
  1. gcloud projects add-iam-policy-binding kalygo-v3 \
  --member="serviceAccount:kalygo3-sa@kalygo-v3.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"
  2. gcloud projects add-iam-policy-binding kalygo-v3 \
  --member="serviceAccount:kalygo3-sa@kalygo-v3.iam.gserviceaccount.com" \
  --role="roles/run.admin"
  3. gcloud iam service-accounts add-iam-policy-binding 137963986378-compute@developer.gserviceaccount.com \
  --member="serviceAccount:kalygo3-sa@kalygo-v3.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
- Create a .json key of the Service Account (SA) credentials
- Add `Actions secret` to relevant repo in GitHub
  - Go to `Settings > Secrets and variables > Actions`
  - Create a `New repository secret`
    - Name: `GCP_SA_KEY`
    - Secret: Paste in the .json SA creds
- mkdir -p .github/workflows
- touch .github/workflows/cicd.yaml
- Configure ENV vars in the cicd.yaml
  - ie: .env vars
  ```
  PROJECT_ID: kalygo-v3 # Google Cloud project id
  GAR_LOCATION: us-central1 # Artifact Registry location
  SERVICE: kalygo3-nextjs-service # Cloud Run service name
  REGION: us-east1 # Cloud Run service region
  ARTIFACTORY_URL: us-central1-docker.pkg.dev/kalygo-v3/kalygo3-nextjs/kalygo3-nextjs
  ```
- Test commit and push to `main` branch
