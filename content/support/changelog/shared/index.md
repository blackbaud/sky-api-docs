---
layout: layout-sidebar
name: Shared
description: Common changes shared across all our APIs.
order: 50
published: true
showInNav: true
icon: fa fa-cloud
back_to_top: true
title: Shared Changelog
---

# {{ name }}

Monitor this page to keep up with common changes shared across all our APIs.

## August 2018

###2018-08-03 Removed Disqus

In an effort to simplify the channels of communication regarding SKY API, we've decided to remove the Disqus feature from the SKY API developer portal, and will instead provide a link to the <a href="https://community.blackbaud.com/forums/viewcategory/425">SKY API Community</a>.  This will allow us to have a more organized and structured medium for detailed responses/threads, and will ultimately enable broader participation and quicker responses to questions!

We will ensure that any outstanding Disqus threads are resolved - going forward, please direct any questions/comments to the <a href="https://community.blackbaud.com/forums/viewcategory/425">SKY API Community</a>.

![Comments](/assets/img/comments.png "Comments")

## May 2017

###2017-05-31

#### Changed

We moved the [Status page link]({{ stache.config.support_status }}) from the Support menu to the top navigation. This makes it even quicker for you to see the current state of API availability. 

If you haven't signed up yet, we encourage you to subscribe to automatic incident notifications. You can subscribe by email, SMS or RSS feed.

### 2017-05-04

#### New

We added a new step-by-step guide to help you learn the steps required to **[Create an App with {{ stache.config.product_name_short }}]({{ stache.config.guide_create_app }})**. We recommend you complete this guide after you follow the **[Getting Started]({{ stache.config.guide_getting_started}})** documentation.


## March 2017

### 2017-3-10

#### New
In response to a request from the [Blackbaud Community]({{ stache.config.support_community }}), we are pleased to announce a new [PHP code sample]({{ stache.config.github_repo_web_api_authorization_php }}) and accompanying [PHP tutorial]({{stache.config.guide_web_api_authorization_auth_code_flow_tutorial_php}}).  These two new resources demonstrate the [Blackbaud Auth Code Flow]({{stache.config.guide_web_api_authorization_auth_code_flow}}) using PHP.

### 2017-3-03

#### New
The SKY API developer site now offers commenting capability through Disqus. We encourage community involvement to improve our documentation. We will monitor comments just like we monitor feedback in our GitHub repository, and we will incorporate feedback to make our docs better. See something that is unclear? Want more detail? Leave a comment and let us know!
 
On the SKY API developer site, comments now appear at the bottom of most documentation pages, and buttons are available at the top of pages to take users to the comments.

## 2016

### 2016-12-02

We added a new <b>Status</b> link to the Support menu. This link takes you to our {{ stache.config.product_name_short }} status page. The status page provides the current state of API availability, as well as specific details on downtime incidents. We also provide the option for you to subscribe to automatic incident notifications by email, SMS, or feed.

### 2016-10-17

Logos can now be associated with your applications. The logo is the icon that users will see on the consent form when they give an application authorization to use their product's account to access the API. Logos can be added to new and existing applications through the  [My Applications]({{ stache.config.developer_app_management_url }}) page. Application logo images must be:
- 512 by 512 pixels
- Smaller than 2MB
- PNG or JPEG format 

### 2016-09-22
SKY API's support for <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a> now includes <code>accept</code> and <code>content-type</code> in the list of accepted request headers. You can now specify these headers in API requests from within a browser.

### 2016-07-08

To support approved API subscribers with access to their own dedicated tenants, we've added instructions for <a href="{{ stache.config.guide_basics }}#activating-the-sky-api-console" target="_blank" rel="noopener noreferrer">activating the {{ stache.config.dev_console_name }}</a>
to our Basics guide.

### 2016-06-27

- When requesting an access token, you may now supply your application ID and secret as part of the request body as <code>client_id</code> and <code>client_secret</code> parameters, respectively. This is an alternative to using the <code>Authorization</code> header.  See [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}).

- Created a [C# Auth Code Flow code sample]({{ stache.config.github_repo_web_api_authorization_c_sharp }}) and [tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_c_sharp }}).

### 2016-06-09

### New

- We've added the OAuth2 [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}) for use in web browser and mobile apps where application secret confidentiality is not guaranteed.

- A new feature allows you to export API definitions in Swagger and WADL formats from within the [{{ stache.config.dev_console_name }}]({{ stache.config.portal_endpoints_constituent }}). Use these files to generate client-side code by using tools such as [Swagger Codegen](http://swagger.io/swagger-codegen/). You can import these files into API client tools such as [Postman](https://www.getpostman.com/) and start calling the API in very little time.

	![Export API Definitions](/assets/img/api_definition_export.png "Export API Definitions")


### 2016-05-27

### Changed

When [registering your application]({{ stache.config.guide_registering_your_app }}), we've relaxed the `https` requirement for whitelisted redirect URIs.  To facilitate and shorten the development process, we now accept `http://localhost:*` (or, `http://127.0.0.1:*`) whitelisted web addresses to redirect to after users grant or deny permission for your app. You will no longer need to install a self-signed SSL certificate on your local machine when building your applications.

### 2016-05-13

### New

A `next_link` property has been added to our [paginated]({{ stache.config.guide_basics }}#pagination) collection responses and represents the URI for the next page of results.  This property takes into account any relevant pagination parameters, such as `limit`, `offset`, or `last_modified`, and `date_added` provided on the request.

### 2016-05-06

### Changed

- `limit` and `offset` have replaced `top` and `skip` parameters for [Pagination]({{ stache.config.guide_basics }}#pagination).  Pagination behavior will remain unchanged.

- When editing, existing endpoints that previously used the `PUT` HTTP verb have been replaced with `PATCH`.  `PATCH` can be used to update partial resources. For instance, when you only need to update one field of the resource.


### 2016-04-26

[Pagination]({{ stache.config.guide_basics }}#pagination) will be facilitated through the results via the use of `limit` and `offset` instead of `top` and `skip` parameters.  Pagination behavior will remain unchanged.

### 2016-03-15

Updates to [code samples]({{ stache.config.guide_code }}) including **Authorization Code Flow Tutorial** and **Barkbaud**:

- [Authorization Code Flow Tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }})
    - Environment variables automatically load when the application starts. [Tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}) instructions have been simplified accordingly.
    - Using AngularJS for display of **Log in** button, **Log out** button and constituent data.
    - OAuth and Constituent API routes have been updated to reflect recent <a href="#2016-03-10" class="smooth-scroll">changes</a> to our [base URLs]({{ stache.config.guide_basics }}#base-urls).

- [Barkbaud](https://github.com/blackbaud/barkbaud)
    - Environment variables automatically load when the application starts.  [README](https://github.com/blackbaud/barkbaud/blob/master/README.md) instructions have been simplified accordingly.
    - Biographies, owner and medical history for each animal are now stored in a MongoDB database at [mLab](https://www.mlab.com/) instead of Parse. The [Parse database service will be retired](http://blog.parse.com/announcements/moving-on/) on January 28, 2017.
    - OAuth and Constituent API routes have been updated to reflect recent <a href="#2016-03-10" class="smooth-scroll">changes</a> to our [base URLs]({{ stache.config.guide_basics }}#base-urls).

### 2016-03-11

Usage limits are now in effect.  Exceeding the [rate limit]({{ stache.config.guide_basics }}#rate-limits) results in a `429 - Too Many Requests` response status code.  Exceeding the [quota]({{ stache.config.guide_basics }}#quotas) results in a `403 - Quota Exceeded` response status code.

### 2016-03-10

### Changed

- OAuth and Constituent API URLs changed.  See [Base URLs]({{ stache.config.guide_basics }}#base-urls).

- The route for the `authorization` endpoint is no longer prefixed with `renxt`.
	<div class="table-responsive">
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Operation</th>
					<th>Method</th>
					<th>Old Route</th>
					<th>New Route</th>
				</tr>
			</thead>
			<tbody>
				<tr class="clickable-row" data-url="{{ stache.config.guide_web_api_authorization }}">
					<td>authorization (Get)</td>
					<td>GET</td>
					<td>/renxt/authorization</td>
					<td>/authorization</td>
				</tr>
			</tbody>
		</table>
	</div>

## 2015

### 2015-12-8

### New

- The [My Applications]({{ stache.config.developer_app_management_url }}) page now includes the ability to edit applications. Once registered, your application will automatically have access to the {{ stache.config.sandbox_name }} tenant.

- The [Auth Code Flow Tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}) demonstrates how to create a small server-side application that negotiates authorization and access constituent data.

- [Code Samples]({{ stache.config.guide_code }}) include Barkbaud which was introduced at bbcon 2015.  Also included is the source code for the [Auth Code Flow Tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}).

### General Enhancements

- Enhanced [FAQ]({{ stache.config.support_faq }}), including new questions and references to new [Auth Code Flow Tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}) and [application management]({{ stache.config.guide_registering_your_app }}).

### 2015-11-20

### New

The [My Applications]({{ stache.config.developer_app_management_url }}) page and associated [documentation]({{ stache.config.guide_registering_your_app }}) provide self-service application registration for the purpose of accessing data via {{ stache.config.api_type_name }}.

### 2015-10-20

### Changed

- Improved handling of enumerations within the API. Enumeration values are now emitted using string representations instead of numeric representations.   For example, [Constituent]({{ stache.config.portal_contracts }}#Constituent).Type now returns **individual** or **organization**.

- Improved handling of default values within the {{ stache.config.api_type_name }}.  Previously, default values were not included in the JSON response. Values are now included in the payload.

- Enhanced sample response representations in the developer portal to account for enumeration and default value handling.

- Added a Support menu to the developer portal, with links to the Changelog, [Issues]({{ stache.config.support_issues }}), [Ideas]({{ stache.config.support_ideas }}), and [FAQ]({{ stache.config.support_faq }}).
