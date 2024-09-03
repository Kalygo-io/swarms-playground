# TLDR

Documenting steps of how to deploy to GCP

## ToC

1. Artifact Registry
2. Cloud Build
3. Cloud Run

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
--location=us-east1 \
--description="Docker repository for Kalygo 3.0 web app" \
--immutable-tags \
--async
```
- CONFIRM ARTIFACT WAS CREATED: `https://console.cloud.google.com/artifacts?hl=en&project=kalygo-v3`
  - `gcloud artifacts repositories list`

## 2. Cloud Build

- update `next.config.mjs`
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
