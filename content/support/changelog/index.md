---
layout: layout-container
name: Changelog
description: Information on additions, removals, and bug fixes of the API.
order: 100
published: true
showInNav: true
icon: fa fa-file-text-o
back_to_top: true
title: Changelogs
APIs:
  -
    description: "Monitor this page to keep up with common changes shared across all our APIs."
    icon: fa-cloud
    location: shared
    title: Shared
  -
    description: "Monitor this page to keep up with the latest changes to the Accounts Payable API."
    icon: fa-university
    location: ap
    title: Accounts Payable
  -
    description: "Monitor this page to keep up with the latest changes to the Constituent API."
    icon: fa-user
    location: constituent
    title: Constituent
  -
    description: "Monitor this page to keep up with the latest changes to the Fundraising API."
    icon: fa-line-chart
    location: fundraising
    title: Fundraising (Beta)
  -
    description: "Monitor this page to keep up with the latest changes to the General Ledger API."
    icon: fa-book
    location: gl
    title: General Ledger
  -
    description: "Monitor this page to keep up with the latest changes to the Gift API."
    icon: fa-gift
    location: gift
    title: Gift (Beta)
  -
    description: "Monitor this page to keep up with the latest changes to the Opportunity API."
    icon: fa-handshake
    location: opportunity
    title: Opportunity (Beta)
---

# {{ name }}

<div class="showcase">
  <div class="clearfix"></div>
  {{# eachWithMod APIs mod=3 }}
    {{# if firstOrMod0 }}
    <div class="row">
    {{/ if }}
      <div class="col-sm-6 col-md-4">
        <i class="fa fa-fw {{icon}} showcase-icon"></i>
        <div class="showcase-desc">
          <h2>
            <a href="{{location}}">{{title}}</a>
          </h2>
          <p>{{description}}</p>
        </div>
      </div>
    {{# if lastOrMod1 }}
    </div>
    {{/ if }}
  {{/ eachWithMod }}
</div>
