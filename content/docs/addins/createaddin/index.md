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

1. Developer account (getting started)
2. Register your apps (we recommend you create both a test and production apps)
3. Application activation
    - Activate your application in a testing tenant
4. Register the add-in
    - For testing purposes, we recommend you register your add-in in your test tenant first
5. Test the add-in
6. Once you feel like your add-in is ready, register your add-in in your production app.

If you are going to make API calls, you'll want to complete the getting started. If you also want to create an application that makes API calls, you 



Register the add-in
 
Now that my web application has been deployed, I can register it as part of my SKY API application by navigating to the SKY API developer portal and choosing “My applications” from the Developer Account menu to reach the applications page.  From the list shown, I’ll navigate into the application details by clicking on the application name, and from there I can choose the “Add” button from within the Add-ins tile to create a new add-in definition:

 
On this dialog, I just need to provide the URL for my web application and indicate the extension point - in this case, our tile represents an extension to the “Constituent Tile Dashboard”.  I can also provide a friendly Name for the add-in, just to help distinguish it from other add-ins I might create later.  The name itself is not currently presented to customers.
 
A few notes about the URL:
We do support local development, so if you’re able to serve the web site locally, you can provide a localhost:port value for the URL (for example:  https://localhost:4000).  To avoid mixed content problems in the browser, you’ll need to use https and have SSL configured locally. 
The URL must be a fully qualified URL, and can include static parameter values.
 
That all!  Once defined, the add-in will be shown for any customers who’ve enabled the SKY API application.
 

 View the add-in within Raiser’s Edge NXT
 
The add-in feature is available in RENXT in production today, but it requires a special query param for now until we’re closer to GA.  Within RENXT, you can add the following query parameter to tell the page to check for add-ins:
&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}
 
For example, you’d specify the query param on the constituent page like this: 
https://renxt.blackbaud.com/constituents/280?tenantid=YOURTENANTID&extendedFeatureConfiguration={"new_features":{"uiextensions":true}}
 
When the page loads, our custom tile will appear (likely at the bottom of the page):
