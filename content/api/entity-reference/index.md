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
      icon: fa-university
      url: /api/entity-reference/accounts-payable
    - name: Constituent
      description: Describes the entity and type representations for common items that the Constituent API uses.
      icon: fa-user
      url: /api/entity-reference/constituent
    - name: Fundraising (Beta)
      description: Describes the entity and type representations for common items that the Fundraising API uses.
      icon: fa-line-chart
      url: /api/entity-reference/fundraising
    - name: General Ledger
      description: Describes the entity and type representations for common items that the General Ledger API uses.
      icon: fa-book
      url: /api/entity-reference/general-ledger
    - name: Gift (Beta)
      description: Describes the entity and type representations for common items that the Gift API uses.
      icon: fa-gift
      url: /api/entity-reference/gift
    - name: Opportunity
      description: Describes the entity and type representations for common items that the Opportunity API uses.
      icon: fa-handshake-o
      url: /api/entity-reference/opportunity
    - name: Treasury (Beta)
      description: Describes the entity and type representations for common items that the Treasury API uses.
      icon: fa-money
      url: /api/entity-reference/treasury
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
        <div class="col-sm-4">
            <i class="fa fa-fw fa-3x {{ icon }} showcase-icon"></i>
            <div class="showcase-desc">
                <h2>
                    <a href="{{ url }}">{{ name }}</a>
                </h2>
                <p>{{ description }}</p>
            </div>
        </div>
        {{# if lastOrMod1 }}</div><br />{{/ if }}{{/ eachWithMod }}
        </div></div></div></div>
