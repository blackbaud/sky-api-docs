---
layout: layout-sidebar
name: Overview
order: 50
published: true
showInNav: true
title: Overview
---
{{ include stache.config.partial_header_edit }}

# Add-ins {{ name }}

Add-ins allow developers to build complementary features that integrate deeply within the user interface of Blackbaud's solutions.  With add-ins, developers can use familiar web development technologies such as HTML, CSS, and JavaScript to augment out-of-box product areas with new functionality.

For example, with add-ins you can:
* <strong>Add custom tiles to selected pages in the system</strong> - bring in data from external systems that is contextually relevant to the current record and provide streamlined workflows for business logic. 
* <strong>Create rich, interactive user experiences</strong> - expose new 3rd-party visualizations

Add-ins are implemented as web applications that run external to the Blackbaud host application, so they can do almost anything that a webpage can do inside a browser. At runtime, the host application provides an isolated sandbox iframe that contains the add-in page, and provides context values needed to load the add-in.

<img style="border:none" src="/assets/img/constituent-tile.png" alt="todo:  use a more appropriate image, perhaps clarify _exactly_ where the add-in content is rendered within the tile body, not header" />

### Key features

The add-ins framework provides the following:

* A "write-once, run anywhere" model - SKY add-ins provide cross-platform/browser/device support, so they appear on and work great from mobile devices as well as desktop browsers.
* Uses standard web technologies - add-ins are web applications, so you can use any framework/tech stack/libraries desired, both client-side and server-side.  For example, use ASP.NET, PHP, Node.js, MVC, Angular, React, etc.
* Easy deployment - add-ins are deployed to your cloud, so you control how and when your add-in is updated.
* Single sign-on (SSO) - add-ins integrate easily with 3rd-party systems.
* Communicate with the host application using SKY API.
* Associated with SKY applications - when customers enable your SKY application, they'll see the add-ins you've defined.

### Components of an add-in

Add-ins are defined as part of your SKY application within the [SKY API developer portal](https://developer.sky.blackbaud.com/).  There are two basic components of an add-in: an extension point (described below) and the URL of your own web application.

<img style="border:none" src="/assets/img/overview.png" alt="Overview" alt="todo:  use a more appropriate image" />

### Types of add-ins

Add-ins are associated with specific locations within the Blackbaud user interface, known as <strong>extension points</strong>.  The extension point represents a named location in the product where add-ins can be rendered, and it defines both the "class" of add-in (tile, button, tab, etc.) as well as the shape of the context values that will be provided at runtime.

Over time, we'll introduce support for new types of add-ins and new extension points within the system.

Currently, the following classes of add-ins can be created:
* Constituent page tile dashboard - provides a way to inject custom tiles onto the constituent page

todo:  this would be a potential location for documenting the "universe of extension points", and when we have more types of add-ins, we could enumerate examples of each here with some screen shots depicting how/where they are rendered