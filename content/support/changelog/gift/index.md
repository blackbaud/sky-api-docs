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

## 2017-03-20

### Changed

We added the `post_date` property to the [gift]({{ stache.config.gift_entity_reference }}#Gift) entity.

##2017-03-08

### New

The Gift API has been released for a public beta. This API handles information related to gifts, including related entities such as gift splits, gift fundraisers, and soft credits.

The initial release contains endpoints to retrieve a list of all gifts, to retrieve gifts by their IDs, and to manage attachments. For more information, check out the [entity]({{ stache.config.gift_entity_reference }}) and [endpoint]({{ stache.config.portal_endpoints_gift }}) references.
