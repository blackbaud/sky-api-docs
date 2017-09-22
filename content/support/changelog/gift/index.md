---
layout: layout-sidebar
name: Gift (Beta)
description: Information on additions and changes for the Gift API (Beta).
order: 100
published: true
showInNav: true
icon: fa fa-gift
back_to_top: true
title: Gift (Beta) Changelog
---

# {{ name }}

Monitor this page to keep up with the [Gift API (Beta)]({{ stache.config.portal_endpoints_gift }}) latest changes and {{ stache.config.api_type_name }} service releases.

##2017-09-022

### Changed

We added the `acknowledgements`, `receipts`, and `balance` properties to the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity.

##2017-09-07

#### New

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
    <tbody>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_all_gift_custom_field_get_list }}">
        <td>Gift custom field list (All gifts)</td>
        <td>GET</td>
        <td>/gifts/customfields</td>
      </tr>
    </tbody>
  </table>
</div>

### Changed

The `date` property on the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity no longer returns an offset. Instead, it now uses <a href="https://tools.ietf.org/html/rfc3339">ISO-8601 format: </a><span class="code">2015-09-18T00:00:00</span>.

## 2017-08-30

### Announcement: Breaking Changes Planned for [Gift API]({{ stache.config.portal_endpoints_gift }})

We will update the `date` property on the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity to no longer return an offset. Instead, it will use <a href="https://tools.ietf.org/html/rfc3339">ISO-8601 format: </a><span class="code">2015-09-18T00:00:00</span>.

## 2017-08-08

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
    <tbody>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gift_subtypes_get_list }}">
        <td>Gift subtypes (Get)</td>
        <td>GET</td>
        <td>/giftsubtypes</td>
      </tr>
    </tbody>
  </table>
</div>

### Changed

We added the `payments` property to the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity.

## 2017-08-04

### Changed

We updated the `next_link` property on the [Gift list endpoint]({{stache.config.portal_endpoints_gift_get_list}}) to be more consistent with other lists.

## 2017-06-23

### Changed

We added the `gift_aid_amount` and `gift_aid_qualification_status` properties to the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity for UK tenants.

## April 2017

### 2017-04-25

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gift_custom_fields_create }}">
        <td>Gift custom field (Create)</td>
        <td>POST</td>
        <td>/gifts/customfields</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gift_custom_fields_edit }}">
        <td>Gift custom field (Edit)</td>
        <td>PATCH</td>
        <td>/gifts/customfields/{custom_field_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gift_custom_fields_categories_get_list }}">
        <td>Gift custom field categories (Get)</td>
        <td>GET</td>
        <td>/gifts/customfields/categories</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_gift_custom_fields_category_values_get_list }}">
        <td>Gift custom field category values (Get)</td>
        <td>GET</td>
        <td>/gifts/customfields/values</td>
      </tr>
    </tbody>
  </table>
</div>

## March 2017

### 2017-03-20

#### Changed

We added the `post_date` property to the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity.

### 2017-03-08

#### New

The Gift API has been released for a public beta. This API handles information related to gifts, including related entities such as gift splits, gift fundraisers, and soft credits.

The initial release contains endpoints to retrieve a list of all gifts, to retrieve gifts by their IDs, and to manage attachments. For more information, check out the [entity]({{ stache.config.gift_entity_reference }}) and [endpoint]({{ stache.config.portal_endpoints_gift }}) references.
