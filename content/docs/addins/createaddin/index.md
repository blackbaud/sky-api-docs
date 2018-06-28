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
{{ include 'includes/addins/registerapp.md' }}
</li>

<li class="slide">
<h2 class="tutorial">Step 2 – Application activation</h2>
{{ include 'includes/addins/activateapp.md' }}
</li>

<li class="slide">
<h2 class="tutorial">Step 3 – Register test add-in</h2>
<div style="text-align: left;">
<bb-alert bb-alert-type="success">Before you complete this step, you need to have a web application deployed so you can use the web application link when you register the add-in.</bb-alert>
<p>For quality purposes, we recommend you register and test your add-in before deploying to customers.</p>

<ol>
<li><p>From <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>, select the application name for which you want to register an Add-in.</p></li>
<li><p>Under Add-ins, select <b>Add</b>. The Add add-in screen appears.</p>
<p><img src="/assets/img/add_addin.png" class="img-responsive"></p>
</li>
<li><p>Enter a unique name for the add-in. This name is for your use only, Blackbaud solution users will not see it.</p></li>
<li><p>Select the extension point for where you want to insert your add-in into the Blackbaud solution. For more information about extension points, see the <a href="/docs/addins/context">Extension Points Add-in</a> documentation.</p></li>
<li><p>Specify the web application URL to use with your addin. The URL must be absolute and use HTTPS.</p>
<p>We do support local development, so if you’re able to serve the web site locally, you can provide a localhost:port value for the URL (for example: https://localhost:4000). To avoid mixed content problems in the browser, you’ll need to use https and have SSL configured locally.
The URL must be a fully qualified URL, and can include static parameter values.</p></li>
<li><p>Select <b>Save</b>. Your new add-in definition appears in the Add-in tile.</p></li>
</ol>


<li class="slide">
<h2 class="tutorial">Step 4 – Verify the add-in</h2>
<div style="text-align: left;">
<p>To ensure the add-in looks and works as you expect it to, after you register your add-in, we recommend you view the add-in within the Blackbaud solution.</p>

<p>Today, Add-ins are only available to deploy into Raiser's Edge NXT. However, it requires a special query parameter until we’re closer to general availability. Within Raiser's Edge NXT, you can add the following query parameter to tell the page to check for add-ins:
<pre><code>&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}</code></pre></p>

<p>For example, you’d specify the query param on the constituent page like this:
<pre><code>https://renxt.blackbaud.com/constituents/280?tenantid=YOURTENANTID&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}</code></pre></p>

<p>When the page loads, your custom add-in tile will appear.</p>
</p>
</div>
</li>

<li class="slide">
<h2 class="tutorial">Next Steps</h2>
<div style="text-align: left;">
<ul>
<li><p>If you are going to make API calls, you'll want to complete the <a href="/docs/getting-started/">Getting Started guide</a>.</li></p>
<li><p>If you also want to create an application that makes API calls, you'll want to complete the <a href="/docs/createapp/">Create an Application tutorial</a>.</p></li>
<li><p>If you want to support a single-sign-on (SSO) mechanism that can be used to correlate the Blackbaud user with a user in your add-in's native system, see the <a href="/docs/addins/addin-sso">SKY API Add-in SSO</a> documentation.</p></li>
</ul>
</div>
</li>
</ul>
</div>
</section>
