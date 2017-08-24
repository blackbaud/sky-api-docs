---
layout: layout-sidebar
name: Constituent
description: Information on additions and changes for the Constituent API.
order: 100
published: true
showInNav: true
icon: fa fa-user
back_to_top: true
title: Constituent Changelog
---

# {{ name }}

Monitor this page to keep up with the [Constituent API]({{ stache.config.portal_endpoints_constituent }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2017-08-24

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_locations_get }}">
        <td>Action locations (List)</td>
        <td>GET</td>
        <td>/actionlocations</td>
      </tr>
    </tbody>
  </table>
</div>

### Changed

 - On the [Action (Create)]({{stache.config.portal_endpoints_constituent_action_add}}) endpoint, we updated the `gender` property to set the default value to *unknown* when the property is not supplied in the request body.
 - We added the `start_time`, `end_time`, `location`, `priority`, `direction`, and `outcome` properties to the [action]({{ stache.config.portal_contracts }}#Action) entity.
 - The `completed_date` property on the [action]({{ stache.config.portal_contracts }}#Action) entity is now writable on our [POST]({{ stache.config.portal_endpoints_constituent_action_add }}) and [PATCH]({{ stache.config.portal_endpoints_constituent_action_update }}) endpoints.

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_relationship_edit }}">
        <td>Relationship (Edit)</td>
        <td>PATCH</td>
        <td>/relationships/{relationship_id}</td>
      </tr>
    </tbody>
  </table>
</div>

## 2017-06-28

### Changed

We added the `start`, `end`, `seasonal_start`, and `seasonal_end` properties to the [address]({{ stache.config.portal_contracts }}#Address) entity.

## 2017-06-27

### Changed

We updated the concept of inactive addresses to be consistent across address endpoints and better aligned with the web interface. Now, addresses are only marked inactive if their `end_date` is in the past.

## 2017-05-17

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_get_list }}">
        <td>Action list (All constituents)</td>
        <td>GET</td>
        <td>/actions</td>
      </tr>
    </tbody>
  </table>
</div>

## 2017-05-12

### Changed

We added the `comment` property to the [relationship]({{ stache.config.portal_contracts }}#Relationship) entity.

## 2017-05-09

### Changed

 - The [Communication preference (Edit)]({{ stache.config.portal_endpoints_constituent_communication_preferences_edit }}) endpoint now supports patching the `start` and `end` fields on a communication preference.

 - The [Action (Get)]({{ stache.config.portal_endpoints_constituent_action_get }}) and [Action List (Single constituent)]({{ stache.config.portal_endpoints_constituent_action_get_list }}) endpoints now return the `date_added` and `date_modified` properties on the [action]({{ stache.config.portal_contracts }}#Action) entity.

## 2017-04-25

### New

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_relationship_create }}">
        <td>Relationship</td>
        <td>POST</td>
        <td>/constituent/constituents/relationships</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_relationship_type_get_list }}">
        <td>Relationship types</td>
        <td>GET</td>
        <td>/constituent/constituents/relationshiptypes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_organization_contact_type_get_list }}">
        <td>Organization contact types</td>
        <td>GET</td>
        <td>/constituent/constituents/organizationcontacttypes</td>
      </tr>
    </tbody>
  </table>
</div>

### Changed

GET operations such as [Relationship list (Single constituent)]({{ stache.config.portal_endpoints_constituent_relationship_get_list }}) that return [relationship]({{ stache.config.portal_contracts }}#Relationship) entities now return the following new properties:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td>reciprocal_type</td>
          <td>string</td>
          <td>The reciprocal relationship type. Describes the constituent's relationship to the related constituent. For example, in a relationship between a male constituent and a female sibling, the reciprocal relationship type would be brother. Available values are the entries in the <b>Relationships</b> table.</td>
      </tr>
      <tr>
          <td>is_spouse</td>
          <td>boolean</td>
          <td>Indicates whether the related constituent is the constituent's spouse. Only applies to relationships between individuals.</td>
      </tr>
      <tr>
          <td>is_organization_contact</td>
          <td>boolean</td>
          <td>Indicates whether the related individual represents the organization as a contact. Only applies to relationships between organizations and individuals.</td>
      </tr>
      <tr>
          <td>is_primary_business</td>
          <td>boolean</td>
          <td>Indicates whether the related organization is the individual's primary business. Only applies to relationships between organizations and individuals.</td>
      </tr>
        <tr>
          <td>organization_contact_type</td>
          <td>string</td>
          <td>The contact type that provides context for interactions with the related individual who represents the organization as a contact. Available values are the entries in the <b>Contact Types</b> table. Only applies to relationships between organizations and individuals.</td>
      </tr>
      <tr>
          <td>position</td>
          <td>string</td>
          <td>The individual's position in the organization. Only applies to relationships between organizations and individuals.</td>
      </tr>
    </tbody>
  </table>
</div>

## 2017-04-20

### Changed

 - The `date_added` parameter on the [Constituent list endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) now returns a `sort_token` on the <code>next_link</code> URL to enable pagination for stable data syncing.
 - The [Constituent list endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) now includes a <code>sort</code> parameter to sort constituents based on specified fields. For example, `sort=date_modified,-last` returns constituents in ascending order based on the <code>date_modified</code> field and then orders constituents with the same last-modified date in descending order based on their last names. If the <code>sort</code> parameter provides only the `date_modified` field or only the `date_added` field, then it returns a `sort_token` on the <code>next_link</code> URL.

## 2017-04-06

### Changed

 - The [Constituent list]({{stache.config.portal_endpoints_constituent_get_list}}) endpoint now populates the `marital_status` property by default.

## February 2017

### 2017-02-23

#### Changed

 - The [Constituent list]({{stache.config.portal_endpoints_constituent_get_list}}) endpoint now includes an optional `custom_field_category` parameter to retrieve constituents only if their active custom fields match specified custom field categories.
 - The [Fundraiser list (Single constituent)]({{stache.config.portal_endpoints_fundraiser_get_list}}) endpoint now returns the appropriate value for the `constituent_id` field.

###2017-02-09

#### Changed

- The `major` and `minor` properties on the [education]({{ stache.config.portal_contracts }}#Education) entity have been updated to return an array of strings. They have been renamed `majors` and `minors`.
- The `subject_of_study` property on the [education]({{ stache.config.portal_contracts }}#Education) entity is no longer returned in the `major` property. Instead, it uses a dedicated property for UK-formatted databases.
- The [Address (Create)]({{stache.config.portal_endpoints_constituent_address_create}}) endpoint no longer requires the `country` property. When `country` is not provided, the endpoint uses the organization's default country configuration.
- The `country` property on the [address]({{ stache.config.portal_contracts }}#Address) entity now accepts a country ID, name, or abbreviation. The property uses preferential selection to match against ID first, then name, and then abbreviation.
- The [Ratings list (Single constituent)]({{stache.config.portal_endpoints_constituent_ratings_get_list}}) endpoint now includes an optional `most_recent_only` parameter to retrieve only the most recent rating for each category.

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_countries_get_list }}">
        <td>Countries (Get)</td>
        <td>GET</td>
        <td>/countries</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_add }}">
        <td>Education (Create)</td>
        <td>POST</td>
        <td>/educations</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_edit }}">
        <td>Education (Edit)</td>
        <td>PATCH</td>
        <td>/educations/{education_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_delete }}">
        <td>Education (Delete)</td>
        <td>DELETE</td>
        <td>/educations/{education_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_schools_get }}">
        <td>Education schools (Get)</td>
        <td>GET</td>
        <td>/educations/schools</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_types_get }}">
        <td>Education types (Get)</td>
        <td>GET</td>
        <td>/educations/types</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_statuses_get }}">
        <td>Education statuses (Get)</td>
        <td>GET</td>
        <td>/educations/statuses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_subjects_get }}">
        <td>Education subjects (Get)</td>
        <td>GET</td>
        <td>/educations/subjects</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_degrees_get }}">
        <td>Education degrees (Get)</td>
        <td>GET</td>
        <td>/educations/degrees</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_departments_get }}">
        <td>Education departments (Get)</td>
        <td>GET</td>
        <td>/educations/departments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_degreeclasses_get }}">
        <td>Education degree classes (Get)</td>
        <td>GET</td>
        <td>/educations/degreeclasses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_faculties_get }}">
        <td>Education faculties (Get)</td>
        <td>GET</td>
        <td>/educations/faculties</td>
      </tr>
    </tbody>
  </table>
</div>

## January 2017

### 2017-01-31

##### Announcement: Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

We are updating some properties on the [education]({{ stache.config.portal_contracts }}#Education) entity to improve overall feature parity and to support upcoming POST and PATCH education endpoints in the Constituent API.
- The `major` and `minor` properties will both be updated to return an array of strings. They will also be renamed `majors` and `minors`.
- The `subject_of_study` property will no longer be returned in the `major` property. Instead, it will use a dedicated property for UK-formatted databases.

### 2017-01-11

#### Changed

On the [Address (Create)]({{stache.config.portal_endpoints_constituent_address_create}}) endpoint, we updated the `do_not_mail` and `preferred` properties to set the default value to *false* when the properties are not supplied in the request body.

### 2017-01-10

#### Changed

We added the `campus`, `known_name`, and `social_organization` properties to the [education]({{ stache.config.portal_contracts }}#Education) entity.

### 2017-01-06

#### Changed

- We updated the [Constituent custom field list (Single constituent)]({{stache.config.portal_endpoints_constituent_customfield_get_list}}) endpoint to populate the `date_added` and `date_modified` properties.

- We updated the [Constituent code list (Single constituent)]({{stache.config.portal_endpoints_constituent_code_get_list}}) endpoint to populate the `inactive`, `date_added`, and `date_modified` properties.

<!--
##2016-12-20
### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

- We will update the [Prospect status (Get)]({{stache.config.portal_endpoints_prospect_status_get}}) endpoint to return a 404 response when a current prospect status is requested for a non-existent constituent. Currently, the endpoint returns a 403 response.

- We will update the [Prospect status (Get)]({{stache.config.portal_endpoints_prospect_status_get}}) endpoint to return an empty `status` property when a current prospect status is requested for a constituent with no status history. Currently, the endpoint returns a 404 response.

- We will update the [First gift (Get)]({{stache.config.portal_endpoints_constituent_firstgift_get}}), [Greatest gift (Get)]({{stache.config.portal_endpoints_constituent_greatestgift_get}}), and [Latest gift (Get)]({{stache.config.portal_endpoints_constituent_latestgift_get}}) endpoints to return empty objects when gifts are requested for constituents with no giving history. Currently, the endpoints return the string "null."
-->

## 2016

###2016-12-12

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_category_values_get }}">
        <td>Rating category values (Get)</td>
        <td>GET</td>
        <td>/ratings/categories/values</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

- We changed the format of the `name` property on the [Constituent (Get)]({{stache.config.portal_endpoints_constituent_get}}) endpoint to "FirstName LastName" for consistency with the [Constituent list]({{stache.config.portal_endpoints_constituent_get_list}}) endpoint.

- We updated the [Email address (Edit)]({{stache.config.portal_endpoints_constituent_email_address_update}}) and [Online presence (Edit)]({{stache.config.portal_endpoints_constituent_online_presence_update}}) endpoints to respect the `type` property.

- We changed the [Rating (Create)]({{ stache.config.portal_endpoints_constituent_ratings_create }}) endpoint to require the "source" property for categories that have a source.


###2016-11-23

#### Changed

- We updated the [Constituent (Create)]({{stache.config.portal_endpoints_constituent_create}}), [Constituent (Edit)]({{stache.config.portal_endpoints_constituent_update}}), [Constituent (Get)]({{ stache.config.portal_endpoints_constituent_get }}), and [Constituent list]({{stache.config.portal_endpoints_constituent_get_list}}) endpoints to ensure that the `lookup_id`, `inactive`, and `gives_anonymously` properties are respected and populated.

- We updated the [Constituent (Edit)]({{stache.config.portal_endpoints_constituent_update}}) endpoint to appropriately respect Constituent Biographical Edit permissions.

###2016-11-16

#### Changed

The [Constituent list endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) now includes an option to filter constituents based on their associated constituent codes. The optional `constituent_code` query parameter returns constituents if any of the specified constituent codes match any of their active constituent codes. For example, `constituent_code=Board Member&amp;constituent_code=Volunteer` returns constituents with either "Board Member" or "Volunteer" constituent codes.

###2016-11-14

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_all_constituent_code_get_list }}">
        <td>Constituent code list (All Constituents)</td>
        <td>GET</td>
        <td>/constituents/constituentcodes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_all_constituent_custom_field_get_list }}">
        <td>Constituent custom field list (All constituents)</td>
        <td>GET</td>
        <td>/constituents/customfields</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

- We renamed all existing list endpoints to implement a new naming convention that better indicates whether the endpoints return data for a single constituent or for all constituents. Endpoints that return data for a single constituent are now postfixed with `(Single constituent)`. Endpoints that return data for all constituents are now postfixed with `(All constituents)`.

- The [Address list (All constituents) endpoint]({{stache.config.portal_endpoints_address_get_list}}) no longer includes inactive addresses by default. To include inactive addresses, use the optional `include_inactive` parameter in the request.

- The [Address list (All constituents) endpoint]({{stache.config.portal_endpoints_address_get_list}}) now populates the `formatted_address` property.

- We updated the following endpoints to appropriately respect constituent record-level security:

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_address_get_list }}">
            <td>Address (List)</td>
            <td>GET</td>
            <td>/addresses</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_email_address_get_list }}">
            <td>Email address (List)</td>
            <td>GET</td>
            <td>/emailaddresses</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_online_presence_get_list }}">
            <td>Online presence (List)</td>
            <td>GET</td>
            <td>/onlinepresences</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_phone_get_list }}">
            <td>Phone (List)</td>
            <td>GET</td>
            <td>/phones</td>
          </tr>
        </tbody>
      </table>
    </div>


###2016-10-20

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_address_get_list }}">
        <td>Address (List)&#42;</td>
        <td>GET</td>
        <td>/addresses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_email_address_get_list }}">
        <td>Email address (List)&#42;</td>
        <td>GET</td>
        <td>/emailaddresses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_online_presence_get_list }}">
        <td>Online presence (List)&#42;</td>
        <td>GET</td>
        <td>/onlinepresences</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_phone_get_list }}">
        <td>Phone (List)&#42;</td>
        <td>GET</td>
        <td>/phones</td>
      </tr>
    </tbody>
  </table>
</div>

    <strong>&#42;</strong> The new endpoints assume the names of existing endpoints, which were renamed in the endpoint reference. The previous Address (List) is now [Constituent address (List)]({{stache.config.portal_endpoints_constituent_address_get_list}}); the previous Email address (List) is now [Constituent email address (List)]({{stache.config.portal_endpoints_constituent_email_address_get_list}}); the previous Online presence (List) is now [Constituent online presence (List)]({{stache.config.portal_endpoints_constituent_online_presence_get_list}}); and the previous Phone (List) is now [Constituent phone (List)]({{stache.config.portal_endpoints_constituent_phone_get_list}}).  


#### Changed
We added the `date_added` and `date_modified` properties to the [address]({{ stache.config.constituent_entity_reference }}#Address), [email address]({{ stache.config.constituent_entity_reference }}#EmailAddress), [online presence]({{ stache.config.constituent_entity_reference }}#OnlinePresence), and [phone]({{ stache.config.constituent_entity_reference }}#Phone) entities.

###2016-10-17

#### Changed

The `fundraisers` property on the [action]({{ stache.config.constituent_entity_reference }}#Action) entity now contains an array of strings populated with the `constituent_id` of fundraisers instead of an array of action fundraiser entities.

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_get_list }}">
        <td>Action custom field (List)</td>
        <td>GET</td>
        <td>/actions/{action_id}/customfields</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_create }}">
        <td>Action custom field (Create)</td>
        <td>POST</td>
        <td>/actions/customfields</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_edit }}">
        <td>Action custom field (Edit)</td>
        <td>PATCH</td>
        <td>/actions/customfields/{custom_field_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_delete }}">
        <td>Action custom field (Delete)</td>
        <td>DELETE</td>
        <td>/actions/customfields/{custom_field_id}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_get_categories }}">
        <td>Action custom field categories (Get)</td>
        <td>GET</td>
        <td>/actions/customfields/categories</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_custom_fields_get_category_values }}">
        <td>Action custom field category values (Get)</td>
        <td>GET</td>
        <td>/actions/customfields/categories/values</td>
      </tr>
    </tbody>
  </table>
</div>

###2016-10-03

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_prospect_status_get }}">
        <td>Prospect status (Get)</td>
        <td>GET</td>
        <td>/constituents/{constituent_id}/prospectstatus</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fundraiser_get_list }}">
        <td>Fundraiser (List)</td>
        <td>GET</td>
        <td>/constituents/{constituent_id}/fundraisers</td>
      </tr>
    </tbody>
  </table>
</div>


###2016-09-28

#### Changed

 - The [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) now includes the option to select specific properties on its return object by using the optional `fields`query parameter. This can reduce the response payload size and improve the response time.
 - The [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) no longer returns deceased constituents by default. Instead, they are included by setting the new `include_deceased` option to true.
 - The [Communication preference (List)]({{ stache.config.portal_endpoints_constituent_communication_preferences_get_list }}) endpoint can now be paginated using the new `limit` and `offset` query parameters. If not specified, the default `limit` is 10000.
 - We changed the following query string parameters to snake case:
   - `includeInactive` is now `include_inactive` on [Constituent (List)]({{stache.config.portal_endpoints_constituent_get_list}}), [Email address (List)]({{ stache.config.portal_endpoints_constituent_email_address_get_list }}), [Online presence (List)]({{ stache.config.portal_endpoints_constituent_online_presence_get_list }}), [Phone (List)]({{ stache.config.portal_endpoints_constituent_phone_get_list }}), [Rating (List)]({{ stache.config.portal_endpoints_constituent_ratings_get_list }}), [Rating categories (Get)]({{ stache.config.portal_endpoints_constituent_ratings_categories_get }}), and [Rating sources (Get)]({{ stache.config.portal_endpoints_constituent_ratings_sources_get }}).
   - `categoryName` is now `category_name` on [Constituent custom field category values (Get)]({{ stache.config.portal_endpoints_constituent_customfield_value_get_list }}).
   - `searchText` is now `search_text` on [Constituent (Search)]({{ stache.config.portal_endpoints_constituent_search }}).

###2016-09-27

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

We will change the `fundraisers` property on the [action]({{ stache.config.constituent_entity_reference }}#Action) entity so that it contains a list of strings populated with the `constituent_id` of fundraisers instead of an array of action fundraiser entities.

### 2016-09-23

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

We will change the query string parameter `includeInactive` to `include_inactive` on the [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}).

### 2016-09-14

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

 - The [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) will no longer return deceased constituents by default. Instead, they will be included by setting a new `include_deceased` option to true.
 - We will change the following query string parameters to snake case:
   - `includeInactive` will be `include_inactive` on [Email address (List)]({{ stache.config.portal_endpoints_constituent_email_address_get_list }}), [Online presence (List)]({{ stache.config.portal_endpoints_constituent_online_presence_get_list }}), [Phone (List)]({{ stache.config.portal_endpoints_constituent_phone_get_list }}), [Rating (List)]({{ stache.config.portal_endpoints_constituent_ratings_get_list }}), [Rating categories (Get)]({{ stache.config.portal_endpoints_constituent_ratings_categories_get }}), and [Rating sources (Get)]({{ stache.config.portal_endpoints_constituent_ratings_sources_get }}).
   - `categoryName` will be `category_name` on [Constituent custom field category values (Get)]({{ stache.config.portal_endpoints_constituent_customfield_value_get_list }}).
   - `searchText` will be `search_text` on [Constituent (Search)]({{ stache.config.portal_endpoints_constituent_search }}).

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_sources_get }}">
        <td>Rating sources (Get)</td>
        <td>GET</td>
        <td>/ratings/sources</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_categories_get }}">
        <td>Rating categories (Get)</td>
        <td>GET</td>
        <td>/ratings/categories</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_attachment_update }}">
        <td>Action attachment (Edit)</td>
        <td>PATCH</td>
        <td>/actions/attachments/{attachmentId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_attachment_delete }}">
        <td>Action attachment (Delete)</td>
        <td>DELETE</td>
        <td>/actions/attachments/{attachmentId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_attachment_update }}">
        <td>Constituent attachment (Edit)</td>
        <td>PATCH</td>
        <td>/constituents/attachments/{attachmentId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_attachment_delete }}">
        <td>Constituent attachment (Delete)</td>
        <td>DELETE</td>
        <td>/constituents/attachments/{attachmentId}</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

New tags included in the request will be automatically added to the **Document Tags** table when adding or updating attachments.

###2016-09-07

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_communication_preferences_edit }}">
        <td>Communication preference (Edit)</td>
        <td>PATCH</td>
        <td>/communicationpreferences/{communicationPreferenceId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_create }}">
        <td>Rating (Create)</td>
        <td>POST</td>
        <td>/ratings</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_edit }}">
        <td>Rating (Edit)</td>
        <td>PATCH</td>
        <td>/ratings/{ratingId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_delete }}">
        <td>Rating (Delete)</td>
        <td>DELETE</td>
        <td>/ratings/{ratingId}</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We added the `lookup_id` property to the [search results]({{ stache.config.portal_contracts }}#SearchResult) entity.

###2016-09-02

####Changed

All `POST` endpoints now return a JSON object containing the id, in the form `{ "id": "123" }`, instead of the previous string response.


### 2016-08-31

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
            <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_action_attachment_get_list}}">
                <td>Action attachment (List)</td>
                <td>GET</td>
                <td>/actions/{actionId}/attachments</td>
            </tr>
            <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_action_attachment_create}}">
                <td>Action attachment (Create)</td>
                <td>POST</td>
                <td>/actions/attachments</td>
            </tr>
        </tbody>
    </table
</div>

#### Changed
- We changed the URL for the [Constituent Attachment (Create) endpoint]({{stache.config.portal_endpoints_constituent_attachment_create}}) to `/constituents/attachments`. The `constituentId` is now expected in the request body as `parent_id`.
- The [Constituent (Create) endpoint]({{stache.config.portal_endpoints_constituent_create}}) now supports adding a constituent with the following child entity properties: [address]({{ stache.config.portal_contracts }}#Address), [phone number]({{ stache.config.portal_contracts }}#Phone), [email address]({{ stache.config.portal_contracts }}#EmailAddress), and [online presence]({{ stache.config.portal_contracts }}#OnlinePresence).
- We updated the [Constituent (Edit) endpoint]({{stache.config.portal_endpoints_constituent_update}}) to include  `marital_status`, `deceased_date`, `former_name`, `title_2`, and `suffix_2` as available `PATCH` request body properties.

### 2016-08-29

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

All `POST` endpoints will now return a JSON object containing the id, in the form `{ "id": "123" }`, instead of the current string response.


### 2016-08-26

#### Changed

 - We renamed the `proposal_id` property to `opportunity_id` on actions to be consistent with product verbiage.

 - The [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) no longer includes inactive constituents by default. To include inactive constituents, use the optional `includeInactive` parameter in the request.

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

We will change the URL for the [Constituent Attachment (Create) endpoint]({{stache.config.portal_endpoints_constituent_attachment_create}}) to `/constituents/attachments`.

### 2016-08-22

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
            <tr class="clickable-row" data-url="{{stache.config.portal_endpoints_currency_configuration_get}}">
                <td>Currency configuration (Get)</td>
                <td>GET</td>
                <td>/currencyconfiguration</td>
            </tr>
        </tbody>
    </table
</div>

#### Changed

- The data type assigned to the `value` property on the [rating]({{stache.config.portal_contracts}}#Rating) entity was changed from a string to an object. Previously, all values were returned as strings that needed to be parsed (by the requestor) into the intended types. Currently, the rating `value` will be returned with its data type intact based on the `type` with the following mapping:

  <div class="table-responsive">
      <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th><strong>Type</strong></th>
                    <th><strong>Description</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>boolean</td>
                    <td>Defines the rating `value` as a boolean JSON data type.</td>
                </tr>
                <tr>
                    <td>codetable</td>
                    <td>Defines the rating `value` as a string JSON data type that refers to a code table entry.</td>
                </tr>
                <tr>
                    <td>currency</td>
                    <td>Defines the rating `value` as a number JSON data type.</td>
                </tr>
                <tr>
                    <td>datetime</td>
                    <td>Defines the rating `value` as a string JSON data type in <a href="https://tools.ietf.org/html/rfc3339">ISO-8601 format: </a><span class="code">2015-09-18T00:00:00</span>.</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>Defines the rating `value` as a number JSON data type.</td>
                </tr>
                <tr>
                    <td>text</td>
                    <td>Defines the rating `value` as a string JSON data type.</td>
                </tr>
            </tbody>
        </table>
  </div>

- We corrected an issue with the `postal_code` filter within the [Constituent (List)]({{ stache.config.portal_endpoints_constituent_get_list }}) endpoint where incorrect values were returned if the postal codes filter listed multiple postal codes that were separated by commas or if postal codes contained leading space characters.

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

 - We will rename the `constituent_id` property to `parent_id` to support additional attachment areas such as action attachments.
 - We will rename the `proposal_id` property to `opportunity_id` on actions to be consistent with product verbiage.

### 2016-08-18

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

The [Constituent (List) endpoint]({{stache.config.portal_endpoints_constituent_get_list}}) will no longer include inactive constituents by default. To include inactive constituents, use the optional `includeInactive` parameter in the request.

### 2016-08-16

#### Announcement: Breaking Changes Planned for [Constituent API]({{stache.config.portal_endpoints_constituent}})

The data type assigned to the `value` property on the [rating]({{stache.config.portal_contracts}}#Rating) entity will be changed from a string to an object. As it stands today, all values are returned as a string, which must then be parsed (by the requestor) into the intended type. After release, the Rating `value` will be returned with its data type intact.

### 2016-08-11

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_communication_preferences_create }}">
        <td>Communication preference (Create)</td>
        <td>POST</td>
        <td>/communicationpreferences</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_communication_preferences_delete }}">
        <td>Communication preference (Delete)</td>
        <td>DELETE</td>
        <td>/communicationpreferences/{communicationPreferenceId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_communication_preferences_types_get_list }}">
        <td>Communication preferences (Get)</td>
        <td>GET</td>
        <td>/communicationpreferences</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

- We added `start` and `end` to the [communication preference]({{ stache.config.portal_contracts }}#CommunicationPreference) entity to represent optional start and end dates.
- We added the ability to retrieve inactive [rating]({{ stache.config.portal_endpoints_constituent_ratings_get_list }}) records by including a new, optional `includeInactive` parameter in the request.

### 2016-08-03

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_communication_preferences_get_list }}">
        <td>Communication preference (List)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/communicationpreferences</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

- We removed `boolean_value`, `code_table_value`, `constituent_id_value`, `date_value`, `fuzzy_date_value`, `currency_value`, `numeric_value`, `text_value` and replaced them with a single `value` property for use with any `type` on the [custom field]({{ stache.config.portal_contracts }}#CustomField) entity.
- We added the `gpa`, `class_of_degree`, `faculty`, `department`, and `registration_number` properties to the [education]({{ stache.config.portal_contracts }}#Education) entity.
- We added the ability to paginate [search results]({{ stache.config.portal_contracts }}#SearchResult) by including a new, optional `limit` and `offset` parameters in the request.
- We added the ability to retrieve inactive [address]({{ stache.config.portal_endpoints_constituent_address_get_list }}) records by including a new, optional `includeInactive` parameter in the request.


### 2016-07-29

#### Announcement: Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

- We will remove `boolean_value`, `code_table_value`, `constituent_id_value`, `date_value`, `fuzzy_date_value`, `currency_value`, `numeric_value`, `text_value` and replace them with a single `value` property for use with any `type` on the [custom field]({{ stache.config.portal_contracts }}#CustomField) entity.
- This change is planned to take effect on Monday, August 1st.

### 2016-07-27

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_update }}">
        <td>Constituent (Edit)</td>
        <td>PATCH</td>
        <td>/constituents/{constituentId}</td>
      </tr>
    </tbody>
  </table>
</div>

### 2016-07-22

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_ratings_get_list }}">
        <td>Rating (List)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/ratings/</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_customfield_create }}">
        <td>Constituent custom field (Create)</td>
        <td>POST</td>
        <td>/constituents/customfields/</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_customfield_update }}">
        <td>Constituent custom field (Edit)</td>
        <td>PATCH</td>
        <td>/constituents/customfields/{customFieldId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_customfield_delete }}">
        <td>Constituent custom field (Delete)</td>
        <td>DELETE</td>
        <td>/constituents/customfields/{customFieldId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_customfield_value_get_list }}">
        <td>Constituent custom field category values (Get)</td>
        <td>GET</td>
        <td>/constituents/customfields/categories/values</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We added the `date_added`, `date_modified`, `title_2`, `suffix_2`, `marital_status`, `deceased_date` properties to the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.

### 2016-07-18

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_create }}">
        <td>Constituent (Create)</td>
        <td>POST</td>
        <td>/constituents</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We removed the `business` property from the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.

### 2016-07-07

#### Changed

- We renamed `kind` to `type` and `types` to `tags` on the [attachment]({{ stache.config.portal_contracts }}#Attachment) entity.
- We renamed  `nickname` to `preferred_name` on the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.

### 2016-07-01

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_firstgift_get }}">
        <td>First gift (Get)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/givingsummary/first</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_latestgift_get }}">
        <td>Latest gift (Get)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/givingsummary/latest</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_greatestgift_get }}">
        <td>Greatest gift (Get)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/givingsummary/greatest</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_customfieldcatagories_constituent_get_list }}">
        <td>Constituent custom field categories (Get)</td>
        <td>GET</td>
        <td>/constituents/customfields/categories</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_titles_get_list }}">
        <td>Titles (Get)</td>
        <td>GET</td>
        <td>/titles</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_suffixes_get_list }}">
        <td>Suffixes (Get)</td>
        <td>GET</td>
        <td>/suffixes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_maritalstatustypes_get_list }}">
        <td>Marital statuses (Get)</td>
        <td>GET</td>
        <td>/maritalstatuses</td>
      </tr>
    </tbody>
  </table>
</div>


### 2016-06-30

#### Announcement: Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

- We will rename `kind` to `type` and `types` to `tags` on the [attachment]({{ stache.config.portal_contracts }}#Attachment) entity.
- We will rename `nickname` to `preferred_name` on the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.
- This change is planned to take effect on Wednesday, July 6.

### 2016-06-27

#### New

- Added the following endpoint:
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
        <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_address_update }}">
          <td>Address (Edit)</td>
          <td>PATCH</td>
          <td>/addresses/{addressId}</td>
        </tr>
      </tbody>
    </table>
  </div>

- Added the ability to retrieve inactive [email address]({{ stache.config.portal_endpoints_constituent_email_address_get_list }}), [online presence]({{ stache.config.portal_endpoints_constituent_online_presence_get_list }}), and [phone]({{ stache.config.portal_endpoints_constituent_phone_get_list }}) records by including a new, optional `includeInactive` parameter in the request.

### 2016-06-20

#### Changed

We updated the [Constituent (List)]({{ stache.config.portal_endpoints_constituent_get_list }}) endpoint to include a new, optional `postal_code` parameter which provides the ability to filter constituents by postal code based on their preferred address. The parameter value supports multiple postal codes separated by commas. Postal codes will match on a constituent if the preferred address postal code _begins_ with one of the specified filter postal codes. For example, given the query `postal_code=99577,10001`, the response could contain constituents whose preferred address has a postal code of 99577-0727 or 10001.

### 2016-06-15

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_address_delete }}">
        <td>Address (Delete)</td>
        <td>DELETE</td>
        <td>/addresses/{addressId}</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We added a versioning indicator to the Constituent API's base URL. Specifically, all new API requests must begin with `{{ stache.config.resource_url }}/v1`.

### 2016-06-10

#### Announcement: Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

- We will be adding a versioning indicator to the Constituent API's base URL. Specifically, all new API requests should begin with `{{ stache.config.resource_url }}/v1`.
- This change is planned to take effect on Wednesday, June 15.

### 2016-06-09

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_address_create }}">
        <td>Address (Create)</td>
        <td>POST</td>
        <td>/addresses</td>
      </tr>
    </tbody>
  </table>
</div>

### 2016-06-06

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_lifetimegiving_get }}">
        <td>Lifetime giving (Get)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/givingsummary/lifetimegiving</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_membership_get_list }}">
        <td>Membership (List)</td>
        <td>GET</td>
        <td>/constituents/{constituentId}/memberships</td>
      </tr>
    </tbody>
  </table>
</div>

### 2016-06-01

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_types_get }}">
        <td>Action types (Get)</td>
        <td>GET</td>
        <td>/actiontypes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_action_statuses_get }}">
        <td>Action status types (Get)</td>
        <td>GET</td>
        <td>/actionstatustypes</td>
      </tr>
    </tbody>
  </table>
</div>


### 2016-05-27

#### New

- Added the following endpoints:

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
        <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_note_types_get }}">
          <td>Note types (Get)</td>
          <td>GET</td>
          <td>/notetypes</td>
        </tr>
      </tbody>
    </table>
  </div>

- Added a [General Ledger changelog]({{ stache.config.support_changelog_gl }}) to help you keep up with General Ledger API changes.

### 2016-05-24

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_addresstypes_get_list }}">
        <td>Address types (Get)</td>
        <td>GET</td>
        <td>/addresstypes</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We renamed `send_mail` to `do_not_mail` on the [address]({{ stache.config.portal_contracts }}#Address) entity. Additionally, the boolean logic has been switched.

### 2016-05-20

#### Announcement: Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

- We will rename `send_mail` to `do_not_mail` on the [address]({{ stache.config.portal_contracts }}#Address) entity. Additionally, the boolean logic will be switched.
- We will remove the `business` property from the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_phone_add }}">
        <td>Phone (Create)</td>
        <td>POST</td>
        <td>/phones</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_phone_update }}">
        <td>Phone (Edit)</td>
        <td>PATCH</td>
        <td>/phones/{phoneId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_phone_delete }}">
        <td>Phone (Delete)</td>
        <td>DELETE</td>
        <td>/phones/{phoneId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_phonetypes_get_list }}">
        <td>Phone types (Get)</td>
        <td>GET</td>
        <td>/phonetypes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_emailaddresstypes_get_list }}">
        <td>Email address types (Get)</td>
        <td>GET</td>
        <td>/emailaddresstypes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_onlinepresencetypes_get_list }}">
        <td>Online presence types (Get)</td>
        <td>GET</td>
        <td>/onlinepresencetypes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituentcodetypes_get_list }}">
        <td>Constituent code types (Get)</td>
        <td>GET</td>
        <td>/constituentcodetypes</td>
      </tr>
    </tbody>
  </table>
</div>

#### Changed

We implemented the following breaking changes:
  - We removed the following [address]({{ stache.config.portal_contracts }}#Address) properties:
    - `primary_business`
    - `start`
    - `end`
    - `seasonal`
    - `seasonal_start`
    - `seasonal_end`
    - `in_season`
    - `valid`
  - We renamed the `address` to `formatted_address`.

### 2016-05-16

#### Announcement:  Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

- We will remove the following [address]({{ stache.config.portal_contracts }}#Address) properties:
  - `primary_business`
  - `start`
  - `end`
  - `seasonal`
  - `seasonal_start`
  - `seasonal_end`
  - `in_season`
  - `valid`

- We will remove the `business` property from the [constituent]({{ stache.config.portal_contracts }}#Constituent) entity.

### 2016-05-13

#### New

- We updated the [Constituent (List)]({{ stache.config.portal_endpoints_constituent_get_list }}) endpoint to include a new, optional `date_added` parameter which provides the ability to poll for recently added constituents since a specified date/time. The parameter value should consist of a URL encoded UTC datetime.  When specified, the list is sorted by date added in ascending order.

- We updated the [Constituent (List)]({{ stache.config.portal_endpoints_constituent_get_list }}) endpoint to include a new, optional `last_modified` parameter which provides the ability to poll for recently changed constituents since a specified date/time. The parameter value should consist of a URL encoded UTC datetime.  When specified, the list is sorted by last modified in ascending order.

  The response includes a `sort_token` within the `next_link` property. `sort_token` represents a token filter for providing the next set of constituents, ordered by the last modified date.

<p><bb-alert bb-alert-type="info"><strong>Note:</strong> The Constituent (List) endpoint returns data with an average latency of 30 minutes.</bb-alert></p>

### 2016-05-06

#### New

- Added the following granular [address]({{ stache.config.portal_contracts }}#Address) properties:
  - `address_lines`
  - `city`
  - `suburb`
  - `state`
  - `postal_code`
  - `county`
  - `country`

  Addresses are returned by the following endpoints:

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_get }}">
            <td>Constituent (Get)</td>
            <td>GET</td>
            <td>/constituents/{constituentId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_get_list }}">
            <td>Constituent (List)</td>
            <td>GET</td>
            <td>/constituents</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_address_get_list }}">
            <td>Address (List)</td>
            <td>GET</td>
            <td>/constituents/{constituentId}/addresses</td>
          </tr>
        </tbody>
      </table>
    </div>

- Added international address field support for the following countries.

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th><strong>Field</strong></th>
            <th style="text-align:center"><strong>United States</strong></th>
            <th style="text-align:center"><strong>Canada</strong></th>
            <th style="text-align:center"><strong>United Kingdom</strong></th>
            <th style="text-align:center"><strong>Australia</strong></th>
            <th style="text-align:center"><strong>New Zealand</strong></th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>`address_lines`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
            </tr>
            <tr>
              <td>`city`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i>&#42;</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
            </tr>
            <tr>
              <td>`suburb`</td>
              <td style="text-align:center"></td>
              <td style="text-align:center"></td>
              <td style="text-align:center"></td>
              <td style="text-align:center"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
            </tr>
            <tr>
              <td>`state`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></i>&#33;</td>
              <td style="text-align:center"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"></td>
            </tr>
            <tr>
              <td>`postal_code`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
            </tr>
            <tr>
              <td>`county`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"></td>
              <td style="text-align:center"></td>
            </tr>
            <tr>
              <td>`country`</td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
              <td style="text-align:center"><i class="fa fa-check" aria-hidden="true"></td>
            </tr>
        </tbody>
      </table>
    </div>

    &#42; **Australia** - City or suburb data is returned with the `city` field for `GET` operations. Future endpoints will allow you to `POST` and `PATCH` address data.  In these cases, you can use _either_ the `suburb` or `city` properties, but not both at the same time. Providing both property values in future `POST` and `PATCH` operations will result in an error.<br>
    &#33; **Canada** - Use the `state` property to track a Canadian Province

#### Changed

- For consistency, `constituent_id` is included in the following entities:
  - [Address]({{ stache.config.portal_contracts }}#Address)
  - [Attachment]({{ stache.config.portal_contracts }}#Attachment)
  - [Constituent code]({{ stache.config.portal_contracts }}#ConstituentCode)
  - [Email address]({{ stache.config.portal_contracts }}#EmailAddress)
  - [Online presence]({{ stache.config.portal_contracts }}#OnlinePresence)
  - [Phone]({{ stache.config.portal_contracts }}#Phone)
  - [Custom field]({{ stache.config.portal_contracts }}#CustomField)
  - [Name format]({{ stache.config.portal_contracts }}#NameFormat)
  - [Profile picture]({{ stache.config.portal_contracts }}#ProfilePicture)
  - [Action]({{ stache.config.portal_contracts }}#Action)
  - [Note]({{ stache.config.portal_contracts }}#Note)

- When editing, existing endpoints that previously used the `PUT` HTTP verb have been replaced with `PATCH`.  `PATCH` can be used to update partial resources. For instance, when you only need to update one field of the resource.  Impacted constituent related endpoints include:

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Operation</th>
            <th>New Method</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_update }}">
            <td>Action (Edit)</td>
            <td>PATCH</td>
            <td>/actions/{actionId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_code_update }}">
            <td>Constituent code (Edit)</td>
            <td>PATCH</td>
            <td>/constituentcodes/{constituentCodeId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_email_address_update }}">
            <td>Email address (Edit)</td>
            <td>PATCH</td>
            <td>/emailaddresses/{emailAddressId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_update }}">
            <td>Note (Edit)</td>
            <td>PATCH</td>
            <td>/notes/{noteId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_online_presence_update }}">
            <td>Online presence (Edit)</td>
            <td>PATCH</td>
            <td>/onlinepresences/{onlinePresenceId}</td>
          </tr>
        </tbody>
      </table>
    </div>

- We made changes to the [custom field]({{ stache.config.portal_contracts }}#CustomField) entity:
    - To better denote the fields that can represent the "value" of the custom field, we appended a `_value` suffix to the field name for the following fields:
      - `constituent_id_value`
      - `date_value`
      - `text_value`
      - `number_value`
      - `currency_value`
      - `boolean_value`
      - `code_table_value`
      - `fuzzy_date_value`

    - Renamed the `constituent_id` property to `parent_id` to avoid confusion with the `constituent_id_value` field and to facilitate the re-use of this type across other entities. The `parent_id` represents the parent object's identifier. For example, in the case of constituent custom fields, the `parent_id` represents the constituent identifier.
    - Added `date` and `comment` properties.


### 2016-04-26

#### Announcement:  Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }})

In the coming days two breaking changes will be placed into effect:

- We will replace existing `PUT` endpoints to use `PATCH`, instead. Unlike `PUT`, `PATCH` can be used to update partial resources. For instance, when you only need to update one field of the resource.  In this way the payload size is optimized.

### 2016-04-25

#### New

- Added the ability to create, edit, and delete [email addresses]({{ stache.config.portal_contracts }}#EmailAddress):

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
        <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_email_address_add }}">
          <td>Email address (Create)</td>
          <td>POST</td>
          <td>/emailaddresses</td>
        </tr>
        <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_email_address_update }}">
          <td>Email address (Edit)</td>
          <td>PUT</td>
          <td>/emailaddresses/{emailAddressId}</td>
        </tr>
        <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_email_address_delete }}">
          <td>Email address (Delete)</td>
          <td>DELETE</td>
          <td>/emailaddresses/{emailAddressId}</td>
        </tr>
      </tbody>
    </table>
  </div>

- Added the ability to create and edit [constituent codes]({{ stache.config.portal_contracts }}#ConstituentCode):

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_code_add }}">
            <td>Constituent code (Create)</td>
            <td>POST</td>
            <td>/constituentcodes</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_code_update }}">
            <td>Constituent code (Edit)</td>
            <td>PUT</td>
            <td>/constituentcodes/{constituentCodeId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_code_delete }}">
            <td>Constituent code (Delete)</td>
            <td>DELETE</td>
            <td>/constituentcodes/{constituentCodeId}</td>
          </tr>
        </tbody>
      </table>
    </div>

### 2016-04-15

#### New

Added the ability to create, edit, and delete [online presence]({{ stache.config.portal_contracts }}#OnlinePresence) entities:

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_online_presence_add }}">
        <td>Online presence (Create)</td>
        <td>POST</td>
        <td>/onlinepresences</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_online_presence_update }}">
        <td>Online presence (Edit)</td>
        <td>PUT</td>
        <td>/onlinepresences/{onlinePresenceId}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_online_presence_delete }}">
        <td>Online presence (Delete)</td>
        <td>DELETE</td>
        <td>/onlinepresences/{onlinePresenceId}</td>
      </tr>
    </tbody>
  </table>
</div>

### 2016-04-08

#### New

- Added the ability to return a paginated list of [constituents]({{ stache.config.portal_contracts }}#Constituent).  For this release, the list will be ordered by name (last name for individuals, organization name for organizations).

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_get_list }}">
            <td>Constituent (List)</td>
            <td>GET</td>
            <td>/constituents</td>
          </tr>
        </tbody>
      </table>
    </div>

    The endpoint supports the following the optional request parameters. [Pagination]({{ stache.config.guide_basics }}#pagination) is facilitated through the results via the `top` and `skip` parameters:
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>top</code></td>
            <td>Optional. Integer. Represents the number of records to return.  If not specified, the default is 100.  The maximum allowed value is 500. </td>
          </tr>
          <tr>
            <td><code>skip</code></td>
            <td>Optional. Integer. Represents the number of records to skip.</td>
          </tr>
        </tbody>
      </table>
    </div>

#### Changed

- Breaking change implemented for the [Constituent API]({{ stache.config.portal_endpoints_constituent }}) endpoints that return a [collection]({{ stache.config.portal_contracts }}#Collection) of objects.  This change allows us to be consistent in the representation of data collections and supports [pagination]({{ stache.config.guide_basics }}#pagination) for certain endpoints.

    See the <a href="#2016-03-31" class="smooth-scroll">2016-03-31</a> changelog entry for a listing of affected endpoints.

- [Constituent (Search)]({{ stache.config.portal_endpoints_constituent_search }}) now supports the ability to search on an email address (same functionality as found in the RE NXT search feature).  This expanded search will match against constituent email addresses when the `searchText` parameter is a valid email address.  Note that we currently support exact match only.


### 2016-03-31

#### Announcement:  Breaking Changes Planned for [Constituent API]({{ stache.config.portal_endpoints_constituent }}) endpoints
In the coming weeks, we will be standardizing the shape of our responses that return a collection of objects.  This standardization will allow us to be consistent across each endpoint as well as to facilitate some future enhancements around pagination within those endpoints.  The new representation of a collection will be a JSON object with two properties, a `count` which represents the total number of records meeting the criteria and a `value` property which represents the array of items for the current paged response.

<p><bb-alert bb-alert-type="warning">This change is scheduled for release by April 8, 2016.</bb-alert></p>

#### How a collection response is formed today (Phones used as an example):

<pre class="language-javascript"><code>{
    "phones": [
        {
            "id": "95",
            "type": "Home",
            "number": "303-997-3301",
            "do_not_call": false,
            "primary": true,
            "inactive": false
        },
        {
            "id": "330",
            "type": "Home",
            "number": "(312) 997-3301",
            "do_not_call": false,
            "primary": false,
            "inactive": false
        }
    ]
}</code></pre>

#### How the response will be formed after release:

<pre class="language-javascript"><code>{
    "count": 10, // total number of elements in the collection
    "value": [   // collection of items included in this response
        {
            "id": "95",
            "type": "Home",
            "number": "303-997-3301",
            "do_not_call": false,
            "primary": true,
            "inactive": false
        },
        {
            "id": "330",
            "type": "Home",
            "number": "(312) 997-3301",
            "do_not_call": false,
            "primary": false,
            "inactive": false
        }
    ]
}</code></pre>

<em>* Please note that the response format may change before official release.</em>

#### Endpoints affected:

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
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_get_list }}">
        <td>Action (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/actions</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_address_get_list }}">
        <td>Address (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/addresses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_attachment_get_list }}">
        <td>Constituent attachment (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/attachments</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_code_get_list }}">
        <td>Constituent code (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/constituentcodes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_search }}">
        <td>Constituent (Search)</td>
        <td>GET</td>
        <td>/constituent/constituents/search/?searchText={searchText}</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_customfield_get_list }}">
        <td>Constituent custom field (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/customfields</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_get_list }}">
        <td>Education (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/educations</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_email_address_get_list }}">
        <td>Email address (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/emailaddresses</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_name_format_get_list }}">
        <td>Name format (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/nameformats</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_get_list }}">
        <td>Note (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/notes</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_online_presence_get_list }}">
        <td>Online presence (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/onlinepresences</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_phone_get_list }}">
        <td>Phone (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/phones</td>
      </tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_relationship_get_list }}">
        <td>Relationship (List)</td>
        <td>GET</td>
        <td>/constituent/constituents/{constituentId}/relationships</td>
      </tr>
    </tbody>
  </table>
</div>

### 2016-03-30

#### New

- Added the ability to return a list of [relationships]({{ stache.config.portal_contracts }}#Relationship) for a specified constituent.

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_relationship_get_list }}">
            <td>Relationship (List)</td>
            <td>GET</td>
            <td>/constituents/{constituentId}/relationships</td>
          </tr>
        </tbody>
      </table>
    </div>

- Added the ability to return a constituent's [profile picture]({{ stache.config.portal_contracts }}#ProfilePicture).

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_profilepic_get }}">
            <td>Profile picture (Get)</td>
            <td>GET</td>
            <td>/constituents/{constituentId}/profilepicture</td>
          </tr>
        </tbody>
      </table>
    </div>

#### Changed

GET operations that return an [attachment]({{ stache.config.portal_contracts }}#Attachment) endpoint, such as  [Constituent attachment (List)]({{ stache.config.portal_endpoints_constituent_attachment_get_list }}), return the following new properties:

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>`thumbnail_url`</td>
            <td>Read only.  String.  Represents an image thumbnail URI for a picture to display. Endpoints that add or edit attachments ignore this property.
            </td>
          </tr>
          <tr>
            <td>`file_size`</td>
            <td>Read only.  Long integer.  The file size of the attachment in bytes. Only applies to  <i>physical</i> attachments. Helps to determine how to display large images. Endpoints that add or edit attachments ignore this property.</td>
          </tr>
        </tbody>
      </table>
    </div>

### 2016-03-10

#### New

- Added the ability to return a list of [education]({{ stache.config.portal_contracts }}#Education) items for a specified constituent.

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_education_get_list }}">
            <td>Education (List)</td>
            <td>GET</td>
            <td>/constituents/{constituentId}/educations</td>
          </tr>
        </tbody>
      </table>
    </div>

- Added the ability to edit and delete [actions]({{ stache.config.portal_contracts }}#Action) and [notes]({{ stache.config.portal_contracts }}#Note) for a constituent:
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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_update }}">
            <td>Action (Edit)</td>
            <td>PUT</td>
            <td>/actions/{actionId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_delete }}">
            <td>Action (Delete)</td>
            <td>DELETE</td>
            <td>/actions/{actionId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_update }}">
            <td>Note (Edit)</td>
            <td>PUT</td>
            <td>/notes/{noteId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_delete }}">
            <td>Note (Delete)</td>
            <td>DELETE</td>
            <td>/notes/{noteId}</td>
          </tr>
        </tbody>
      </table>
    </div>

#### Changed

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

    - The base URL for the Constituent API has changed:
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Old</th>
                <th>New</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>https://api.nxt.blackbaud-dev.com/constituents/</td>
                <td>{{ stache.config.resource_url }}</td>
              </tr>
            </tbody>
          </table>
        </div>

- After [creating an attachment for a constituent]({{ stache.config.portal_endpoints_constituent_attachment_create }}), the returned representation of an [attachment]({{ stache.config.portal_contracts }}#Attachment) now includes the attachment identifier (id).

- Values for the [Constituent]({{ stache.config.portal_contracts }}#Constituent) gender property now return the values using the correct casing (lowercase).

- GET and POST routes for [actions]({{ stache.config.portal_contracts }}#Action) and [notes]({{ stache.config.portal_contracts }}#Note) endpoints have changed:

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
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_get }}">
            <td>Action (Get)</td>
            <td>GET</td>
            <td>/{constituentId}/actions/{actionId}</td>
            <td>/actions/{actionId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_action_add }}">
            <td>Action (Create)</td>
            <td>POST</td>
            <td>/{constituentId}/actions</td>
            <td>/actions</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_get }}">
            <td>Note (Get)</td>
            <td>GET</td>
            <td>/{constituentId}/notes/{noteId}</td>
            <td>/notes/{noteId}</td>
          </tr>
          <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_constituent_note_add }}">
            <td>Note (Create)</td>
            <td>POST</td>
            <td>/{constituentId}/notes</td>
            <td>/notes</td>
          </tr>
        </tbody>
      </table>
    </div>

### Deleted

We removed the following endpoints:

    - GET Attachment
    - GET Constituent code
    - GET Custom field
    - GET Email address
    - GET Online presence
    - GET Phone
    - GET Primary business
    - GET Spouse

## 2015

### 2015-10-20

#### New

- Added 3 new endpoints covering constituent [attachments]({{ stache.config.portal_contracts }}#Attachment)
  - [Get a list of constituent attachments]({{ stache.config.portal_endpoints_constituent_attachment_get_list }})
  - Get a specific attachment for a constituent
  - [Add an attachment for a constituent]({{ stache.config.portal_endpoints_constituent_attachment_create }})

<p><bb-alert bb-alert-type="info">Note that currently, all attachment records are viewable through the {{ stache.config.api_type_name }}, but only **link** attachments can be added.</bb-alert></p>

#### Changed

- Removed **Author** from the constituent note entity. The author is now inferred from the context of the user calling the {{ stache.config.api_type_name }}.
