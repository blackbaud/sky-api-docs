---
layout: "layout-sidebar"
name: Basics
description: Docs to learn our APIs.
order: 300
published: true
showInNav: true
showInHeader: true
showInFooter: true
back_to_top: true
title: Basics
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# {{ name }}

The following information provides an overview of some key concepts within the {{ stache.config.api_type_name }}.  We'll assume you have some familiarity with RESTful programming concepts and the associated tools and techniques for consuming web services.

## Base URL 

{{ include 'includes/basics/baseurl.md' }}

## Scheme

{{ include 'includes/basics/scheme.md' }}

## Subscription

{{ include 'includes/basics/subscription.md' }}


## Authorization

{{ include 'includes/basics/authorization.md' }}

## HTTP verbs

{{ include 'includes/basics/httpverbs.md' }}

## Request headers

{{ include 'includes/basics/requestheaders.md' }}

## Content types

{{ include 'includes/basics/contenttypes.md' }}

## Response status codes

{{ include 'includes/basics/response.md' }}

## Rate limits
{{ include 'includes/basics/ratelimits.md' }}

## Quotas

{{ include 'includes/basics/quotas.md' }}

## Pagination

{{ include 'includes/basics/pagination.md' }}

## Date formats

{{ include 'includes/basics/dateformats.md' }}

## Fuzzy dates

{{ include 'includes/basics/fuzzydates.md' }}

## Security

{{ include 'includes/basics/security.md' }}

## Activating the {{ stache.config.dev_console_name }}

{{ include 'includes/basics/skyapiconsole.md' }}

## Breaking changes

{{ include 'includes/basics/breakingchanges.md' }}

{{ include stache.config.partial_disqus }}

