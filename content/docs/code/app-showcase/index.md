---
name: App Showcase
layout: layout-container
description: A collection of fully-formed applications that can assist in quick-starting your own SKY API applications
order: 3
icon: fa fa-fw fa-3x fa-cube
showBreadcrumbs: true
title: App Showcase
appShowcase:
  - title: Barkbaud (NodeJS)
    icon: fa-cube
    repo: <%= stache.config.github_repo_barkbaud_nodejs %>
    description: A full-stack NodeJS application that demonstrates how to access constituent data via SKY API, implements a front-end using SKY UX, and negotiates security using OAuth 2.0 Authorization Code Flow
    demo: <%= stache.config.tutorial_barkbaud_live_demo %>
---

# {{name}}

<div class="showcase">
  <div class="clearfix"></div>
  {{# eachWithMod appShowcase mod=3 }}
    {{# if firstOrMod0 }}
    <div class="row showcase-row">
    {{/ if }}
      <div class="col-sm-6 col-md-4">
        <i class="fa fa-fw fa-3x {{ icon }} showcase-icon"></i>
        <div class="showcase-desc">
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
          <p>
            {{# if repo }}
              <a class="btn btn-primary" href="{{ repo }}" target="_blank">
                <i class="fa fa-github"></i> View on GitHub
              </a>
            {{/ if }}
            {{# if demo }}
              <a class="btn btn-default" href="{{ demo }}" target="_blank">
                <i class="fa fa-globe"></i> View live demo
              </a>
            {{/ if }}
          </p>
        </div>
      </div>
    {{# if lastOrMod1 }}
    </div>
    {{/ if }}
  {{/ eachWithMod }}
</div>
