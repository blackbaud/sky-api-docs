---
layout: "layout-sidebar"
name: Add-ins
description: Description
order: 250
published: true
showInNav: true
title: Add-ins
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

<bb-alert bb-alert-type="info"><strong>Important!</strong> This content is a preview of an upcoming capability for SKY API. Limited to beta participants, add-ins are coming soon to the SKY API Developer Portal. If you are interested in more info about add-ins, contact... </bb-alert>

To customize and extend the capabilities of Blackbaud applications, 3rd-party customers, partners, and developers can create **add-ins** through their registered SKY API applications. Add-ins are associated with pre-defined “extension points” in the system – extension points represent the specific areas within the Blackbaud application user interface (UI) that support being customized. Currently, our first implementation of add-ins enable you to extend the functionality of our applications via external web apps running in an iframe on the page. This implmentation means that developers can choose **any** language, tools, or tech stack for their add-in(s). As such, add-ins require no plugin DLLs to deploy in Hosting, no specs to load, no schema changes required, and developers can release enhancements to their add-in(s) at their own discretion and on their own timeframes.

To enable an add-in, Blackbaud customers enable your SKY API application. You then register your add-in with the application. When you do, the add-in will appear in-product for any customer who's enabled your app. However, unlike a typical SKY API application that typically exists side-by-side with a Blackbaud application, add-ins will look, feel, and behave just like native features. For example, custom tiles will save their position and collapsed state along with native tiles.

## Extension points

Extension points will vary by type and we’ll introduce new types of extension points over time. Initially, we’ll support custom tiles, tabs, and buttons. The set of extension points will expand over time, prioritizing based on your feedback.

## Add-in features

<i class="fa fa-angle-double-right" aria-hidden="true"></i> Apps can define multiple add-ins, and the system will aggregate and present add-ins across all SKY API apps that have been enabled at runtime.

<i class="fa fa-angle-double-right" aria-hidden="true"></i> Add-ins will be able to show modal dialogs, and those dialogs will appear exactly like any OOB modal dialog (not constrained to the iframe itself).

<i class="fa fa-angle-double-right" aria-hidden="true"></i> Add-ins follow a “write-once, run everywhere” model, meaning that add-ins will appear and be functional within desktop, tablet, and mobile user experiences (no need to resort to browser extensions anymore).

<i class="fa fa-angle-double-right" aria-hidden="true"></i> If supported by the 3rd-party system, developers can leverage a SSO model for add-ins, where the user need only authenticate to the 3rd-party system once.  The user can switch browsers or devices and continue working without having to re-authenticate.

<br />