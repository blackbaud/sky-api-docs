---
layout: layout-sidebar
name: Overview
order: 10
published: true
showInNav: true
back_to_top: true
title: Overview
---
{{ include stache.config.partial_header_edit }}

# Add-ins {{ name }}

SKY Add-ins allow developers to build complementary features that integrate deeply within the user interface of Blackbaud's solutions.  With add-ins, developers can use familiar web development technologies such as HTML, CSS, and JavaScript to augment out-of-box product areas with new functionality.

For example, with add-ins you can:
* <strong>Add custom tiles to selected pages in the system</strong> - bring in data from external systems that is contextually relevant to the current record and provide streamlined workflows for business logic. 
* <strong>Create rich, interactive user experiences</strong> - expose new 3rd-party visualizations

Add-ins are implemented as web applications that run external to the Blackbaud host application, so they can do almost anything that a webpage can do inside a browser. At runtime, the host application provides an isolated sandbox iframe that contains the add-in page, and provides context values needed to load the add-in.

<img style="border:none" src="/assets/img/constituent-tile.png" />

## Key features

The add-ins framework provides the following:

* A "write-once, run anywhere" model - SKY add-ins provide cross-platform/browser/device support, so they appear on and work great from mobile devices as well as desktop browsers.
* Uses standard web technologies - add-ins are web applications, so you can use any framework/tech stack/libraries desired, both client-side and server-side.  For example, use ASP.NET, PHP, Node.js, MVC, Angular, React, etc.
* Easy deployment - add-ins are deployed to your cloud, so you control how and when your add-in is updated.
* Single sign-on (SSO) - add-ins integrate easily with 3rd-party systems.
* Communicate with the host application using SKY API.
* Associated with SKY applications - when customers enable your SKY application, they'll see the add-ins you've defined.

## Components of an add-in

Add-ins are defined as part of your SKY application within the [SKY API developer portal](https://developer.sky.blackbaud.com/).  There are two basic components of an add-in: an extension point (described below) and the URL of your own web application.

<img style="border:none" src="/assets/img/overview.png" alt="Overview" />

## Types of add-ins

Add-ins are associated with specific locations within the Blackbaud user interface, known as <a href="{{ stache.config.guide_addins }}concepts/extension-points"><strong>extension points</strong></a>.  The extension point represents a named location in the user interface where add-ins can be rendered, and it defines both the "class" of add-in (tile, button, tab, etc.) as well as the shape of the context values that will be provided at runtime.

### Tile add-ins

Tile add-ins can be created for for selected pages within the system that support a dashboard of tiles.  Custom tiles will persist state and location on a per-user basis along with other native tiles.

<img style="border:solid 1px #E7E7E7" src="/assets/img/tile-add-ins.png" alt="Tile add-ins" />

### Button add-ins (coming soon)

Button add-ins can be created for selected pages within the system that support page-level actions.

<img style="border:solid 1px #E7E7E7" src="/assets/img/button-add-ins.png" alt="Button add-ins" />

### Tab add-ins (coming soon) 

Tab add-ins can be created for selected pages within the system that use tabs.

<img style="border:solid 1px #E7E7E7" src="/assets/img/tab-add-ins.png" alt="Tab add-ins" />

### Future add-ins

Over time, we'll introduce support for new types of add-ins and new extension points within the system.

<bb-alert bb-alert-type="info"><strong>Note!</strong> Stay informed as new extension points are introduced by following the <a href="https://apidocs.sky.blackbaud.com/support/changelog">SKY Add-ins changelog page</a>, and feel free to submit <a href="https://apidocs.sky.blackbaud.com/support/ideas">Ideas</a> for new types of add-ins and extension points.</bb-alert>

## Next steps

* View the <a href="{{ stache.config.guide_addins }}get-started/createaddin">Getting started</a> tutorial to learn more about how to build a SKY Add-in.
* View the <a href="{{ stache.config.guide_addins }}get-started/hello-world">Hello World</a> sample to see a detailed walk-through of building an add-in.
* View additional <a href="{{ stache.config.guide_addins }}/concepts">concepts</a> and capabilities associated with the SKY Add-ins framework.
* View our <a href="{{ stache.config.guide_addins }}how-to-guides/addin-design">design guidelines</a> to read about building an effective and compelling user experience for your add-in.