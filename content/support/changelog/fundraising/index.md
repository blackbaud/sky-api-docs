---
layout: layout-sidebar
name: Fundraising (Beta)
description: Information on additions and changes for the Fundraising API (Beta).
order: 125
published: true
showInNav: true
icon: fa fa-line-chart
back_to_top: true
title: Fundraising (Beta) Changelog
---

# {{ name }}

Monitor this page to keep up with the [Fundraising API (Beta)]({{ stache.config.portal_endpoints_fundraising }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2018-02-05

### Changed

We added the `type` property to the [fund]({{ stache.config.fundraising_entity_reference }}#Fund) entity.

## 2018-01-29

### New

Added the following endpoint:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Operation</th>
        <th>Method</th>
        <th>Route</th>
      </tr>
    </thead>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fundraising_attachment_tags_get }}">
        <td>Attachment tags</td>
        <td>GET</td>
        <td>/attachmenttags</td>
      </tr>
    </tbody>
  </table>
</div>

### Changed

- We added the `date` property to the [attachment]({{ stache.config.fundraising_entity_reference }}#Attachment) entity.
- We added the `category` property to the [campaign]({{stache.config.fundraising_entity_reference}}#Campaign), [fund]({{stache.config.fundraising_entity_reference}}#Fund), and [appeal]({{stache.config.fundraising_entity_reference}}#Appeal) entities.

## 2017

### 2017-12-15

#### New

Added the following endpoints:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Operation</th>
        <th>Method</th>
        <th>Route</th>
      </tr>
    </thead>
    <tbody>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_goal_categories_get }}">
        <td>Goal categories</td>
        <td>GET</td>
        <td>/fundraising/goalcategories</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_package_get }}">
        <td>Package</td>
        <td>GET</td>
        <td>/packages/{package_id}</td>
      </tr>
    </tbody>
  </table>
</div>

### 2017-08-28

#### New

Added the following endpoints:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Operation</th>
        <th>Method</th>
        <th>Route</th>
      </tr>
    </thead>
    <tbody>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_appeal_attachments_get_list }}">
        <td>Appeal attachment list (Single appeal)</td>
        <td>GET</td>
        <td>/appeals/{appeal_id}/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_appeal_attachments_create }}">
        <td>Appeal attachment (Create)</td>
        <td>POST</td>
        <td>/appeals/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_appeal_attachments_edit }}">
        <td>Appeal attachment (Edit)</td>
        <td>PATCH</td>
        <td>/appeals/attachments/{attachment_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_appeal_attachments_delete }}">
        <td>Appeal attachment (Delete)</td>
        <td>DELETE</td>
        <td>/appeals/attachments/{attachment_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_campaign_attachments_get_list }}">
        <td>Campaign attachment list (Single campaign)</td>
        <td>GET</td>
        <td>/campaigns/{campaign_id}/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_campaign_attachments_create }}">
        <td>Campaign attachment (Create)</td>
        <td>POST</td>
        <td>/campaigns/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_campaign_attachments_edit }}">
        <td>Campaign attachment (Edit)</td>
        <td>PATCH</td>
        <td>/campaigns/attachments/{attachment_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_campaign_attachments_delete }}">
        <td>Campaign attachment (Delete)</td>
        <td>DELETE</td>
        <td>/campaigns/attachments/{attachment_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fund_attachments_get_list }}">
        <td>Fund attachment list (Single fund)</td>
        <td>GET</td>
        <td>/funds/{fund_id}/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fund_attachments_create }}">
        <td>Fund attachment (Create)</td>
        <td>POST</td>
        <td>/funds/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fund_attachments_edit }}">
        <td>Fund attachment (Edit)</td>
        <td>PATCH</td>
        <td>/funds/attachments/{attachment_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fund_attachments_delete }}">
        <td>Fund attachment (Delete)</td>
        <td>DELETE</td>
        <td>/funds/attachments/{attachment_id}</td>
      </tr>
    </tbody>
  </table>
</div>

### 2017-05-09

#### Changed

The [Appeal list]({{ stache.config.portal_endpoints_appeals_get_list }}), [Campaign list]({{ stache.config.portal_endpoints_campaigns_get_list }}), and [Fund list]({{ stache.config.portal_endpoints_funds_get_list }}) endpoints now exclude inactive records by default. To include inactive records, set the `include_inactive` parameter to `true`.

### 2017-04-28

#### Announcement: Breaking Changes Planned for [Fundraising API (Beta)]({{ stache.config.portal_endpoints_fundraising }})

We will update the default value of the `include_inactive` filter to `false` on the [Appeal list]({{ stache.config.portal_endpoints_appeals_get_list }}), [Campaign list]({{ stache.config.portal_endpoints_campaigns_get_list }}), and [Fund list]({{ stache.config.portal_endpoints_funds_get_list }}) endpoints to exclude inactive records by default. Currently, the filter defaults to `true` and includes inactive records when no value is supplied.

### 2017-04-06

#### New

Added the following endpoints:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Operation</th>
        <th>Method</th>
        <th>Route</th>
      </tr>
    </thead>
    <tbody>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_appeals_get_list }}">
        <td>Appeal list</td>
        <td>GET</td>
        <td>/appeals</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_campaigns_get_list }}">
        <td>Campaign list</td>
        <td>GET</td>
        <td>/campaigns</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_funds_get_list }}">
        <td>Fund list</td>
        <td>GET</td>
        <td>/funds</td>
      </tr>
    </tbody>
  </table>
</div>

### 2017-03-08

#### New

The Fundraising API has been released for a public beta. This API handles information related to the fundraising hierarchy, including the campaign, fund, and appeal entities:
 - Campaigns set the overall objectives and initiatives for raising money, and they are typically the top tier of the fundraising hierarchy. For example, organizations can create campaigns to encompass fundraising efforts related to annual operating expenses, new buildings, or endowments.
 - Funds represent the donor's intent for how to use or earmark a gift. For example, the gift can be intended for a specific cause or financial purpose. Funds are often linked to financial suites and indicate where to allocate a gift.
 -  Appeals are the sources and solicitations that bring in gifts, and they are typically the most granular piece of the fundraising hierarchy. Examples of appeals include direct mailings, online donation pages, phonathons, auctions, and events.

The initial release contains endpoints to retrieve these entities by ID and to manage custom fields. For more information, check out the [entity]({{ stache.config.fundraising_entity_reference }}) and [endpoint]({{ stache.config.portal_endpoints_fundraising }}) references.
