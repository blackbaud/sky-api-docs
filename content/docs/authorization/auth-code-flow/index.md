---
name: Authorization Code Flow
description: The Authorization Code Flow is appropriate for applications that the user logs into once. Since this flow involves an exchange of your **Application secret* for an access token, it is suitable for applications than run from secure locations such as server-side web application or back-end service.
layout: layout-tutorial
order: 100
published: true
showInNav: true
title: Authorization Code Flow
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

{{ include 'includes/authcodeflow/intro.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 1 &#8211; Request authorization</h2>

{{ include 'includes/authcodeflow/step1.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 2 &#8211; User authorizes your app</h2>

{{ include 'includes/authcodeflow/step2.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 3 &#8211; User is redirected back</h2>

{{ include 'includes/authcodeflow/step3.md' }}

</li>


<li class="slide">
<h2 class="tutorial">Step 4 &#8211; Request tokens</h2>

{{ include 'includes/authcodeflow/step4.md' }}

</li>


<li class="slide">
<h2 class="tutorial">Step 5 &#8211; Tokens returned</h2>

{{ include 'includes/authcodeflow/step5.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 6 &#8211; Call the {{ stache.config.api_type_name }}</h2>

{{ include 'includes/authcodeflow/step6.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 7 &#8211; Refresh access token</h2>

{{ include 'includes/authcodeflow/step7.md' }}

</li>

<li class="slide">
<h2 class="tutorial">Step 8 &#8211; Next Steps</h2>

{{# markdown }}
For more information on implementing the authorization code flow, check out our **[code samples]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_home }})**.
{{/ markdown }}
</li>

</ul></div></section>

{{ include stache.config.partial_disqus }}
