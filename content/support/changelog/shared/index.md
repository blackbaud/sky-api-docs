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
## 2016-12-02

### New
We added a new <b>Status</b> link to the Support menu. This link takes you to our {{ stache.config.product_name_short }} status page. The status page provides the current state of API availability, as well as specific details on downtime incidents. We also provide the option for you to subscribe to automatic incident notifications by email, SMS, or feed.

## October 2016

### 2016-10-17

Logos can now be associated with your applications. The logo is the icon that users will see on the consent form when they give an application authorization to use their product's account to access the API. Logos can be added to new and existing applications through the  [My Applications]({{ stache.config.developer_app_management_url }}) page. Application logo images must be:
- 512 by 512 pixels
- Smaller than 2MB
- PNG or JPEG format 



## September 2016

### 2016-09-22
SKY API's support for <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a> now includes <code>accept</code> and <code>content-type</code> in the list of accepted request headers. You can now specify these headers in API requests from within a browser.

## July 2016

### 2016-07-08

To support approved API subscribers with access to their own dedicated tenants, we've added instructions for <a href="{{ stache.config.guide_basics }}#activating-the-sky-api-console" target="_blank" rel="noopener noreferrer">activating the {{ stache.config.dev_console_name }}</a>
to our Basics guide.

## June 2016

### 2016-06-27

- When requesting an access token, you may now supply your application ID and secret as part of the request body as <code>client_id</code> and <code>client_secret</code> parameters, respectively. This is an alternative to using the <code>Authorization</code> header.  See [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}).

- Created a [C# Auth Code Flow code sample]({{ stache.config.github_repo_web_api_authorization_c_sharp }}) and [tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_c_sharp }}).

### 2016-06-09

### New

- We've added the OAuth2 [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}) for use in web browser and mobile apps where application secret confidentiality is not guaranteed.

- A new feature allows you to export API definitions in Swagger and WADL formats from within the [{{ stache.config.dev_console_name }}]({{ stache.config.portal_endpoints_constituent }}). Use these files to generate client-side code by using tools such as [Swagger Codegen](http://swagger.io/swagger-codegen/). You can import these files into API client tools such as [Postman](https://www.getpostman.com/) and start calling the API in very little time.

	![Export API Definitions](/assets/img/api_definition_export.png "Export API Definitions")


## May 2016

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

## April 2016


### 2016-04-26

[Pagination]({{ stache.config.guide_basics }}#pagination) will be facilitated through the results via the use of `limit` and `offset` instead of `top` and `skip` parameters.  Pagination behavior will remain unchanged.

## March 2016

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

## Older

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
