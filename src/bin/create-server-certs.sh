#!/bin/bash
set -u
set -e

FQDN='vietnamfishery.tk'

# make directories to work from
mkdir -p certs/{server,ca,tmp}

# Create Certificate for this domain,
openssl genrsa \
  -out certs/server/my-server.key.pem \
  2048

# Create the CSR
openssl req -new \
  -key certs/server/my-server.key.pem \
  -out certs/tmp/my-server.csr.pem \
  -subj "//C=US\ST=Utah\L=Provo\O=ACME Signing Authority Inc\CN=${FQDN}"
