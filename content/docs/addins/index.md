---
layout: "layout-sidebar"
name: Add-ins
order: 250
published: true
showInNav: true
title: Add-ins
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

<bb-alert bb-alert-type="info"><strong>Note!</strong> This content is a preview of an upcoming capability that is limited to SKY Add-in beta participants. If you are interested in participating in the beta program, please <a href="mailto:skyapi@blackbaud.com?subject=SKY%20Add-ins%20-%20Request%20to%20participate%20in%20Add-ins%20beta%20program">contact us</a>.</bb-alert>

SKY Add-ins enable developers to build complementary features that integrate deeply within the user interface of Blackbaud solutions.  With add-ins, developers can use familiar web development technologies such as HTML, CSS, and JavaScript to augment selected areas of the product with new functionality.  Add-ins run in the browser, so they work well in both desktop and mobile scenarios.

Learn how to create SKY Add-ins with our quick starts, how-to guides, and reference documentation.

## Quick starts

Learn how to create your first add-in:

<div>
    <div style="text-align:center; display:inline-block; padding-right:25px">
        <a href="{{ stache.config.guide_addins }}get-started/createaddin">
            <img style="border: none" src="https://sky.blackbaudcdn.net/skyuxapps/host-assets/assets/nuget-package-thumbnail-v1.8114fffa845b0dba0fd2c04599e4e0e7cf5fe95a.png" />
            <div>Get started tutorial</div></a>
    </div>
    <div style="text-align:center; display:inline-block">
        <a href="{{ stache.config.guide_addins }}get-started/hello-world">
            <img style="border: none" src="https://sky.blackbaudcdn.net/skyuxapps/host-assets/assets/nuget-package-thumbnail-v1.8114fffa845b0dba0fd2c04599e4e0e7cf5fe95a.png" />
            <div>Hello world sample</div></a>
    </div>
</div>

## How-to guides
* <a href="{{ stache.config.guide_addins }}how-to-guides/addin-design/">Design the user interface of an add-in</a>
* <a href="{{ stache.config.guide_addins }}how-to-guides/addin-development/">Add-in development</a>
* <a href="http://www.example.com">Test and debug an add-in</a>
* <a href="http://www.example.com">Make your add-in available</a>

## Reference

* <a href="https://github.com/blackbaud/sky-addin-client" target="_new"><i class="fa fa-github" aria-hidden="true"></i> SKY Add-in Client JavaScript library</a>
* <a href="https://oauth2.sky.blackbaud.com/.well-known/openid-configuration" target="_new"><i class="fa fa-globe" aria-hidden="true"></i> SKY API OAuth 2.0 service OpenIDConnect configuration endpoint</a>
* <a href="https://www.nuget.org/packages/Blackbaud.Addin.TokenAuthentication" target="_new"><i class="fa fa-globe" aria-hidden="true"></i> Blackbaud.Addin.TokenAuthentication</a>