---
layout: layout-tutorial
name: Create an App
description: Learn how to successfully create an application with SKY API.
order: 200
published: true     
showInNav: true
back_to_top: true
title: Create an Application Tutorial
sidebarLayoutSecondaryColumn: col-md-2 col-sm-12 sidebar-tutorial
sidebarLayoutPrimaryColumn: col-md-8 col-sm-12
bootstrap_container: bg-tutorial
markdown: false
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

<section class="section-padding bg-tutorial">
  <div class="text-center">
    <h1 class="tutorial"> {{ name }} with {{ stache.config.product_name_short }}</h1>
    <p class="lead tutorial">To successfully create an application with {{ stache.config.product_name_short }}, follow this step-by-step guide.</p>
    <p class="lead tutorial">Before you begin, be sure to complete the <a href="{{ stache.config.guide_getting_started }}">Getting Started</a> guide, where you'll get your  Blackbaud developer account, a subscription key, and learn how to explore the <a href="{{ stache.config.portal_endpoints }}" target="_blank">Endpoint Reference</a>.</p>

    <ul class="slide-container">
      <li class="slide">
        <h2 class="tutorial">Step 1 &#8211; Register your app</h2>
        {{ include 'includes/createapp/registerapp.md' }}
      </li>
  
      <li class="slide">
        <h2 class="tutorial">Step 2 &#8211; Review the app credentials</h2>
        {{ include 'includes/createapp/credentials.md' }}
      </li>
  
      <li class="slide">

        <h2 class="tutorial">Step 3 &#8211; Activate your app</h2>

        {{ include 'includes/createapp/activateapp.md' }}
      </li>

      <li class="slide">
        <h2 class="tutorial">Step 4 &#8211; Request authorization</h2>
        {{ include 'includes/createapp/requestauth.md' }}
      </li>

      <li class="slide">
        <h2 class="tutorial">Step 5 &#8211; Next steps</h2>
        {{ include 'includes/createapp/done.md' }}
      </li>
    </ul>

    <h3 class="tutorial">Now that you've built and tested your application, here are a few things you should know.</h3>
    <br />
    <div class="row">
      <div class="col-sm-4 tutorial-button">
        <a href="{{ stache.config.skyux }}" target="_blank" class="btn-fa-link">
          <span class="fa-stack fa-4x">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-code fa-stack-1x text-primary"></i>
          </span> 
        </a> 
        <h3>SKY UX</h3>
        <p>SKY UX is Blackbaud’s next-generation user-experience framework. You can use it to bring the same consistent experience as Blackbaud products to your customizations and applications.</p>
      </div>  
      <div class="col-sm-4 tutorial-button">
        <a href="{{ stache.config.support_community }}" target="_blank" class="btn-fa-link">
          <span class="fa-stack fa-4x">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-users fa-stack-1x text-primary"></i>
          </span> 
        </a> 
        <h3>Blackbaud Developer Community</h3>
        <p>Participate and learn from other developers on how they are using the {{ stache.config.product_name_short }}.</p>
      </div>          
      <div class="col-sm-4 tutorial-button">
        <a href="{{ stache.config.partner_program}}" target="_blank" class="btn-fa-link">
          <span class="fa-stack fa-4x">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-cloud fa-stack-1x text-primary"></i>
          </span>  
        </a> 
        <h3>Blackbaud Partner Network</h3>
        <p>Learn how to be a part of our Blackbaud Partner Network.</p>
      </div>          
    </div>  
  </div>
</section>

{{ include stache.config.partial_disqus }}