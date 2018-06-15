---
layout: layout-tutorial
name: Create an Add-in
order: 100
published: true
showInNav: true
title: Create an Add-in
sidebarLayoutSecondaryColumn: col-lg-2 col-md-3 col-sm-12 sidebar-tutorial
sidebarLayoutPrimaryColumn: col-lg-8 col-md-8 col-sm-12
bootstrap_container: bg-tutorial
markdown: false
---

{{ include stache.config.partial_header_edit }}

<section class="section-padding bg-tutorial">
<div class="text-center">
<h1 class="tutorial">{{ name }}</h1>
<p class="lead tutorial">To successfully create an add-in with {{ stache.config.product_name_short }}, follow this step-by-step guide. Before you begin, you need to have created a Blackbaud developer account as covered in the  <a href="{{ stache.config.guide_getting_started }}">Getting Started</a> guide.</p>

<ul class="slide-container">
<li class="slide">
<h2 class="tutorial">Step 1 – Register your app</h2>
<p>we recommend you create both a test and production apps</p>
</li>

<li class="slide">
<h2 class="tutorial">Step 2 – Application activation</h2>
<p>Have your application activated in a testing tenant.</p>
</li>

<li class="slide">
<h2 class="tutorial">Step 3 – Register test add-in</h2>
<p>Before you complete this step, you need to have a web application deployed so you can use the web applicatoin link when you register the add-in.</p>
<p>For testing purposes, we recommend you register your add-in in your test tenant first</p>
<p>Register the add-in

Now that my web application has been deployed, I can register it as part of my SKY API application by navigating to the SKY API developer portal and choosing “My applications” from the Developer Account menu to reach the applications page. From the list shown, I’ll navigate into the application details by clicking on the application name, and from there I can choose the “Add” button from within the Add-ins tile to create a new add-in definition:

On this dialog, I just need to provide the URL for my web application and indicate the extension point - in this case, our tile represents an extension to the “Constituent Tile Dashboard”. I can also provide a friendly Name for the add-in, just to help distinguish it from other add-ins I might create later. The name itself is not currently presented to customers.

A few notes about the URL:
We do support local development, so if you’re able to serve the web site locally, you can provide a localhost:port value for the URL (for example: https://localhost:4000). To avoid mixed content problems in the browser, you’ll need to use https and have SSL configured locally.
The URL must be a fully qualified URL, and can include static parameter values.

That all! Once defined, the add-in will be shown for any customers who’ve enabled the SKY API application.</p>
</li>

<li class="slide">
<h2 class="tutorial">Step 4 – Test the add-in</h2>
<p>For testing purposes, we recommend you register your add-in in your test tenant first</p>
<p>View the add-in within Raiser’s Edge NXT

The add-in feature is available in RENXT in production today, but it requires a special query param for now until we’re closer to GA. Within RENXT, you can add the following query parameter to tell the page to check for add-ins:
&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}

For example, you’d specify the query param on the constituent page like this:
https://renxt.blackbaud.com/constituents/280?tenantid=YOURTENANTID&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}

When the page loads, our custom tile will appear (likely at the bottom of the page):
</p>
</li>

<li class="slide">
<h2 class="tutorial">Step 5 – Register the add-in</h2>
<p>Once you feel like your add-in is ready, register your add-in in your production app.</p>
</li>

<li class="slide">
<h2 class="tutorial">Next Steps</h2>
<p>If you are going to make API calls, you'll want to complete the Getting Started guide. If you also want to create an application that makes API calls, you'll want to complete the Create an Application tutorial.</p>
</li>
</ul>
</div>
</section>







