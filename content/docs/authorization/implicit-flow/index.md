---
name: Implicit Flow
description: The Implicit Flow is carried out client-side within a browser-based app. Since the code is available to the browser, the <%= stache.config.guide_apps_client_secret_name %> cannot be kept a secret and is not used to request an access token.  As a result, the access tokens that are issued are short-lived and there are no refresh tokens to extend them when they expire.
layout: layout-tutorial
order: 150
published: true
showInNav: true
title: Implicit Flow
sidebarLayoutSecondaryColumn: col-md-2 sidebar-tutorial
sidebarLayoutPrimaryColumn: col-md-8
bootstrap_container: bg-tutorial
markdown: false
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

<section class="section-padding bg-tutorial">
  <div class="text-center">
    <h1 class="tutorial">{{ name }}</h1>

<ul class="slide-container">
<li class="introslide">
<h2 class="tutorial">Introduction</h2>

{{ include 'includes/implicitflow/intro.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 1 &#8211; Request authorization</h2>

{{ include 'includes/implicitflow/step1.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 2 &#8211; User authorizes your app</h2>

{{ include 'includes/implicitflow/step2.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 3 &#8211; Access token provided</h2>

{{ include 'includes/implicitflow/step3.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 4 &#8211; Call the {{ stache.config.product_name_short }}</h2>

{{ include 'includes/implicitflow/step4.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 5 &#8211; Next steps</h2>

{{# markdown }}
For more information on implementing the implicit flow, check out our **[code samples]({{ stache.config.guide_web_api_authorization_implicit_flow_tutorial_home }})**.
{{/ markdown }}
</li>


</div></section>

{{ include stache.config.partial_disqus }}
