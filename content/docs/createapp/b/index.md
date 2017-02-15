---
layout: layout-sidebar
name: Create an Application
description: Learn how to successfully create an application with SKY API.
order: 600
published: true     
showInNav: false
back_to_top: true
title: Create an Application Tutorial
---
<h1> {{ name }} with {{ stache.config.product_name_short }}</h1>

<p>To successfully create an application with {{ stache.config.product_name_short }}, follow this step-by-step guide.</p>
<p>Before you begin, be sure to complete the <a href="{{ stache.config.guide_getting_started }}">Getting Started</a> guide, where you'll get your  Blackbaud developer account, a subscription key, and learn how to explore the <a href="{{ stache.config.portal_endpoints }}" target="_blank">Endpoint Reference</a>.</p>


<h2>Register your application</h2>
{{ include 'includes/tutorials/createappalt/registerapp.md' }}

<h2>Review your application credentials</h2>
{{ include 'includes/tutorials/createappalt/credentials.md' }}

<h2>Activate your application in a tenant</h2>
{{ include 'includes/tutorials/createappalt/activateapp.md' }}

 <h2>Request authorization</h2>
{{ include 'includes/tutorials/createappalt/requestauth.md' }}

 <h2>... and you're done!</h2>
{{ include 'includes/tutorials/createappalt/done.md' }}

<h2>Next steps</h2>
<p>Now that you've built and tested your application, here are a few things you should know.</p>
<ul>
<li><p><a href="{{ stache.config.skyux }}">SKY UX</a> is Blackbaud’s next-generation user-experience framework. You can use it to bring the same consistent experience as Blackbaud products to your customizations and applications.</p></li>
 
<li><p>Participate and learn from other developers on how they are using the {{ stache.config.product_name_short }} in the <a href="{{ stache.config.support_community }}" >Blackbaud Developer Community</a>.</p></li>
          
          <li><p>Learn how to be a part of our <a href="{{ stache.config.partner_program}}">Blackbaud Partner Network</a>.</p></li>
</ul>
