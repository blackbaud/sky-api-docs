---
layout: layout-sidebar
name: Add-in development
order: 20
published: true
showInNav: true
title: Add-in development
---
{{ include stache.config.partial_header_edit }}

# Add-in development

### Use a non-production SKY API application for development

As mentioned in the <a href="/docs/addins/get-started/createaddin#register-your-add-in">Register your add-in</a> documentation, all SKY Add-ins are associated with your registered application.

This means that whenever you register your add-in metadata, any customers who've already enabled your application (or who do so in the future) will immedately see your add-in(s).

For this reason, we recommend making use of a separate, non-production SKY API application while testing your add-in behavior.  Once you are happy with the results, you can register your add-in with your production SKY API application.

This technique can be used to introduce *new* add-ins in the future as well.  For example, if Blackbaud adds support for new extension points in the future, you can develop against those new extension points using your non-production application, and then when ready you can update your existing, production SKY API application with your additional add-in metadata.

### Control your add-in's visibility

Remember that add-ins are instantiated as hidden iframes on the page and are only made visible when your code informs the host page.  You can use this to your advantage when building and testing by introducing logic that is only visible based on some contextually available value.  For example, you can limit visibility to your environment only, or you can whitelist user IDs (by correlating from the current Blackbaud user ID).