---
layout: layout-sidebar
name: Issues
description: Information on additions, removals, and bug fixes of the API.
order: 150
published: true
showInNav: true
icon: fa fa-file-text-o
back_to_top: true
title: Issues
---

# Issues
If you find an issue, please [contact us]({{ stache.config.support_need_help_url }}).

## 2017-04-12
We are aware of an issue that is affecting a subset of Raiser's Edge NXT customers, that is causing excessive latency for the **List** endpoints within the Constituent and Gift APIs.  We are actively working to resolve the issue, and will post an update as soon as it is available.

## 2017-04-06
We are aware of an issue with the new [Appeal list]({{stache.config.portal_endpoints_appeals_get_list}}), [Campaign list]({{stache.config.portal_endpoints_campaigns_get_list}}), and [Fund list]({{stache.config.portal_endpoints_funds_get_list}}) endpoints possibly returning unexpected results with the `last_modified` parameter due to time zone inconsistencies. We are working to resolve this issue, and will provide an update when it is resolved.

To mitigate this problem, we recommend providing a buffer around your desired `last_modified` parameter if inconsistencies arise and also saving and reusing the returned `next_link` and `sort_token` when performing data sync functions to ensure that no record updates are missed.


## 2017-02-17
### Resolved
For the issue reported earlier today about the Applications page, the functionality has been restored. 

## 2017-02-17
We are aware of an issue on the Control Panel, Applications page in SKY API enabled Blackbaud products. The Applications page does not load. Previous applications you authorized do not appear. While they have not been deleted, during this time you may get an error message that your application doesn’t have access to any SKY API enabled Blackbaud products. API calls, however, are not impacted. 

We are working to resolve this issue as soon as possible, and will provide an update when functionality has been restored. 


## 2016-11-14
### Resolved
For the issue reported on 2016-10-20, the behavior of the attributes has been addressed so that they no longer fail to populate on returned address entities.

## 2016-10-21
### Service Resolved
For the issue reported earlier on 2016-10-21, the availability of the API has been restored.

We are aware of an issue that is currently disrupting the availability of the API. The disruption is related to a massive East Coast outage caused by a denial of service attack that is severely degrading Internet services. We are working with one of our DNS providers to restore service and will post another update when we have more information. 

## 2016-10-20
We are aware of an issue with the new [Address (List)]({{ stache.config.portal_endpoints_address_get_list }}) where the `formatted_address` and `inactive` attributes are not populated on the returned address entities. We are addressing this issue and will post an update when we fix it.

## 2016-10-17
### Service Resolved
For the intermittent issue reported on 2016-10-15, service has been restored as of Monday, October 17th, 2016 at 9:30 AM EDT (1:30 PM UTC).

## 2016-10-15
We are aware of an intermittent issue affecting a subset of Raiser's Edge NXT tenants, whereby Constituent API requests result in exceedingly long response times or timeouts.  We are researching the issue and will post another update soon when we have more information.

## 2016-08-01

### Resolved: Firefox Hangs on Authorization

The issue has been resolved as of Monday, August 1st, 2016 at 3:20 PM EDT (7:20 PM UTC).

## 2016-07-29

### Firefox Hangs on Authorization

Firefox hangs when loading the {{ stache.config.api_type_name }} OAuth 2.0 Authorization endpoint <code class="language-http">{{ stache.config.authorization_endpoint }}</code>.
We are currently researching the issue. Stay tuned for details.

## 2016-04-22

### {{ stache.config.dev_console_name }} autofill bug

On specific {{ stache.config.dev_console_name }} pages that display an operation which contains either a query parameter or header data entry field before the **{{ stache.config.subscription_keyname }}** control, Chrome mistakenly treats the **{{ stache.config.subscription_keyname }}** control as a password. As a result Chrome treats the page as a login page. If the developer elects to save their a user name and password when prompted, Chrome incorrectly auto-fills the page the next time the page loads :

![Chrome autofill issue][issue_autofill]

#### Workaround steps

- Open **Settings** in Chrome
- Click the **Show advanced settings** link at the bottom of the **Settings** page.
- Within the **Passwords and forms** section, click **Manage passwords**.
- Delete any mistakenly saved passwords for developer.sky.blackbaud.com.

## 2016-04-04

### Resolved: My Applications page not displaying within Microsoft Edge browsers

The issue has been resolved as of Monday, April 4, 2016 at 8:00 AM EDT (Monday, April 4, 2016 at 12:00 PM UTC).

## 2016-03-15

### My Applications page not displaying within Microsoft Edge browsers

We have noticed an issue with the [My Applications]({{ stache.config.developer_app_management_url }}) page not displaying within Microsoft Edge browsers.  We are currently researching the issue.  Stay tuned for details. In the meantime, we recommend using other browsers for [managing your applications]({{ stache.config.guide_registering_your_app }}).

[issue_autofill]: /assets/img/issue_autofill_4_22_2016.jpg
