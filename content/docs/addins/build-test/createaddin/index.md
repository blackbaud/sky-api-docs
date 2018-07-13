---
layout: layout-sidebar
name: Create an Add-in
order: 100
published: true
showInNav: true
title: Create an Add-in
---

{{ include stache.config.partial_header_edit }}

# {{ name }}

To successfully create an add-in with {{ stache.config.product_name_short }}, follow this step-by-step guide. Before you begin, you need to have created a Blackbaud developer account as covered in the  <a href="{{ stache.config.guide_getting_started }}">Getting Started</a> guide.


## Step 1 - Build your add-in

Since add-ins are web applications, you can use any framework/tech stack/libraries that you desire, both client-side and server-side.  For example, you can use ASP.NET, PHP, Node.js, MVC, Angular, React, etc. To see an example of an add-in that uses HTML, CSS, and Javscript web development technologies, see our <a href="{{ stache.config.guide_addins/build/code-sample }}>Sample Add-in</a> documentation.

A requirement for SKY API Add-ins is that they must include the Add-in Client JavaScript library on the page to facilitate the interop with the host application.  This library is <a href="https://github.com/blackbaud/sky-api-addin" target="_new">open source on GitHub</a> and available as an <a href="https://www.npmjs.com/package/@blackbaud/sky-api-addin" target="_new">NPM package</a>.


## Step 2 - Deploy your add-in

To register your add-in, you need to deploy your add-in so that you have a web application URL. The URL must be absolute and use HTTPS. However, because your add-ins are deployed to your cloud, you control how and when your add-in is updated!

We do support local development, so if you’re able to serve the web site locally, you can provide a localhost:port value for the URL (for example: https://localhost:4000). To avoid mixed content problems in the browser, you’ll need to use https and have SSL configured locally.
The URL must be a fully qualified URL, and can include static parameter values.

## Step 2 – Register your app

{{ include 'includes/addins/registerapp.md' }}

## Step 3 – Register add-in

<bb-alert bb-alert-type="success">
Before you complete this step, you need to have a web application deployed so you can use the web application link when you register the add-in.
</bb-alert>

<ol>
<li><p>From <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>, select the application name for which you want to register an Add-in.</p></li>
<li><p>Under Add-ins, select <b>Add</b>. The Add add-in screen appears.</p>
<p><img src="/assets/img/add_addin.png" class="img-responsive"></p>
</li>
<li><p>Enter a unique name for the add-in. This name is for your use only, Blackbaud solution users will not see it.</p></li>
<li><p>Select the extension point for where you want to insert your add-in into the Blackbaud solution. For more information about extension points, see the <a href="/docs/addins/context">Extension Points Add-in</a> documentation.</p></li>
<li><p>Specify the web application URL to use with your addin. The URL must be absolute and use HTTPS.</p></li>
</ol>

## Step 4 – Application activation

{{ include 'includes/addins/activateapp.md' }}

## Step 5 – Verify the add-in

To ensure the add-in looks and works as you expect it to, after you register your add-in, we recommend you view the add-in within the Blackbaud solution.

Today, Add-ins are only available to deploy into Raiser's Edge NXT. However, it requires a special query parameter until we’re closer to general availability. Within Raiser's Edge NXT, you can add the following query parameter to tell the page to check for add-ins:

<pre><code>&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}</code></pre>

For example, you’d specify the query param on the constituent page like this:
<pre><code>https://renxt.blackbaud.com/constituents/280?tenantid=YOURTENANTID&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}</code></pre>

When the page loads, your custom add-in tile will appear.

## Next Steps

<ul>
<li><p>If you are going to make API calls, you'll want to complete the <a href="/docs/getting-started/">Getting Started guide</a>.</li></p>
<li><p>If you also want to create an application that makes API calls, you'll want to complete the <a href="/docs/createapp/">Create an Application tutorial</a>.</p></li>
<li><p>If you want to support a single-sign-on (SSO) mechanism that can be used to correlate the Blackbaud user with a user in your add-in's native system, see the <a href="/docs/addins/addin-sso">SKY API Add-in SSO</a> documentation.</p></li>
</ul>

