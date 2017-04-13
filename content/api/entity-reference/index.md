---
layout: layout-container
name: Entity Reference
order: 250
published: true
showInNav: true
showBreadcrumbs: false
title: Entity Reference
entity: 
    - name: Accounts Payable
      description: Describes the entity and type representations for common items that the Accounts Payable API uses.
      icon: university
      url: /api/entity-reference/accounts-payable
    - name: Constituent
      description: Describes the entity and type representations for common items that the Constituent API uses.
      icon: user
      url: /api/entity-reference/constituent
    - name: Fundraising (Beta)
      description: Describes the entity and type representations for common items that the Fundraising API uses.
      icon: line-chart
      url: /api/entity-reference/fundraising
    - name: General Ledger
      description: Describes the entity and type representations for common items that the General Ledger API uses.
      icon: book
      url: /api/entity-reference/general-ledger
    - name: Gift (Beta)
      description: Describes the entity and type representations for common items that the Gift API uses.
      icon: gift
      url: /api/entity-reference/gift
    - name: Opportunity (Beta)
      description: Describes the entity and type representations for common items that the Opportunity API uses.
      icon: users
      url: /api/entity-reference/opportunity
---

<h1>{{ name }}</h1>
<div class="container">
<div class="row">
<div class="col-md-12">
<div class="showcase row" stache-equal-height>
<div class="clearfix"></div>
{{# eachWithMod entity mod=3 }}
{{# if firstOrMod0 }}
 <div class="row">
 {{/ if }}
        <div class="col-md-4">
            <i class="fa fa-fw fa-3x fa-{{ icon }} showcase-icon"></i>
            <div class="showcase-desc">
                <h2>
                    <a href="{{ url }}">{{ name }}</a>
                </h2>
                <p>{{ description }}</p>
            </div>
        </div>
        {{# if lastOrMod1 }}</div>{{/ if }}{{/ eachWithMod }}
        </div></div></div></div>
