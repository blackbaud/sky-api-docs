---
layout: layout-sidebar
name: General Ledger
description: Information on additions and changes for the General Ledger API.
order: 200
published: true
showInNav: true
icon: fa fa-book
back_to_top: true
title: General Ledger Changelog
---

# {{ name }}

Monitor this page to keep up with the [General Ledger API]({{ stache.config.portal_endpoints_GL }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2017-06-15

### Changed

We made several changes to the [Get Account (Search)]({{ stache.config.portal_endpoints_account_search }}), [Get Project (Search)]({{ stache.config.portal_endpoints_project_search }}), [Get Journal entry batch (List)]({{ stache.config.portal_endpoints_journal_entry_batch_list }}), and [Get Transaction distribution (List)]({{ stache.config.portal_endpoints_transaction_distribution_search }}) endpoints.

- The following properties are now returned: `date_added`, `date_modified`, `added_by`, and `modified_by`.

- The `last_modified` filter is now included. This filter causes the response to only include results where `date_modified` is greater than or equal to the `last_modified` filter value.

## May 2017

### 2017-05-05

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_grant_list }}">
				<td>Budget grant (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/grants</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_project_list }}">
				<td>Budget project (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/projects</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

We increased the maximum record limit from 500 to 5000 on the following Get endpoint:

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
		</tbody>
	</table>
</div>

## January 2017

### 2017-01-18

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_get }}">
				<td>Account</td>
				<td>GET</td>
				<td>/accounts/{account_id}</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_get }}">
				<td>Project</td>
				<td>GET</td>
				<td>/projects/{project_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_cashflows_get }}">
				<td>Account cashflows (List)</td>
				<td>GET</td>
				<td>/accounts/cashflows</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_working_capitals_list }}">
				<td>Account working capitals (List)</td>
				<td>GET</td>
				<td>/accounts/workingcapitals</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_custom_fields_list }}">
				<td>Account custom fields (List)</td>
				<td>GET</td>
				<td>/accounts/customfields</td>
			</tr>
		</tbody>
	</table>
</div>

## December 2016

### 2016-12-06

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_custom_field_list }}">
				<td>Journal entry custom field (List)</td>
				<td>GET</td>
				<td>/journalentries/customfields</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_custom_field_list }}">
				<td>Project custom field (List)</td>
				<td>GET</td>
				<td>/projects/customfields</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_get }}">
				<td>Budget</td>
				<td>GET</td>
				<td>/budgets</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_list }}">
				<td>Budget (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_budget_account_list }}">
				<td>Budget account (List)</td>
				<td>GET</td>
				<td>/budgets/{scenario_id}/accounts</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_ledger_summary_list }}">
				<td>Ledger summary (List)</td>
				<td>GET</td>
				<td>/summary/{fiscal_year_id}</td>
			</tr>
		</tbody>
	</table>
</div>

- Added new custom field entities to the following endpoints:

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_post }}">
				<td>Project</td>
				<td>POST</td>
				<td>/projects</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_post }}">
				<td>Journal entry</td>
				<td>POST</td>
				<td>/journalentrybatches/{batch_id}/journalentries</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_get }}">
				<td>Journal entry batch</td>
				<td>GET</td>
				<td>/journalentrybatches/{batch_id}</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

For consistency across APIs, all responses to GET endpoints that return collections now return an object with "count" and "value" properties. The following endpoints are affected:

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_code_list }}">
				<td>Journal code (List)</td>
				<td>GET</td>
				<td>/journalcodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_list }}">
				<td>Transaction code (List)</td>
				<td>GET</td>
				<td>/transactioncodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_value_list }}">
				<td>Transaction code value (List)</td>
				<td>GET</td>
				<td>/transactioncodes/{transaction_code_id}/values</td>
			</tr>
		</tbody>
	</table>
</div>

## November 2016

### 2016-11-14

#### Announcement:  Breaking Change Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

For consistency across APIs, we will implement the following changes:

- All responses to GET endpoints that return collections will return an object with "count" and "value" properties.
- The following endpoints are affected:

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_code_list }}">
				<td>Journal code (List)</td>
				<td>GET</td>
				<td>/journalcodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_list }}">
				<td>Transaction code (List)</td>
				<td>GET</td>
				<td>/transactioncodes</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_code_value_list }}">
				<td>Transaction code value (List)</td>
				<td>GET</td>
				<td>/transactioncodes/{transaction_code_id}/values</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-11-01

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_create }}">
				<td>Create project (Post)</td>
				<td>POST</td>
				<td>/projects</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_contact_create }}">
				<td>Create project contact (Post)</td>
				<td>POST</td>
				<td>/projects/{project_id}/contacts</td>
			</tr>
		</tbody>
	</table>
</div>

## October 2016

### 2016-10-06

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_fiscal_year_list }}">
				<td>Fiscal year (List)</td>
				<td>GET</td>
				<td>/fiscalyears</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_class_list }}">
				<td>Class (List)</td>
				<td>GET</td>
				<td>/classes</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_structure }}">
				<td>Account structure</td>
				<td>GET</td>
				<td>/accounts/structure</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_segment_value_list }}">
				<td>Account segment value (List)</td>
				<td>GET</td>
				<td>/accounts/segments</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_code_list }}">
				<td>Account code (List)</td>
				<td>GET</td>
				<td>/accounts/codes</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_fund_list }}">
				<td>Account fund (List)</td>
				<td>GET</td>
				<td>/accounts/funds</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_type_list }}">
				<td>Project type (List)</td>
				<td>GET</td>
				<td>/projects/types</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_status_list }}">
				<td>Project status (List)</td>
				<td>GET</td>
				<td>/projects/statuses</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_division_list }}">
				<td>Project division (List)</td>
				<td>GET</td>
				<td>/projects/divisions</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_department_list }}">
				<td>Project department (List)</td>
				<td>GET</td>
				<td>/projects/departments</td>
            </tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_location_list }}">
				<td>Project location (List)</td>
				<td>GET</td>
				<td>/projects/locations</td>
            </tr>     
		</tbody>
	</table>
</div>

#### Changed

You can now specify Class on journal entries (this affects all endpoints associated with journal entry batches).

## August 2016

### 2016-08-12

#### Breaking Change

We changed the default and maximum record limits on the following search and list endpoints. The default is now 100 records, and the maximum is 500 records.

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution (Search)</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_account_search }}">
				<td>Account (Search)</td>
				<td>GET</td>
				<td>/accounts</td>
			</tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_project_search }}">
				<td>Project (Search)</td>
				<td>GET</td>
				<td>/projects</td>
			</tr>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_journal_entry_batch_list }}">
				<td>Journal entry batch (List)</td>
				<td>GET</td>
				<td>/journalentrybatches</td>
			</tr>
		</tbody>
	</table>
</div>

## July 2016

### 2016-07-05

#### Changed

We implemented a previously announced, breaking change. We removed the Journal entry batch (Edit) `PUT` endpoint. At a later date, we plan to replace `PUT` with `PATCH`, instead.

## June 2016

### 2016-06-30

#### Announcement:  Breaking Change Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

In the coming days, a breaking change will be placed into effect. We will remove the Journal entry batch (Edit) `PUT` endpoint. At a later date, we plan to replace `PUT` with `PATCH`, instead.

### 2016-06-22

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
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_transaction_distribution_search }}">
				<td>Transaction distribution (Search)</td>
				<td>GET</td>
				<td>/transactiondistributions</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-06-15

#### Changed

We've added a versioning indicator to the General Ledger API's base URL. Specifically, all new API requests must begin with `https://{{ stache.config.resource_hostname }}/generalledger/v1`.

### 2016-06-10

#### Announcement: Breaking Changes Planned for [General Ledger API]({{ stache.config.portal_endpoints_GL }})

- We will be adding a versioning indicator to the General Ledger API's base URL. Specifically, all new API requests should begin with `https://{{ stache.config.resource_hostname }}{{ stache.config.gl_api_suffix }}/v1`.
- This change is planned to take effect on Wednesday, June 15.

## May 2016

### 2016-05-27

#### New

- Added a [General Ledger getting started guide]({{ stache.config.guide_getting_started }}) to help you make your first General Ledger API call with our interactive {{ stache.config.dev_console_name }}.
