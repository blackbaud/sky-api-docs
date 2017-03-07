---
layout: layout-container
name: API
order: 10
published: true
showInNav: false
showBreadcrumbs: true
title: APIs
---

<h1>{{ name }}</h1>

<div class="showcase">
        <div class="row">

            <div class="col-sm-4">
                <i class="fa fa-fw fa-3x fa-code showcase-icon"></i>
                <div class="showcase-desc">
                    <h2>
                        <a href="{{ stache.config.portal_endpoints }}">Endpoint Reference</a>
                    </h2>
                    <p>Explore the endpoints available to you with the {{ stache.config.product_name_short }}.</p>
                </div>
            </div>

            <div class="col-sm-4">
                <i class="fa fa-fw fa-3x fa-puzzle-piece showcase-icon"></i>
                <div class="showcase-desc">
                    <h2>
                        <a href="{{ stache.config.entity_reference }}">Entity Reference</a>
                    </h2>
                    <p>Describes the entity and type representations for common items that the {{ stache.config.product_name_short }} uses.</p>
                </div>
            </div>

            <div class="col-sm-4">
                <i class="fa fa-fw fa-3x fa-user-plus showcase-icon"></i>
                <div class="showcase-desc">
                    <h2>
                        <a href="{{ stache.config.portal_products }}">Products</a>
                    </h2>
                    <p>Learn about and subscribe to the products offered through the {{ stache.config.product_name_short }}.</p>
                </div>
            </div>

        </div>
    </div>
