# TLDR

Notes related to how to map a domain name to a Cloud Run service

- REFERENCE: https://stackoverflow.com/questions/59770533/cookies-without-samesite-attribute-are-sent-on-different-sub-domains#:~:text=An%20eTLD%2B1%20is%20the,controlled%20by%20the%20same%20entity

- Enable `runapps.googleapis.com`
  - `gcloud services enable runapps.googleapis.com`

- Go to the GCR service dashboard & visit the `INTEGRATIONS` tab
  - Add integration
  - Custom domains - Google Cloud Load Balancing
  - 