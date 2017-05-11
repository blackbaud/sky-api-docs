---
name: Getting Started
description: Obtain the necessary knowledge to make API calls using our interactive <%= stache.config.dev_console_name %>
order: 100
layout: layout-tutorial
published: true
back_to_top: true
title: Getting Started
sidebarLayoutSecondaryColumn: col-md-2 sidebar-tutorial
sidebarLayoutPrimaryColumn: col-md-8
bootstrap_container: bg-tutorial
markdown: false
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

<section class="section-padding bg-tutorial">
  <div class="text-center">
    <h1 class="tutorial">{{ name }}</h1>

<p class="lead tutorial">To get started using {{ stache.config.product_name_short }}, follow this step-by-step guide. After you complete this tutorial, you'll have your Blackbaud developer account, a subscription key, and you'll learn how to try our {{ stache.config.product_name_short }} console.</p>

  <ul class="slide-container">
<li class="slide">
<h2 class="tutorial">Step 1 &#8211; Set up your developer account</h2>
{{ include 'includes/getting-started/step1.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 2 &#8211; Get your subscription key</h2>
{{ include 'includes/getting-started/step2.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 3 &#8211; Activate the {{ stache.config.product_name_short }}  Console </h2>
{{ include 'includes/shared/nxt-web-api/getting-started/step3.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 4 &#8211; Explore the Endpoint Reference</h2>
{{ include 'includes/getting-started/step4.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 5 &#8211; Try it!</h2>
{{ include 'includes/getting-started/step5.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 6 &#8211; Next steps</h2>
{{ include 'includes/getting-started/step6.md' }}</li>

</ul>
{{ include stache.config.partial_disqus }}
